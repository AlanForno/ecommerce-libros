import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 🔹 Primero eliminamos datos previos para evitar errores por duplicados
  await prisma.book.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('🧹 Datos previos eliminados.');

  // 🔹 Insertamos algunos libros de ejemplo
  await prisma.book.createMany({
    data: [
      {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        editorial: "Sudamericana",
        descripcion: "Una de las obras más importantes de la literatura hispanoamericana.",
        formato: "Tapa dura",
        paginas: 496,
        anio: "1967",
        genero: "Fantasia",
        precio: 8999.90,
        ruta_imagen:  'images/portada-libro.png',
        valoracion: 4.8
      },
      {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        editorial: "Reynal & Hitchcock",
        descripcion: "Una historia poética y filosófica sobre un pequeño príncipe.",
        formato: "Bolsillo",
        paginas: 96,
        anio: "1943",
        genero: "Novela",
        precio: 4999.00,
        ruta_imagen: 'images/portada-libro.png',
        valoracion: 4.9
      }
    ]
  });

  // 🔹 Insertamos algunos usuarios de ejemplo
  await prisma.usuario.createMany({
    data: [
      {
        nombre: "Admin",
        apellido: "Principal",
        email: "admin@libros.com",
        password: "admin123",
        rol: "admin"
      },
      {
        nombre: "Lore",
        apellido: "Ju",
        email: "lore@correo.com",
        password: "lore123",
        rol: "cliente"
      }
    ]
  });

  console.log('📚 Libros y usuarios de ejemplo insertados correctamente.');
}

// 🔹 Ejecutamos la semilla
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error al ejecutar el seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
