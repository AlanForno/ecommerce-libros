// En app.routes.ts
import { Routes } from '@angular/router';
// Asegúrate de que el nombre aquí coincida con la clase exportada
import { HomeComponent } from './home/home.component';
import { BookDetail } from './book-detail/book-detail';
import { CartComponent } from './cart/cart';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detalle/:id',
    component: BookDetail,
  },
  {
    path: 'carrito',
    component: CartComponent
  },
  {
    path: 'catalogo',
    component: CatalogComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
