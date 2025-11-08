import { prisma } from "../prisma.js"

export class BookRepository {

    async findBookById(id: number) {
        return await prisma.book.findUnique(
            {
                where: { id: id }
            }
        )
    }

    async getAllBooks() {
        return await prisma.book.findMany({
            select: {
                id: true,
                titulo: true,
                autor: true,
                genero: true,
                formato: true,
                precio: true,
                ruta_imagen: true,
            }
        });
    }

}