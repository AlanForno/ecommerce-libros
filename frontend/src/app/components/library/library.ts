import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  imports: [CommonModule]
})
export class LibraryComponent implements OnInit {

  private http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api/library';

  books: any[] = [];
  loading = false;
  error: string | null = null;

  // Suponemos que tenés el usuario logueado en localStorage
  usuarioId = localStorage.getItem('usuarioId');

  ngOnInit(): void {
    this.cargarBiblioteca();
  }

  cargarBiblioteca(): void {
    if (!this.usuarioId) {
      this.error = 'No hay usuario logueado';
      return;
    }

    this.loading = true;
    this.error = null;

    this.http.get<any[]>(`${this.baseUrl}/user/${this.usuarioId}`).subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar la biblioteca';
        this.loading = false;
      }
    });
  }
}
