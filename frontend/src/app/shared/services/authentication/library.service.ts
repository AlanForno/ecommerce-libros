import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/library';

  private addBook(userId: number, bookId: number): Observable<any> {
    const body = { userId: userId, bookId: bookId };

    return this.httpClient.post(`${this.baseUrl}/add`, body);
  }

  finalizePurchase(userId: number, bookIds: number[]): Observable<any[]> {
    if (bookIds.length === 0) {
      return new Observable(observer => { observer.next([]); observer.complete(); });
    }
    const purchaseRequests = bookIds.map(bookId => this.addBook(userId, bookId));
    return forkJoin(purchaseRequests);
  }

  getLibrary(userId: number): Observable<any> {
    
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`);
  }
}
