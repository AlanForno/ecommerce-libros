import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book, BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../api/services/books.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class CatalogComponent implements OnInit, OnDestroy {
  bookService = inject(BooksService);
  books!: BookPreview[];
  error = false;
  errorMessage: string = '';
  filtros: FormGroup;


  constructor(private fb: FormBuilder) {
    this.filtros = this.fb.group({
      busqueda: [''],
      precioMinimo: [''],
      precioMaximo: ['']
    });

    this.filtros.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  ngOnDestroy(): void { }
  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog() {
    this.bookService.getAllBooksPreviews().subscribe({
      next: (book) => {
        this.books = book;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el catálogo. Por favor, intente nuevamente.';
      },
      complete: () => { },
    });
  }

  private aplicarFiltros(): void {
    const filtros = {
      busqueda: this.filtros.get('busqueda')?.value,
      precioMinimo: this.filtros.get('precioMinimo')?.value,
      precioMaximo: this.filtros.get('precioMaximo')?.value,
    };

    this.bookService.getAllBooksPreviews(filtros)
      .subscribe({
        next: (books) => this.books = books,
        error: (err) => console.error('Error al encontrar libros: ', err)
      });
  }


}
