-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "green" BOOLEAN,
ADD COLUMN     "list" TEXT[];

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "image" TEXT,
ADD COLUMN     "readMinutes" INTEGER,
ADD COLUMN     "subtitle" TEXT;
