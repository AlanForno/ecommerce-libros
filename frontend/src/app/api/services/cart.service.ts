import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroments } from '../../../enviroments/enviroments.develop';
import { Book } from '../../shared/interfaces/book';

export interface CartItem {
  book: Book;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);

  /**
   * Obtiene el carrito de un usuario
   * @param userId id del usuario logueado
   */
  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${enviroments.api_url}/cart/${userId}`);
  }

  /**
   * Agrega un libro al carrito del usuario
   * @param bookId id del libro a agregar
   */
  addToCart(userId: number, bookId: number, quantity: number): Observable<any> {
      const body = { userId, bookId, quantity };
      return this.http.post(`${enviroments.api_url}/cart/add`, body);
    }

  /**
   * Elimina un libro del carrito
   * @param userId id del usuario
   * @param bookId id del libro a eliminar
   */
  removeFromCart(userId: number, bookId: number): Observable<void> {
    return this.http.delete<void>(`${enviroments.api_url}/cart/remove`, {
        params: { userId: userId.toString(), bookId: bookId.toString() }
    });
  }

  /**
   * Vacía todo el carrito de un usuario
   * @param userId id del usuario logueado
   */
  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${enviroments.api_url}/cart/clear`, {
        params: { userId: userId.toString() }
    });
  }
}

