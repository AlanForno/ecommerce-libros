import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpClient = inject(HttpClient);

  constructor(private router: Router) {
  const token = localStorage.getItem('token');

  if (token) {
    this.isAuthenticated.set(true);
  }
}

  isAuthenticated = signal(false);

  register(user: any): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        this.isAuthenticated.set(true);
      })
    );
  }

  cerrarSesion(): void {
    this.isAuthenticated.set(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
// frontend/src/app/services/auth.service.ts (Añadir este método)

getUsuarioId(): number | null {
  // ⚠️ REEMPLAZA esta línea con tu lógica real para obtener el usuario de la sesión/token
  const usuario = JSON.parse(localStorage.getItem('usuario_logueado') || 'null');

  // Asume que el objeto usuario tiene una propiedad 'id' de tipo string o number
  return usuario && usuario.id ? parseInt(usuario.id, 10) : null;
}
}
