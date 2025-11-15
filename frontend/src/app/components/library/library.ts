import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { LibraryService } from '../../api/services/library.service';
import { Book, BookPreview } from '../../shared/interfaces/book';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  imports: [CommonModule],
})
export class LibraryComponent implements OnInit {
  authService = inject(AuthService);
  libraryService = inject(LibraryService);
  books: BookPreview[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.getCatalog();
  
  }

  getCatalog() {
    const userId = this.authService.getUsuarioId();
    if (!userId) {
      return;
    }
    this.libraryService.getLibrary(userId).subscribe({
      next: (books) => {
        this.books = books;
        console.log('Respuesta recibida (next): Libros en la biblioteca:', this.books);
      },
      error: (err) => {
        this.errorMessage = 'No se puedo cargar la biblioteca.';
      },
    });
  }
}
