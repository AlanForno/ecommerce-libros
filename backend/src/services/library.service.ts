import type { LibraryRepository } from "../repositories/library.repository.js";

export class LibraryService {
  constructor(private libraryRepository: LibraryRepository) {}

  async getLibraryForUser(userId: number) {
    return await this.libraryRepository.findLibraryByUserId(userId);
  }

  async addBookToLibrary(userId: number, bookId: number) {
    return await this.libraryRepository.addBookToUserLibrary(userId, bookId);
  }
}
