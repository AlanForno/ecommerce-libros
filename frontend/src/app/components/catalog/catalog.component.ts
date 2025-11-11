import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../api/services/books.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  filtrosPantallaGenero: string = '';

  constructor(private fb: FormBuilder) {
    this.filtros = this.fb.group({
      busqueda: [''],
      precioMinimo: [''],
      precioMaximo: [''],
      genero: [''],
    });

    this.filtros.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  ngOnInit(): void {
    const filtrosAlmacenados = localStorage.getItem('filtros_catalogo');

    if (filtrosAlmacenados) {
      const filtros = JSON.parse(filtrosAlmacenados);
      this.filtros.patchValue(filtros);
      this.aplicarFiltros();
    } else {
      this.getCatalog();
    }
  }

  ngOnDestroy(): void {}

  getCatalog() {
    this.bookService.getAllBooksPreviews().subscribe({
      next: (books) => {
        console.log('Catálogo completo recibido:', books);
        console.log('Primer libro:', books[0]);
        this.books = books;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'No se pudo cargar el catálogo.';
      },
    });
  }

  private aplicarFiltros(): void {
    const filtros = this.filtros.value;

    const hayFiltros =
      filtros.busqueda || filtros.genero || filtros.precioMinimo || filtros.precioMaximo;

    if (!hayFiltros) {
      console.log('No hay filtros, cargando catálogo completo.');
      this.getCatalog();
      localStorage.removeItem('filtros_catalogo');
      return;
    }

    console.log('Aplicando filtros:', filtros);
    this.bookService.getAllBooksPreviews(filtros).subscribe({
      next: (books) => {
        console.log('Libros filtrados:', books);
        this.books = books;
        this.errorMessage = '';
        localStorage.setItem('filtros_catalogo', JSON.stringify(filtros));
      },
      error: (err) => {
        console.error('Error al filtrar:', err);
        this.errorMessage = 'No se pudieron cargar los libros.';
      },
    });
  }

  seleccionarGenero(genero: string): void {
    const generoActual = this.filtros.get('genero')?.value;

    if (generoActual === genero) {
      this.filtros.patchValue({ genero: '' });
    } else {
      this.filtros.patchValue({ genero });
    }
  }

  get generoValor(): string {
    return this.filtros.get('genero')?.value || '';
  }

  get precioValor(): string {
    const min = this.filtros.get('precioMinimo')?.value;
    const max = this.filtros.get('precioMaximo')?.value;

    if (min && max) return `$${min} - $${max}`;
    if (min) return `Desde $${min}`;
    if (max) return `Hasta $${max}`;
    return '';
  }

 limpiarFiltroPrecio() {
  this.filtros.patchValue({
    precioMinimo: '',
    precioMaximo: ''  
  });
}

  limpiarFiltroGenero() {
    this.filtros.patchValue({
      genero: '',
    });
  }
}
