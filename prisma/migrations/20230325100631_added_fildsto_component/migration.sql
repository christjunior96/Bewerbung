/*
  Warnings:

  - You are about to drop the column `buttonLink` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Component` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "buttonLink",
DROP COLUMN "imageUrl",
ADD COLUMN     "text1" TEXT,
ADD COLUMN     "text2" TEXT,
ADD COLUMN     "url" TEXT;
