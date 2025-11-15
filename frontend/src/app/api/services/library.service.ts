import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../enviroments/enviroments.develop';
import { Book, BookPreview } from '../../shared/interfaces/book';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private httpClient = inject(HttpClient);

  addBook(userId: number, bookId: number): Observable<any> {
    const body = { userId: userId, bookId: bookId };

    return this.httpClient.post(`${enviroments.api_url}/library/add/`, body);
  }

  getLibrary(userId: number): Observable<BookPreview[]> {
    return this.httpClient
      .get<{ books: BookPreview[] }>(`${enviroments.api_url}/library/user/${userId}`)
      .pipe(map((response) => response.books));
  }
}
