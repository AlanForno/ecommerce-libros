import { Router } from "express";
import { BookController } from "../../controllers/book.controller.js";


const bookRouter = Router();
const bookController = new BookController();

bookRouter.get('/previews', bookController.getBooksPreview.bind(bookController));
bookRouter.get('/book-detail/:id',bookController.getBook.bind(bookController));

export default bookRouter;