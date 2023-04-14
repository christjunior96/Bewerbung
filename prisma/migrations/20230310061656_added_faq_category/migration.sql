-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "fAQCategoryCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "FAQCategory" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FAQCategory_pkey" PRIMARY KEY ("categoryId")
);

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_fAQCategoryCategoryId_fkey" FOREIGN KEY ("fAQCategoryCategoryId") REFERENCES "FAQCategory"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;
