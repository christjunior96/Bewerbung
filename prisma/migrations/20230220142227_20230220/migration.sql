-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "otpvalue" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(250) NOT NULL,
    "lastName" VARCHAR(250) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "confirmedAccount" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);
