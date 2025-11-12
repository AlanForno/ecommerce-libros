-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Library_usuarioId_bookId_key" ON "Library"("usuarioId", "bookId");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
