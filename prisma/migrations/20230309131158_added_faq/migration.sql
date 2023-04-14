-- CreateTable
CREATE TABLE "FAQ" (
    "faqId" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("faqId")
);
