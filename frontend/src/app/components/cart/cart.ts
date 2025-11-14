import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../api/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})

export class CartComponent implements OnInit {

  cartService = inject(CartService);
  private router = inject(Router);

  cartItems: any[] = [];
  total: number = 0;
  userId: number = 1; //simular id de usuario

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe({
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

  removeFromCart(userId: number, bookId: number): Observable<any> {
      return this.http.delete(`$environments.api_url}/remove`, {
          params: { userId: userId.toString(), bookId: bookId.toString() }
      });
  }

checkout(): void {
    if (this.cartItems.length === 0) {
        alert('El carrito está vacío. Agrega libros para finalizar la compra.');
        return;
    }

    this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        this.cartItems = [];
        this.total = 0;
        alert('🎉 ¡Pago exitoso! La compra ha sido finalizada.');

        // ✅ REDIRECCIÓN: Navegar a la ruta de Mi Biblioteca
        this.router.navigate(['/mibiblioteca']); // Asegúrate que esta sea tu ruta correcta
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
}
