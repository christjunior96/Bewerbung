-- CreateTable
CREATE TABLE "Employees" (
    "employeeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employeeId")
);
