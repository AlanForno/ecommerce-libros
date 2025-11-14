import { prisma } from "../prisma.js";

export class LibraryRepository {
  async findLibraryByUserId(userId: number) {
    const userWithLibrary = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        library: {
          include: { book: true },
        },
      },
    });
    if (!userWithLibrary) {
      throw new Error("Usuario no encontrado");
    }
    return userWithLibrary.library.map((entry) => entry.book);
  }

  async addBookToUserLibrary(userId: number, bookId: number) {
    return await prisma.library.create({
      data: {
        usuarioId: userId,
        bookId: bookId,
      },
      include: { book: true },
    });
  }
}
