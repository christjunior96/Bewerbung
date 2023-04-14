-- CreateTable
CREATE TABLE "CarrierFooter" (
    "personId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "CarrierFooter_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "Job" (
    "jobId" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId")
);
