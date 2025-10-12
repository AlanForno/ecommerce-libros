// En app.routes.ts
import { Routes } from '@angular/router';
// Asegúrate de que el nombre aquí coincida con la clase exportada
import { HomeComponent } from './home/home.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent } // Usa el nombre correcto
];