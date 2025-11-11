/*
  Warnings:

  - You are about to alter the column `nombre` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `apellido` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `password` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `rol` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "apellido" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "rol" DROP DEFAULT,
ALTER COLUMN "rol" SET DATA TYPE VARCHAR(50);
