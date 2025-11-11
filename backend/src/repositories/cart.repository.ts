import { prisma } from "../prisma.js";
import type { Book } from "../../shared/interfaces/book.js";

export interface CartItem {
  book: Book;
  quantity: number;
}

export class CartRepository {
  async findCartByUserId(userId: number) {
    return await prisma.cart.findMany({
      where: { userId },
      include: {
        book: true,
      },
    });
  }

  async addBookToCart(userId: number, bookId: number, quantity: number = 1) {
    const existingItem = await prisma.cart.findFirst({
      where: { userId, bookId },
    });

    if (existingItem) {
      return await prisma.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return await prisma.cart.create({
      data: { userId, bookId, quantity },
    });
  }

  async removeBookFromCart(userId: number, bookId: number) {
    return await prisma.cart.deleteMany({
      where: { userId, bookId },
    });
  }

  async clearCart(userId: number) {
    return await prisma.cart.deleteMany({
      where: { userId },
    });
  }
}
