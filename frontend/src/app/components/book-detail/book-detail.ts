import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../api/services/books.service';
import { CartService } from '../../api/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit, OnDestroy {

  bookService = inject(BooksService);
  cartService = inject(CartService);
  activatedRouter = inject(ActivatedRoute);
  id:number=0;
  book!:Book;

  private readonly currentUserId = 1; //simulo ID de usuario

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.getBook();
  }

  ngOnDestroy(): void {}

  getBook(){
    this.bookService.getBookDetail(this.id).subscribe({
      next: (book:Book) =>{
        this.book= book;
      },
      error: () =>{},
      complete: () =>{}
    })
  }

  addToCart(book: Book): void {
    const bookId = book.id;
    const userId = this.currentUserId;
    const quantity = 1; // Fijo por regla de EPUB

    this.cartService.addToCart(userId, bookId, quantity).subscribe({
      next: (response) => {
        alert(`✅ "${book.titulo}" agregado al carrito.`);
      },
      error: (err) => {
        alert('❌ Error al agregar el libro. (El backend puede indicar que ya existe).');
        console.error('Detalle del error:', err);
      }
    });
  }

buyNow(book: Book): void {
    if (!confirm(`¿Deseas comprar "${book.titulo}" ahora por $${book.precio}?`)) {
      return;
    }

    const userId = this.currentUserId;
    const bookId = book.id;
    const quantity = 1;

    this.cartService.addToCart(userId, bookId, quantity).subscribe({
        next: () => {

            setTimeout(() => {
                this.cartService.clearCart(userId).subscribe({
                    next: () => {
                        alert('🎉 ¡Pago exitoso! Disfruta de tu nuevo EPUB.');
                    },
                    error: () => { /* Manejo de error de clearCart */ }
                });
            }, 500); // Simula un pequeño tiempo de procesamiento
        },
        error: (err) => {
            if (err.status === 409) {
                // Si ya está en el carrito (Regla EPUB), sigue con el checkout
                 setTimeout(() => {
                    this.cartService.clearCart(userId).subscribe({
                        next: () => {
                            alert('🎉 ¡Pago exitoso! Disfruta de tu nuevo EPUB.');
                        }
                    });
                }, 500);
            } else {
                 alert('❌ Error al iniciar la compra.');
            }
        }
    });
  }

}
