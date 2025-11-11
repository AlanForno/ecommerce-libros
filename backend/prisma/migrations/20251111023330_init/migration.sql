-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200),
    "autor" VARCHAR(180),
    "editorial" VARCHAR(180),
    "descripcion" TEXT,
    "formato" VARCHAR(80),
    "paginas" INTEGER,
    "anio" VARCHAR(4),
    "genero" VARCHAR(100),
    "precio" DECIMAL(10,2),
    "ruta_imagen" VARCHAR(200),
    "valoracion" DECIMAL(2,1),

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
