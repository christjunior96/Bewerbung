-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "text3" TEXT,
ADD COLUMN     "text4" TEXT,
ADD COLUMN     "text5" TEXT;

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "readMinutes" SET DEFAULT 5;
