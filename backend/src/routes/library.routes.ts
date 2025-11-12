// backend/src/routes/library.routes.ts

import { Router } from 'express';
// ¡CLAVE! Corregir la ruta a subir un solo nivel
import { LibraryController } from '../controllers/library.controller.js'; 

const libraryRouter = Router();
const libraryController = new LibraryController();

libraryRouter.get(
    '/user/:id', 
    libraryController.getLibraryByUser.bind(libraryController)
);

libraryRouter.post(
    '/add', 
    libraryController.addBookToLibrary.bind(libraryController)
);

export default libraryRouter;