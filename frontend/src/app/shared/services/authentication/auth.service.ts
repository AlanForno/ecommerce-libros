import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpClient = inject(HttpClient);

  register(user: any): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/register`, user);
  }


  login(user: any, pass: any): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/login`, {
    username: user,
    password: pass
  });
  }

  cerrarSesion(): void {
    localStorage.clear();
  }

}
