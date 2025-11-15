import { Router } from "express";
import { CartController } from "../../controllers/cart.controller.js";

const router = Router();

router.get('/:userId', CartController.getCart);

router.post('/add', CartController.addToCart); 

router.delete('/:id', CartController.removeFromCart);

router.delete('/', CartController.clearCart);

export default router;
