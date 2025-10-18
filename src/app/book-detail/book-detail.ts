import { Component } from '@angular/core';
import { Book } from '../shared/interfaces/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {

  public libro: Book = {
    id: 1,
    titulo: 'Titulo del libro',
    autor: 'Autor del libro',
    editorial: 'Editorial xxxx',
    descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    formato: 'eBook (PDF, EPUB) + Audio',
    paginas: '300 paginas',
    genero: 'Genero del libro',
    anio: 2024,
    precio: 40000.0,
    rutaImagen: 'images/portada-libro.png',
  }

}
