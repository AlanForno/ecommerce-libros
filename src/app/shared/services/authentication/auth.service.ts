import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);

    //register(user: any):Observable<any>{
      //return this.httpClient.post("http://localhost:3000/register", user);
      //}

    //login(user: any): Observable<any> {
      //return this.httpClient.post("http://localhost:3000/login", user);
        //}
}
