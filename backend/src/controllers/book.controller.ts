import type { Request, Response } from "express";

export class BookController {

    public async getBooks(request: Request, response: Response) {
        try {
            response.status(200).json({
                id: 1,
                titulo: 'Harry Potter y La Piedra Filosofal',
                autor: 'JK Rowling',
                descripcion: 'Lorem ipsum',
                formato: 'EPUB',
                paginas: '230',
                genero: 'Fantasia',
                anio: '1997',
                precio: 25000.0
            });
        } catch (err) {
            response.status(500).json({ mensaje: err });
        }
    }

}