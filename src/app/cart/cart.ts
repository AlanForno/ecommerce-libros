import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Datos hardcodeados para pruebas sin servicio
    this.cartItems = [
      { id: '1', title: 'Libro de ejemplo 1', author: 'Autor 1', price: 100 },
      { id: '2', title: 'Libro de ejemplo 2', author: 'Autor 2', price: 200 }
    ];
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeFromCart(bookId: string): void {
    this.cartItems = this.cartItems.filter(book => book.id !== bookId);
    this.calculateTotal();
  }

  checkout(): void {
    alert('Compra realizada con éxito');
    this.cartItems = [];
    this.total = 0;
  }
}
