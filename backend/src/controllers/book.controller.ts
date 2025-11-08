import type { Request, Response } from "express";
import { BookService } from "../services/book.service.js";
import { BookRepository } from "../repositories/book.repository.js";


const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

export class BookController {

  public async getBook(request: Request, response: Response){
    try{
      const id = Number(request.params.id);

       if(isNaN(id)){
         return response.status(400).json("ID inválido");
        }
      
        const book = await bookService.findBook(id);

        if(!book){
          return response.status(404).json("Libro no encontrado");
        }

        response.status(200).json(book);

    }catch (err) {
      response.status(500).json({ mensaje: err });

    }
  }
    

  public async getBooksPreview(request: Request, response: Response) {
    try {
      const books = await bookService.findAllBooksPreviews();
      response.status(200).json(books);
    } catch (err) {
      response.status(500).json({ mensaje: err });
    }
  }
}
