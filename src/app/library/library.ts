import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-library',
  standalone: true, 
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  imports: [CommonModule] 
})
export class LibraryComponent {
  books = [
    { id: '1', title: 'Libro 1', author: 'Autor 1', price: 10 },
    { id: '2', title: 'Libro 2', author: 'Autor 2', price: 15 },
    { id: '3', title: 'Libro 3', author: 'Autor 3', price: 20 }
  ];
 
  loading = false;           
  error: string | null = null; 
  constructor() {
    console.log('Biblioteca cargada');
  }
}
 