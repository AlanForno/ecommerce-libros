// frontend/src/app/services/library.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private httpClient = inject(HttpClient);
  // Asegúrate de que esta URL coincida con la que usa tu servidor de Node (ej: 3000)
  private baseUrl = 'http://localhost:3000/api/library';

  // 🛒 Función que simula la compra (llama a tu ruta POST /add)
  addBook(userId: number, bookId: number): Observable<any> {
    const body = {
      // Usamos 'userId' y 'bookId' para que coincidan con la desestructuración del Controller
      userId: userId,
      bookId: bookId
    };

    // Petición POST a /api/library/add
    return this.httpClient.post(`${this.baseUrl}/add`, body);
  }

  // 📚 Función para obtener la biblioteca del usuario
  getLibrary(userId: number): Observable<any> {
    // Petición GET a /api/library/user/:id
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`);
  }
}
