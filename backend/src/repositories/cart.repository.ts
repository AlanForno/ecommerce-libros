import { prisma } from "../prisma.js";
import type { book as Book, cart as Cart } from "@prisma/client";

export interface CartItem {
  book: Book;
  quantity: number;
}

export class CartRepository {
  async findCartByUserId(userId: number): Promise<CartItem[]> {
    const items = await prisma.cart.findMany({
      where: { userId },
      include: { book: true },
    });

    return items.map(item => ({
      book: item.book,
      quantity: item.quantity,
    }));
  }

  async addBookToCart(userId: number, bookId: number, quantity: number = 1): Promise<CartItem> {
      const existingItem = await prisma.cart.findFirst({
        where: { userId: userId, bookId: bookId },
        include: { book: true },
      });

      if (existingItem) {
        // Regla: Solo una unidad por libro EPUB (lanzar error si ya existe)
        throw new Error(`El libro (ID: ${bookId}) ya está en el carrito. Solo se permite una unidad por libro EPUB.`);
      }

      const created = await prisma.cart.create({
        data: { userId: userId, bookId: bookId, quantity: quantity }, 
        include: { book: true },
      });

      return { book: created.book, quantity: created.quantity };
  }

  async removeBookFromCart(userId: number, bookId: number) {
    return await prisma.cart.deleteMany({
      where: { userId },
    });
  }

  async clearCart(userId: number) {
    return await prisma.cart.deleteMany({
      where: { userId },
    });
  }
}
