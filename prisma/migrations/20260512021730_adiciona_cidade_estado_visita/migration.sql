/*
  Warnings:

  - You are about to drop the column `ativa` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `Promotor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Promotor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Promotor` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Promotor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Promotor` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `Visita` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade` to the `Visita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Visita` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Promotor_email_key";

-- AlterTable
ALTER TABLE "Loja" DROP COLUMN "ativa",
DROP COLUMN "cidade",
DROP COLUMN "createdAt",
DROP COLUMN "endereco",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Promotor" DROP COLUMN "ativo",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "telefone",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Visita" DROP COLUMN "observacoes",
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT;

-- DropTable
DROP TABLE "Usuario";
