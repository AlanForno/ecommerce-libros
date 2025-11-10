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
      genero: ['']
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
    console.log("🚀 Filtros del formulario (antes de limpiar):", filtros);

    const filtrosValidos = Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v !== null && v !== '')
    );
    console.log("✅ Filtros Válidos enviados al backend:", filtrosValidos); // Para debug

    this.bookService.getAllBooksPreviews(filtrosValidos).subscribe({ // Usar filtrosValidos
      next: (books) => this.books = books,
      error: (err) => console.error('Error al encontrar libros: ', err)
    });
  }

  seleccionarGenero(genero: string): void {

    const generoActual = this.filtros.get('genero')?.value;

    if (generoActual === genero) {
        this.filtros.patchValue({ genero: null });
    } else {
        this.filtros.patchValue({ genero });
    }
    this.aplicarFiltros();
  }
}
