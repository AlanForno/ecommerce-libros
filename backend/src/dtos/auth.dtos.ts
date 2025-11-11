export interface RegisterBodyDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Opcional. Solo llega si el usuario completó los datos.
  paymentInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface LoginBodyDto {
  username: string;
  password: string;
}