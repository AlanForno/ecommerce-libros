import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/auth';

  login(email: string, password: string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(usuario => localStorage.setItem('usuario', JSON.stringify(usuario)))
    );
  }

  register(user: any): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/register`, user).pipe(
      tap(usuario => localStorage.setItem('usuario', JSON.stringify(usuario)))
    );
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
  }

  getUsuario(): Usuario | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }
  // Nuevo método: Obtiene solo el ID del usuario logueado
getUsuarioId(): number | null {
  const usuario = this.getUsuario();
  // El ID que tu backend espera es un número
  return usuario ? usuario.id : null;
}
}
