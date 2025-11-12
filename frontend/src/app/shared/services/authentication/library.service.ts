import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/library';

  addBook(userId: number, bookId: number): Observable<any> {
    const body = {

      usId: userId,
      bookId: bookId
    };

    return this.httpClient.post(`${this.baseUrl}/add`, body);
  }

  getLibrary(userId: number): Observable<any> {
   
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`);
  }
}
