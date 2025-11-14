// En app.routes.ts
import { Routes } from '@angular/router';
// Asegúrate de que el nombre aquí coincida con la clase exportada
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetail } from './components/book-detail/book-detail';
import { CartComponent } from './components/cart/cart';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LibraryComponent } from './components/library/library';
import { authGuard } from './shared/guards/auth.guard';


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
    canActivate: [authGuard]
  },
  {
    path: 'carrito',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'catalogo',
    component: CatalogComponent,
    canActivate: [authGuard]
  },
  { path: 'biblioteca',
    component: LibraryComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
