import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../api/services/books.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class CatalogComponent implements OnInit, OnDestroy {
  bookService = inject(BooksService);
  books!: BookPreview[];
  errorMessage: string = '';
  filtros: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filtros = this.fb.group({
      busqueda: [''],
      precioMinimo: [''],
      precioMaximo: [''],
      genero: [''] // 🔹 agregado
    });

    this.filtros.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  ngOnInit(): void {
    this.getCatalog();
  }
  ngOnDestroy(): void {}

  getCatalog() {
    this.bookService.getAllBooksPreviews().subscribe({
      next: (book) => this.books = book,
      error: () => this.errorMessage = 'No se pudo cargar el catálogo.'
    });
  }

  private aplicarFiltros(): void {
    const filtros = this.filtros.value;
    console.log("🚀 Filtros enviados al backend:", filtros);
    this.bookService.getAllBooksPreviews(filtros).subscribe({
      next: (books) => this.books = books,
      error: (err) => console.error('Error al encontrar libros: ', err)
    });
  }

  filtrarPorGenero(genero: string, event: Event): void {
    event.preventDefault();
    this.filtros.patchValue({ genero }); // actualiza el form
    this.aplicarFiltros(); // ejecuta el mismo flujo de búsqueda
  }
}
