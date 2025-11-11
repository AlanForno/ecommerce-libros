import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../api/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {

  cartService = inject(CartService);
  cartItems: any[] = [];
  total: number = 0;
  userId: number = 1;

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

  removeFromCart(bookId: number): void {
    this.cartService.removeFromCart(bookId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(book => book.id !== bookId);
        this.calculateTotal();
      },
      error: (err) => console.error('Error eliminando del carrito', err)
    });
  }

  checkout(): void {
    this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        this.cartItems = [];
        this.total = 0;
        alert('Compra realizada con éxito');
      },
      error: (err) => console.error('Error al finalizar compra', err)
    });
  }
}
