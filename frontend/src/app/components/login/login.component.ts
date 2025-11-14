import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {}

  username = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle')

  onLogin(): void {
    this.status.set('loading');
    this.errorMessage.set(null);

    const user = this.username();
    const pass = this.password();

    if (!user || !pass) {
      this.errorMessage.set('El nombre de usuario y la contraseña son obligatorios.');
      this.status.set('error');
      return;
    }

    this.authService.login(user, pass).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.status.set('success');
        this.router.navigate(['/catalogo']);
      },

      error: (err) => {
        console.error('Error en el inicio de sesión:', err);

        const msg =
          err.error?.message ||
          err.message ||
          'Error desconocido en el servidor.';

        this.errorMessage.set(msg);
        this.status.set('error');
      }
    });
  }
}
