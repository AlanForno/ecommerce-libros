import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: Book[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeFromCart(bookId: string): void {
    this.cartService.removeFromCart(bookId).subscribe(() => {
      this.cartItems = this.cartItems.filter(book => book.id !== bookId);
      this.calculateTotal();
    });
  }

  checkout(): void {
    this.cartService.checkout().subscribe(() => {
      alert('Compra realizada con éxito');
      this.cartItems = [];
      this.total = 0;
    });
  }
}
