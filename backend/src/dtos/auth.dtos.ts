export interface RegisterBodyDto {
  name: string,
  surname: string,
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  paymentInfoId: string;
}

export interface LoginBodyDto {
  username: string;
  password: string;
}