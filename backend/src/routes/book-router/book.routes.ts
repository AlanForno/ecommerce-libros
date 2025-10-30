import { Router } from "express";
import { BookController } from "../../controllers/book.controller.js";


const bookRouter = Router();
const bookController = new BookController();

bookRouter.get('/', bookController.getBooks.bind(bookController));

export default bookRouter;