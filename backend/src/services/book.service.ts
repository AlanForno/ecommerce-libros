import type { BookRepository } from "../repositories/book.repository.js";

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async findBook(id: number) {
    return await this.bookRepository.findBookById(id);
  }

  async findAllBooksPreviews(filtros?: any) {
    return await this.bookRepository.findAllBooksPreviews(filtros);
  }
}
