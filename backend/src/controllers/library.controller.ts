// backend/src/controllers/library.controller.ts

import type { Request, Response } from 'express'; 
import { prisma } from '../prisma.js'; // Ajusta la ruta a tu cliente Prisma

export class LibraryController {

    // 📚 LECTURA: GET /api/library/user/:id 
    // Usa la relación entre Usuario y Library para obtener los libros comprados.
    public async getLibraryByUser(req: Request, res: Response): Promise<Response> {
        
        const userIdParam = req.params.id;
        
        if (!userIdParam) {
            return res.status(400).json({ error: 'ID de usuario ausente.' });
        }
        
        const usuarioId = parseInt(userIdParam, 10);
        
        if (isNaN(usuarioId)) {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }
        
        try {
            // **CLAVE:** Consulta el usuario e incluye la relación 'library'.
            const userWithLibrary = await prisma.usuario.findUnique({
                where: { id: usuarioId },
                include: { 
                    library: {
                        include: { book: true } // Incluye los datos del libro
                    }
                },
            });

            if (!userWithLibrary) {
                return res.status(404).json({ error: 'Usuario no encontrado.' });
            }

            // Mapea para obtener solo el array de objetos Book
            const books = userWithLibrary.library.map(entry => entry.book);

            return res.json({ books });

        } catch (error) {
            console.error("Error al obtener la biblioteca:", error);
            return res.status(500).json({ error: 'Error interno del servidor al consultar la biblioteca.' });
        }
    }

    // 🛒 REGISTRO: POST /api/library/add 
    // Usado por la simulación de compra del frontend.
    public async addBookToLibrary(req: Request, res: Response): Promise<Response> {

        const { userId, bookId } = req.body; 
        
        const numericUserId = parseInt(userId, 10);
        const numericBookId = parseInt(bookId, 10);

        try {
            // **CLAVE:** Usa findUnique con la clave compuesta 'usuarioId_bookId' para verificar duplicados.
            const existingEntry = await prisma.library.findUnique({
                where: { usuarioId_bookId: { usuarioId: numericUserId, bookId: numericBookId } },
            });

            if (existingEntry) {
                return res.status(200).json({ message: 'El libro ya está en la biblioteca del usuario.', entry: existingEntry });
            }

            // Crea la nueva entrada
            const newEntry = await prisma.library.create({
                data: { usuarioId: numericUserId, bookId: numericBookId },
                include: { book: true }
            });

            return res.status(201).json({ message: 'Libro agregado a la biblioteca exitosamente.', book: newEntry.book });

        } catch (error) {
            console.error('Error al persistir el libro:', error);
            // Si hay un error, el frontend recibe esto y muestra el alert
            return res.status(500).json({ error: 'No se pudo completar la transacción.' });
        }
    }
}