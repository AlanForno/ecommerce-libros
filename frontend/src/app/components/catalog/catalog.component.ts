import { Component, inject } from '@angular/core';
import { Book, BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BooksService } from '../../api/services/books.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  imports: [CommonModule, RouterLink]
})
export class CatalogComponent {

  private bookService = inject(BooksService);

  public libros: BookPreview[] = [];

  
  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe({
      next: (books) => this.libros = books,
      error: (err) => console.error('Ocurrio un error al traer los libros: ', err)
    })
  }

}
