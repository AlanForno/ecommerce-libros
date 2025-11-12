// backend/src/controllers/library.controller.ts

// 1. CLAVE: Usamos 'import type' para Request y Response (consistente con el TSCONFIG estricto)
import type { Request, Response } from 'express'; 
import { prisma } from '../prisma.js'; // CLAVE: Usamos '../prisma' (sube a src) y extensión .ts por la estructura.

export class LibraryController {
    // 📚 LECTURA: Obtener todos los libros de un usuario
    // 2. CLAVE: Tipamos explícitamente req y res para evitar el error 'implicitly has an 'any' type'.
    public async getLibraryByUser(req: Request, res: Response): Promise<Response> {
        
        // 3. CLAVE: Validación y tipado para req.params.id (que puede ser string | undefined)
        const userIdParam = req.params.id;
        
        if (!userIdParam) {
            return res.status(400).json({ error: 'ID de usuario ausente.' });
        }
        
        const usuarioId = parseInt(userIdParam, 10);
        
        if (isNaN(usuarioId)) {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }
        
        try {
            // 4. CLAVE: Corregida la consulta. Debe ser prisma.user.findUnique
            // para usar la relación 'library' y no prisma.library.findMany
            const userWithLibrary = await prisma.usuario.findUnique({
                where: { id: usuarioId },
                include: { 
                    library: {
                        include: { book: true } 
                    }
                },
            });

            if (!userWithLibrary) {
                return res.status(404).json({ error: 'Usuario no encontrado.' });
            }

            // Mapeamos para devolver solo los objetos Book, resolviendo el error de tipado en 'entry'
            const books = userWithLibrary.library.map(entry => entry.book);

            return res.json({ books });

        } catch (error) {
            console.error("Error al obtener la biblioteca:", error);
            return res.status(500).json({ error: 'Error interno del servidor al consultar la biblioteca.' });
        }
    }

    // 🛒 PERSISTENCIA: Añadir un libro a la biblioteca (simulando una compra)
    public async addBookToLibrary(req: Request, res: Response): Promise<Response> {
        // ... (el resto del código de addBookToLibrary es correcto, solo asegúrate de tipar req y res)
        const { userId, bookId } = req.body; 
        
        // ... (validaciones y lógica de Prisma)
        const numericUserId = parseInt(userId, 10);
        const numericBookId = parseInt(bookId, 10);

        try {
            const existingEntry = await prisma.library.findUnique({
                where: { usuarioId_bookId: { usuarioId: numericUserId, bookId: numericBookId } },
            });

            if (existingEntry) {
                return res.status(200).json({ message: 'El libro ya está en la biblioteca del usuario.', entry: existingEntry });
            }

            const newEntry = await prisma.library.create({
                data: { usuarioId: numericUserId, bookId: numericBookId },
                include: { book: true }
            });

            return res.status(201).json({ message: 'Libro agregado a la biblioteca exitosamente.', book: newEntry.book });

        } catch (error) {
            console.error('Error al persistir el libro:', error);
            return res.status(500).json({ error: 'No se pudo completar la transacción.' });
        }
    }
}