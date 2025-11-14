import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments.develop';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private httpClient = inject(HttpClient);

  addBook(userId: number, bookId: number): Observable<any> {
    const body = { userId: userId, bookId: bookId };

    return this.httpClient.post(`${enviroments.api_url}/library/add/`, body);
  }



  getLibrary(userId: number): Observable<any> {
    return this.httpClient.get(`${enviroments.api_url}/user/${userId}`);
  }
}
