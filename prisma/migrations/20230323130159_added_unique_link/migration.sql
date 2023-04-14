/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Page_link_key" ON "Page"("link");
