import type { Request, Response } from "express";
import { CartService } from "../services/cart.service.js";
import { CartRepository } from "../repositories/cart.repository.js";

const cartRepository = new CartRepository(); 

const cartService = new CartService(cartRepository); 

const FAKE_USER_ID = 1; // ID de usuario temporal (debe ser reemplazado por la sesión)

export class CartController {
  
  static async getCart(request: Request, response: Response) {
    try {
      const cartItems = await cartService.getCart(FAKE_USER_ID); 
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
          const addedItem = await cartService.addToCart(FAKE_USER_ID, bookId, quantity);

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
    
    try {
      await cartService.removeFromCart(FAKE_USER_ID, bookId);
      const updatedCart = await cartService.getCart(FAKE_USER_ID);
      response.json(updatedCart);
    } catch (error) {
       response.status(500).json({ message: "Error al eliminar el item." });
    }
  }

  static async clearCart(request: Request, response: Response) {
    try {
      await cartService.clearCart(FAKE_USER_ID);
      response.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
      response.status(500).json({ message: "Error al vaciar el carrito." });
    }
  }
}
