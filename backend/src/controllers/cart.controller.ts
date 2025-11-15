import type { Request, Response } from "express";
import { CartService } from "../services/cart.service.js";
import { CartRepository } from "../repositories/cart.repository.js";

const cartRepository = new CartRepository(); 

const cartService = new CartService(cartRepository); 

export class CartController {
  
  static async getCart(request: Request, response: Response) {
    try {
      const userId = Number(request.params.userId);
      const cartItems = await cartService.getCart(userId); 
      response.json(cartItems);
    } catch (error) {
      response.status(500).json({ message: "Error al obtener el carrito." });
    }
  }

  static async addToCart(request: Request, response: Response) {
    const { bookId } = request.body; 
    const quantity = 1;

    if (!bookId) {
      return response.status(400).json({ message: "ID del libro es requerido." });
    }

    try {
      const userId = Number(request.body.userId);
          const addedItem = await cartService.addToCart(userId, bookId, quantity);

          response.status(201).json(addedItem);
        } catch (error) { 
          if (error instanceof Error) {
              
              if (error.message.includes("ya está en el carrito")) {
                // HTTP 409 Conflict: El recurso ya existe
                return response.status(409).json({ message: error.message }); 
              }
            
              console.error(error);
              return response.status(500).json({ message: "Error interno al agregar al carrito." });
              
          } else {
              console.error('Error de tipo desconocido:', error);
              return response.status(500).json({ message: "Error interno desconocido." });
          }
        }
  }
  
  static async removeFromCart(request: Request, response: Response) {
    const bookId = Number(request.params.id);
    const userId = Number(request.query.userId);
    
    try {
      await cartService.removeFromCart(userId, bookId);
      const updatedCart = await cartService.getCart(userId);
      response.json(updatedCart);
    } catch (error) {
       response.status(500).json({ message: "Error al eliminar el item." });
    }
  }

  static async clearCart(request: Request, response: Response) {
    try {
      const userId = Number(request.query.userId);
      await cartService.clearCart(userId);
      response.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
      response.status(500).json({ message: "Error al vaciar el carrito." });
    }
  }
}
