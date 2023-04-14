/*
  Warnings:

  - You are about to drop the column `buttonId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `headlineId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `textId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the `Button` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Headline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `pageId` on table `Component` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_buttonId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_headlineId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_textId_fkey";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "buttonId",
DROP COLUMN "headlineId",
DROP COLUMN "imageId",
DROP COLUMN "textId",
ADD COLUMN     "buttonLabel" TEXT,
ADD COLUMN     "buttonLink" TEXT,
ADD COLUMN     "headlineType" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "text" TEXT,
ALTER COLUMN "pageId" SET NOT NULL;

-- DropTable
DROP TABLE "Button";

-- DropTable
DROP TABLE "Headline";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Text";

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
