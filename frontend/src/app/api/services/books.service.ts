import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments.develop';
import { Observable } from 'rxjs';
import { Book } from '../../shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  http = inject(HttpClient)


  getBookDetail(id:number):Observable<Book>{
    return this.http.get<Book>(`${enviroments.api_url}/book/book-detail/${id}`)
  }

  getAllBooksPreviews():Observable<Book[]>{
    return this.http.get<Book[]>(`${enviroments.api_url}/book/previews`)
  }
}
