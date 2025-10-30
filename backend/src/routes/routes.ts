import { Router } from "express";
import bookRouter from "./book-router/book.routes.js";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/book', bookRouter);

        return router;
    }

}