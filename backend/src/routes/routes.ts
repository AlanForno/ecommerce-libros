import { Router } from "express";
import bookRouter from "./book-router/book.routes.js";
import {authRouter} from "./auth-router/auth.routes.js";
import cartRouter from "./cart-router/cart.routes.js";
import libraryRouter from './library.routes.js';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/book', bookRouter);
        router.use('/api/library', libraryRouter); 
        router.use('/api/auth', authRouter);
       router.use('/api/cart', cartRouter);  

        return router;
    }
}
