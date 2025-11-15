import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../api/services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LibraryService } from '../../api/services/library.service';
import { AuthService } from '../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {

  cartService = inject(CartService);
  private router = inject(Router);
  libraryService = inject(LibraryService);
  authService = inject(AuthService);
  private http = inject(HttpClient);

  userId: number | null | undefined;
  cartItems: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.userId = this.authService.getUsuarioId();
    this.loadCart();
  }

  loadCart(): void {
    if (this.userId === undefined || this.userId === null) {
      console.warn('Usuario no autenticado. No se puede cargar el carrito.');
      return;
    }

    this.cartService.getCart(this.userId!).subscribe({
      next: (data) => {
        this.cartItems = data.map(item => ({
          id: item.book.id,
          title: item.book.titulo,
          author: item.book.autor,
          price: Number(item.book.precio),
          quantity: item.quantity
        }));
        this.calculateTotal();
      },
      error: (err) => console.error('Error cargando carrito', err)
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeFromCart(bookId: number): void {
      if (this.userId === undefined || this.userId === null) {
          alert('❌ Debe iniciar sesión para eliminar items.');
          return;
      }

      this.cartService.removeFromCart(this.userId!, bookId).subscribe({
          next: () => {
            this.cartItems = this.cartItems.filter(book => book.id !== bookId);
            this.calculateTotal();
            alert('Item eliminado del carrito.');
          },
          error: (error) => {
              if (error instanceof Error) {
                  console.error('Error eliminando del carrito:', error.message);
                  alert(`❌ Error al eliminar: ${error.message}`);
              } else {
                  console.error('Error desconocido eliminando del carrito:', error);
                  alert('❌ Error al eliminar el item.');
              }
          }
      });
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
        alert('El carrito está vacío. Agrega libros para finalizar la compra.');
        return;
    }

    if (this.userId === undefined || this.userId === null) {
        alert('❌ Debe iniciar sesión para finalizar la compra.');
        return;
    }

    this.cartService.clearCart(this.userId!).subscribe({
      next: () => {
        this.saveBooks(this.cartItems);

        this.cartItems = [];
        this.total = 0;
        alert('🎉 ¡Pago exitoso! La compra ha sido finalizada.');

        this.router.navigate(['/mibiblioteca']);
      },
      error: (error) => {
        if (error instanceof Error) {
            console.error('Error al finalizar compra:', error.message);
            alert(`❌ Error al procesar el pago: ${error.message}`);
        } else {
            console.error('Error desconocido al finalizar compra:', error);
            alert('❌ Error al procesar el pago. Inténtalo de nuevo.');
        }
      }
    });
  }

  finalizarCompra(books: any[]): void {
      this.saveBooks(books);
      this.router.navigate(['/library']);
  }

  saveBooks(books: any[]): void {
    if (this.userId === undefined || this.userId === null) {
      console.error('❌ Error de autenticación: No se pudo guardar el libro.');
      return;
    }

    for (let book of books) {
      this.libraryService.addBook(this.userId!, book.id).subscribe({
        next: (response) => {
        },
        error: (err) => {
        }
      });
    }
  }
}
