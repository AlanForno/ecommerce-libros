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
  books: BookPreview[] = [];
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
    this.aplicarFiltros(); // Cargar catálogo (con o sin filtros)
  }

  ngOnDestroy(): void {}

  private aplicarFiltros(): void {
    const filtros = this.filtros.value;
    console.log("Filtros enviados al backend:", filtros);

    this.bookService.getAllBooksPreviews(filtros).subscribe({
      next: (books) => {
        console.log("Libros recibidos:", books);
        this.books = books;
        this.errorMessage = ''; // Limpiar error si todo sale bien
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        this.errorMessage = 'No se pudieron cargar los libros.';
        this.books = []; // Limpiar libros en caso de error
      }
    });
  }

  seleccionarGenero(genero: string): void {
    const generoActual = this.filtros.get('genero')?.value;

    if (generoActual === genero) {
      this.filtros.patchValue({ genero: '' }); // Desactivar filtro
    } else {
      this.filtros.patchValue({ genero }); // Activar filtro
    }
    // No hace falta llamar aplicarFiltros() porque valueChanges ya lo hace
  }
}
