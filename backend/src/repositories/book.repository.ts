import { prisma } from "../prisma.js";

export class BookRepository {
  async findBookById(id: number) {
    return await prisma.book.findUnique({
      where: { id: id },
    });
  }

  async findAllBooksPreviews(filtros: any) {
   
    const { busqueda, precioMinimo, precioMaximo, genero } = filtros;

    let condiciones: any = {};

    if (busqueda)
      condiciones = {
        ...condiciones,
        OR: [
          { titulo: { contains: filtros.busqueda, mode: "insensitive" } },
          { autor: { contains: filtros.busqueda, mode: "insensitive" } },
        ],
      };

    if (precioMinimo || precioMaximo) {
      condiciones.precio = {};
      if (precioMinimo) condiciones.precio.gte = Number(precioMinimo);
      if (precioMaximo) condiciones.precio.lte = Number(precioMaximo);
    }

    if (genero) {
      condiciones.genero = { equals: genero, mode: "insensitive" };
    }

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

