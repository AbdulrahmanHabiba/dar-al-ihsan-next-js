/*
  Warnings:

  - Changed the type of `category` on the `Magazine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MagazineCategory" AS ENUM ('STUDENT_OF_THE_MONTH', 'TEACHER_OF_THE_MONTH');

-- AlterTable
ALTER TABLE "Magazine" DROP COLUMN "category",
ADD COLUMN     "category" "MagazineCategory" NOT NULL;

-- CreateTable
CREATE TABLE "Graduate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "graduationYear" INTEGER,
    "achievement" TEXT,
    "moreInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Graduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);
