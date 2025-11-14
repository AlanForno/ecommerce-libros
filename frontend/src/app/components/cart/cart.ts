import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LibraryService } from '../../shared/services/authentication/library.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {
  libraryService = inject(LibraryService);
  cartItems: any[] = [];
  total: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
  this.cartItems = [
  {
    id: 3,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    price: 12000.75
  },
  {
    id: 4,
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    price: 18000.00
  },
  {
    id: 5,
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    price: 22000.30
  },
  {
    id: 6,
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 30000.00
  },
  {
    id: 7,
    title: 'La Sombra del Viento',
    author: 'Carlos Ruiz Zafón',
    price: 20000.50
  },
  {
    id: 8,
    title: 'Harry Potter y la Piedra Filosofal',
    author: 'J.K. Rowling',
    price: 19000.99
  }
];


    this.calculateTotal();
  }
  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }
  removeFromCart(bookId: number): void {
    this.cartItems = this.cartItems.filter((book) => book.id !== bookId);
    this.calculateTotal();
  }

finalizarCompra(books: any[]): void {
  this.saveBooks(books);  
  this.router.navigate(['/library']);
}

saveBooks(books: any[]): void {
  const userId = Number(localStorage.getItem('userId'));
  console.log('Guardando libros para el usuario ID:', userId);
  for (let book of books) {
    this.libraryService.addBook(userId,book.id).subscribe({
      next: (response) => {
        console.log('Libro agregado a la biblioteca:', response);
      },
      error: (err) => {
        console.error('Error al guardar libro:', err);
      }
    });
  }
}
    
}
