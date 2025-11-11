import type { Request, Response } from "express";
//import { CartService } from "../services/cart.service.js";
//import { CartRepository } from "../repositories/cart.repository.js";

let cartItems: any[] = [];

export class CartController {
  static getCart(request: Request, response: Response) {
    response.json(cartItems);
  }

  static addToCart(request: Request, response: Response) {
    const { id, title, author, price } = request.body;

    if (!id || !title || !price) {
      return response.status(400).json({ message: "Datos incompletos" });
    }

    cartItems.push({ id, title, author, price });
    response.status(201).json(cartItems);
  }

  static removeFromCart(request: Request, response: Response) {
    const id = request.params.id;
    cartItems = cartItems.filter(item => item.id != id);
    response.json(cartItems);
  }

  static clearCart(request: Request, response: Response) {
    cartItems = [];
    response.json({ message: "Carrito vaciado correctamente" });
  }
}
