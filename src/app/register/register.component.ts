import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  imports:[FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

 // Datos de acceso
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Datos de pago (opcional)
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  errorMessage: string = '';

  // Expresiones regulares
  private readonly EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  private readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private readonly CARD_NUMBER_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  private readonly EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
  private readonly CVV_REGEX = /^\d{3,4}$/;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    //Inicializacion
  }

  onRegister(): void {
    this.errorMessage = '';

    if (!this.validateAccessData()) {
      return;
    }

    if (!this.validatePaymentData()) {
      return;
    }

    this.performRegistration();
  }

  private validateAccessData(): boolean {

    if (!this.username.trim()) {
      this.errorMessage = 'El nombre de usuario es obligatorio';
      return false;
    }

    if (!this.USERNAME_REGEX.test(this.username)) {
      this.errorMessage = 'El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos';
      return false;
    }

    if (!this.email.trim()) {
      this.errorMessage = 'El correo electrónico es obligatorio';
      return false;
    }

    if (!this.EMAIL_REGEX.test(this.email)) {
      this.errorMessage = 'El correo electrónico no es válido';
      return false;
    }

    if (!this.password) {
      this.errorMessage = 'La contraseña es obligatoria';
      return false;
    }

    if (!this.PASSWORD_REGEX.test(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales';
      return false;
    }

    if (!this.confirmPassword) {
      this.errorMessage = 'Debes confirmar tu contraseña';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }

    return true;
  }

  private validatePaymentData(): boolean {
    // Si no se proporcionaron datos de pago, no hay nada que validar
    const hasPaymentData = this.cardNumber || this.expiryDate || this.cvv;
    
    if (!hasPaymentData) {
      return true;
    }

    // Si se proporcionó algún dato de pago, validar todos
    if (this.cardNumber && !this.CARD_NUMBER_REGEX.test(this.cardNumber)) {
      this.errorMessage = 'El número de tarjeta debe tener el formato XXXX-XXXX-XXXX-XXXX';
      return false;
    }

    if (this.expiryDate) {
      if (!this.EXPIRY_DATE_REGEX.test(this.expiryDate)) {
        this.errorMessage = 'La fecha de vencimiento debe tener el formato MM/AA';
        return false;
      }

      if (!this.isValidExpiryDate(this.expiryDate)) {
        this.errorMessage = 'La tarjeta está vencida';
        return false;
      }
    }

    if (this.cvv && !this.CVV_REGEX.test(this.cvv)) {
      this.errorMessage = 'El CVV debe tener 3 o 4 dígitos';
      return false;
    }

    if (hasPaymentData && (!this.cardNumber || !this.expiryDate || !this.cvv)) {
      this.errorMessage = 'Si agregas un método de pago, debes completar todos los campos de tarjeta';
      return false;
    }

    return true;
  }

  private isValidExpiryDate(expiryDate: string): boolean {
    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear) {
      return false;
    }

    if (year === currentYear && month < currentMonth) {
      return false;
    }

    return true;
  }

  private performRegistration(): void {

    const registrationData = {
      username: this.username,
      email: this.email,
      password: this.password,
      ...(this.cardNumber && {
        paymentInfo: {
          cardNumber: this.cardNumber,
          expiryDate: this.expiryDate,
          cvv: this.cvv
        }
      })
    };

    console.log('Datos de registro:', registrationData);

    // this.authService.register(registrationData).subscribe({
    //   next: (response) => {
    //     console.log('Registro exitoso', response);
    //     this.router.navigate(['/login']);
    //   },
    //   error: (error) => {
    //     this.errorMessage = error.message || 'Error al crear la cuenta';
    //   }
    // });

    // Por ahora, simular éxito
    alert('¡Cuenta creada exitosamente!');
    this.router.navigate(['/login']);
  }
}

