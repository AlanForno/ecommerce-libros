import { Router } from "express";
import bookRouter from "./book-router/book.routes.js";
import cartRouter from "./cart-router/cart.routes.js";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/book', bookRouter);
        router.use('/api/cart', cartRouter); 

        return router;
    }

}