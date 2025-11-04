import { Component } from '@angular/core';
import { Book, BookPreview } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  imports: [CommonModule, RouterLink]
})
export class CatalogComponent {

  public libros: BookPreview[] = [
    {
      id: 1,
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',
      genero: 'Realismo Mágico',
      formato: 'Físico',
      precio: 25000.99,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      genero: 'Distopía',
      formato: 'EPUB',
      precio: 15000.50,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 3,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      genero: 'Infantil',
      formato: 'EPUB',
      precio: 12000.75,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 4,
      titulo: 'Orgullo y Prejuicio',
      autor: 'Jane Austen',
      genero: 'Romance',
      formato: 'Físico',
      precio: 18000.00,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 5,
      titulo: 'El Hobbit',
      autor: 'J.R.R. Tolkien',
      genero: 'Fantasía',
      formato: 'EPUB',
      precio: 22000.30,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 6,
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      genero: 'Clásico',
      formato: 'Físico',
      precio: 30000.00,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 7,
      titulo: 'La Sombra del Viento',
      autor: 'Carlos Ruiz Zafón',
      genero: 'Misterio',
      formato: 'EPUB',
      precio: 20000.50,
      rutaImagen: 'images/portada-libro.png'
    },
    {
      id: 8,
      titulo: 'Harry Potter y la Piedra Filosofal',
      autor: 'J.K. Rowling',
      genero: 'Fantasía',
      formato: 'EPUB',
      precio: 19000.99,
      rutaImagen: 'images/portada-libro.png'
    }
  ];

}
