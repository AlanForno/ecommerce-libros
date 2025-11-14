import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error('No autorizado: token inválido o expirado.');
        localStorage.removeItem('token');

        router.navigate(['/login']);

        return throwError(() => ({
          status: 401,
          message: 'Credenciales inválidas. Verificá usuario y contraseña.',
        }));
      }

      return throwError(() => error);
    })
  );
};