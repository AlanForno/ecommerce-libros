import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { LibraryService } from '../../shared/services/authentication/library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  imports: [CommonModule]
})
export class LibraryComponent implements OnInit {

 
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private libraryService = inject(LibraryService);

  baseUrl = 'http://localhost:3000/api/library';

  books: any[] = [];
  loading = false;
  error: string | null = null;

  private readonly TEST_USER_ID = 21;

  ngOnInit(): void {
    this.cargarBiblioteca();
  }

  cargarBiblioteca(): void {
    const loggedInUserId = this.authService.getUsuarioId();
    const userIdToLoad = loggedInUserId !== null ? loggedInUserId : this.TEST_USER_ID;

    if (loggedInUserId === null) {
      this.error = `Mostrando biblioteca de prueba (Usuario ID ${this.TEST_USER_ID}). Inicie sesión para ver la suya.`;
    } else {
      this.error = null;
    }

    if (userIdToLoad === null) {
        this.error = 'No se puede cargar el ID de usuario.';
        return;
    }

    this.loading = true;
    this.libraryService.getLibrary(userIdToLoad).subscribe({
      next: (response) => {
       
        this.books = response.books || [];
        this.loading = false;

        if (this.books.length === 0 && loggedInUserId === null) {
            this.error = `Mostrando biblioteca de prueba (ID ${this.TEST_USER_ID}), pero está vacía.`;
        } else if (this.books.length === 0 && loggedInUserId !== null) {
            this.error = 'Aún no tienes libros comprados en tu biblioteca.';
        } else {
            this.error = null;
        }
      },
      error: (err) => {
        console.error('Error al cargar la biblioteca:', err);
        this.error = 'Error al cargar la biblioteca...';
        this.loading = false;
      }
    });
  }
}
