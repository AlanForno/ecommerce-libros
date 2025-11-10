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
    if (busqueda) condiciones = {
      ...condiciones,
      OR: [
        { titulo: { contains: filtros.busqueda, mode: 'insensitive' } },
        { autor: { contains: filtros.busqueda, mode: 'insensitive' } }
      ]
    };

    if (genero) condiciones = { ...condiciones, genero: String(genero) };

    let precioCondicion: any = {};
    if (precioMinimo) precioCondicion.gte = Number(precioMinimo);
    if (precioMaximo) precioCondicion.lte = Number(precioMaximo);

    if (Object.keys(precioCondicion).length > 0) {
      condiciones = { ...condiciones, precio: precioCondicion };
    }

    return await prisma.book.findMany({
      select: {
        id: true,
        precio: true,
        ruta_imagen: true,
      },
      where: condiciones
    });
  }
}