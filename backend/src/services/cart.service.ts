import type { CartRepository, CartItem } from "../repositories/cart.repository.js";

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCart(userId: number): Promise<CartItem[]> {
    return await this.cartRepository.findCartByUserId(userId);
  }

  async addToCart(userId: number, bookId: number, quantity: number = 1) {
    return await this.cartRepository.addBookToCart(userId, bookId, quantity);
  }

  async removeFromCart(userId: number, bookId: number) {
    return await this.cartRepository.removeBookFromCart(userId, bookId);
  }

  async clearCart(userId: number) {
    return await this.cartRepository.clearCart(userId);
  }
}
