
import { UserRepository } from "../repositories/user.repository.js";
import type { RegisterBodyDto, LoginBodyDto } from '../dtos/auth.dtos.js';
import type { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { boolean } from "zod";


type UserWithoutPassword = Omit<User, 'password'>;

const JWT_SECRET = process.env.JWT_SECRET|| 'FALLBACK_SECRET_INSEGURO';

export class AuthService {

    constructor(private userRepository: UserRepository) { }
    /**
     * Lógica de registro de usuario.
     * (Sintaxis de método de clase corregida: sin ':' ni '=>')
     */
    async register(userData: RegisterBodyDto): Promise<UserWithoutPassword> {
        const { username, email, password, confirmPassword, paymentInfo } = userData;

        let creditCard = false;

        if (password !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden.');
        }
        if (await this.userRepository.findByEmail(email)) {
            throw new Error('El email ya está en uso.');
        }
        if (await this.userRepository.findByUsername(username)) {
            throw new Error('El nombre de usuario ya está en uso.');
        }
        if(paymentInfo !== null){
            creditCard = true;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.createUser({
            username,
            email,
            password: hashedPassword,
            hasCreditCard: creditCard
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    /**
     * Lógica de Login de usuario.
     * (Sintaxis de método de clase corregida)
     */
    async login(loginData: LoginBodyDto): Promise<{ token: string }> {
        console.log("LOGIN BODY:", loginData);
        const { username, password } = loginData;
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error('Credenciales inválidas.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas.');
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token };
    }
}