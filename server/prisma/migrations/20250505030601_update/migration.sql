/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fileUrl",
DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[];
