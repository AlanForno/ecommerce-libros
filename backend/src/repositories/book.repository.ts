import { prisma } from "../prisma.js";

export class BookRepository {
  async findBookById(id: number) {
    return await prisma.book.findUnique({
      where: { id: id },
    });
  }

  async findAllBooksPreviews(filtros: {
    busqueda?: string;
    precioMinimo?: number;
    precioMaximo?: number;
    genero?: string;
  }) {
    const { busqueda, precioMinimo, precioMaximo, genero } = filtros;
    const condiciones: any = {};

    // 🔹 Filtro por búsqueda (titulo o autor)
    if (busqueda) {
      condiciones.OR = [
        { titulo: { contains: busqueda, mode: "insensitive" } },
        { autor: { contains: busqueda, mode: "insensitive" } },
      ];
    }

    // 🔹 Filtro por rango de precio
    if (precioMinimo || precioMaximo) {
      condiciones.precio = {};
      if (precioMinimo) condiciones.precio.gte = Number(precioMinimo);
      if (precioMaximo) condiciones.precio.lte = Number(precioMaximo);
    }

    // 🔹 Filtro por género (acá estaba el problema)
    if (genero && genero.trim() !== "") {
      condiciones.genero = {
        contains: genero,
        mode: "insensitive",
      };
    }

    // 🔹 Consulta final Prisma
    return await prisma.book.findMany({
      select: {
        id: true,
        titulo: true,
        autor: true,
        genero: true,
        formato: true,
        precio: true,
        ruta_imagen: true,
      },
      where: condiciones,
    });
  }
}
