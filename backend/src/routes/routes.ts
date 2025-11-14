import { Router } from "express";
import bookRouter from "./book-router/book.routes.js";
import {authRouter} from "./auth-router/auth.routes.js";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/book', bookRouter);
        router.use('/api/auth', authRouter)    
        return router;
    }

}