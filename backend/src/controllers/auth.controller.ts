import type { Request, Response } from 'express';
import type { RegisterBodyDto, LoginBodyDto } from '../dtos/auth.dtos.ts';
import { AuthService } from '../services/auth.service.js';
import { UserRepository } from '../repositories/user.repository.js';

// Tipamos el Request Body usando los DTOs
type RegisterRequest = Request<never, any, RegisterBodyDto>;
type LoginRequest = Request<never, any, LoginBodyDto>;

export class AuthController {

  constructor(private authService: AuthService) { }

  /**
   * Maneja la petición de registro.
   */
  public register = async (req: RegisterRequest, res: Response): Promise<Response> => {
    try {
      const newUser = await this.authService.register(req.body);
      return res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        user: newUser,
      });
    } catch (error: any) {
      console.log("ERROR REGISTER:", error.message, req.body);
      if (
        error.message.includes('coinciden') ||
        error.message.includes('en uso')
      ) {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };

  /**
   * Maneja la petición de login.
   */
  public login = async (req: LoginRequest, res: Response): Promise<Response> => {
    try {
      const { token } = await this.authService.login(req.body);
      return res.status(200).json({
        message: 'Login exitoso.',
        token: token,
      });
    } catch (error: any) {
      if (error.message.includes('inválidas')) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
};