import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book, BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../api/services/books.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  imports: [CommonModule, RouterLink],
})
export class CatalogComponent implements OnInit, OnDestroy {
  bookService = inject(BooksService);
  books!: Book[];
  error = false;
  errorMessage: string = '';

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog() {
    this.bookService.getAllBooksPreviews().subscribe({
      next: (book: Book[]) => {
        this.books=book;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el catálogo. Por favor, intente nuevamente.';
      },
      complete: () => {},
    });
  }

  
}
