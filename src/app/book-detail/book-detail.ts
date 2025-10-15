import { Component } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {


rutaDeMiImagen = 'images/portada-libro.png';
titulo = 'Titulo del libro';
autor = 'Autor del libro';
formato = 'eBook (PDF, EPUB) + Audio';
editorial = 'Editorial xxxx';
paginas = '300 paginas';
anio = 2024;
genero = 'Genero del libro';
precio = '$40.000';
descripcion = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
}
