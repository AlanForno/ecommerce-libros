import * as dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from "express";
import { AppRoutes } from "./routes/routes.js";
import { UserRepository } from "./repositories/user.repository.js";
import { AuthService } from "./services/auth.service.js";
import { AuthController } from './controllers/auth.controller.js';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors())
app.use(AppRoutes.routes);

app.get('/', (req: Request, res: Response) => {
    res.send('API de autenticación corriendo...');
});

app.listen(PORT, () => {
    console.log('Corriendo servidor en el puerto ' + PORT);
})