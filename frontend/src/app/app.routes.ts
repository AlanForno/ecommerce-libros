// En app.routes.ts
import { Routes } from '@angular/router';
// Asegúrate de que el nombre aquí coincida con la clase exportada
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetail } from './components/book-detail/book-detail';
import { CartComponent } from './components/cart/cart';
import { CatalogComponent } from './components/catalog/catalog.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'registro',
    component: RegisterComponent 
  },
  { path: 'login',
    component: LoginComponent 
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
