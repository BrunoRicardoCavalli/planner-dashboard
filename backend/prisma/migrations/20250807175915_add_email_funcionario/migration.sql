/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Funcionario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Funcionario` table. All the data in the column will be lost.
  - Added the required column `dataContratacao` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Funcionario" DROP COLUMN "criadoEm",
DROP COLUMN "telefone",
ADD COLUMN     "dataContratacao" TIMESTAMP(3) NOT NULL;
