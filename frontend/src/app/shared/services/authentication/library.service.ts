import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments.develop';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private httpClient = inject(HttpClient);

 addBook(userId: number, bookId: number): Observable<any> {
    const body = { 
      userId: userId, 
      bookId: bookId 
    };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(
      `${enviroments.api_url}/library/add`, 
      body,
      { headers }
    );
  }

  finalizePurchase(userId: number, bookIds: number[]): Observable<any[]> {
    if (bookIds.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
    const purchaseRequests = bookIds.map((bookId) => this.addBook(userId, bookId));
    return forkJoin(purchaseRequests);
  }

  getLibrary(userId: number): Observable<any> {
    return this.httpClient.get(`${enviroments.api_url}/user/${userId}`);
  }
}
