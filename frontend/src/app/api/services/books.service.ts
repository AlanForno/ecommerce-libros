import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments.develop';
import { Observable } from 'rxjs';
import { Book, BookPreview } from '../../shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  http = inject(HttpClient)


  getBookDetail(id: number): Observable<Book> {
    return this.http.get<Book>(`${enviroments.api_url}/book/book-detail/${id}`);
  }

  getAllBooksPreviews(filtros?: any): Observable<BookPreview[]> {
    let params = new HttpParams();
    if (filtros?.busqueda) params = params.set('busqueda', filtros.busqueda);
    if (filtros?.precioMinimo) params = params.set('precioMinimo', filtros.precioMinimo);
    if (filtros?.precioMaximo) params = params.set('precioMaximo', filtros.precioMaximo);
    // 🔑 AGREGADO: Única línea necesaria para habilitar el envío del filtro 'genero'.
    if (filtros?.genero) params = params.set('genero', filtros.genero);

    return this.http.get<BookPreview[]>(`${enviroments.api_url}/book/previews`, { params });
  }
}