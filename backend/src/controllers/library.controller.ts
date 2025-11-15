import type { Request, Response } from "express";
import { LibraryRepository } from "../repositories/library.repository.js";
import { LibraryService } from "../services/library.service.js";

const libraryRepository = new LibraryRepository();
const libraryService = new LibraryService(libraryRepository);

export class LibraryController {
  public getLibraryByUser = async (req: Request, res: Response) => {
    const userIdParam = req.params.id;
    if (!userIdParam) {
      return res.status(400).json({ error: "ID de usuario ausente." });
    }
    const usuarioId = Number(userIdParam);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    try {
      const books = await libraryService.getLibraryForUser(usuarioId);

      return res.json({ books });
    } catch (error: any) {
      if (error.message === "Usuario no encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res
        .status(500)
        .json({
          error: "Error interno del servidor al consultar la biblioteca.",
        });
    }
  };

  public addBookToLibrary = async (req: Request, res: Response) => {
    try {
      const { userId, bookId } = req.body;
      const numericUserId = parseInt(userId, 10);
      const numericBookId = parseInt(bookId, 10);

      if (isNaN(numericUserId) || isNaN(numericBookId)) {
        return res
          .status(400)
          .json({ error: "ID de usuario o libro inválido." });
      }

      const newEntry = await libraryService.addBookToLibrary(
        numericUserId,
        numericBookId
      );
      return res
        .status(201)
        .json({
          message: "Libro agregado a la biblioteca exitosamente.",
          book: newEntry.book,
        });
    } catch (error: any) {
      // Capturamos el error si el libro ya existe
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ error: "El libro ya está en la biblioteca." });
      }
      console.error("Error al persistir el libro:", error);
      return res
        .status(500)
        .json({ error: "No se pudo completar la transacción." });
    }
  };
}
