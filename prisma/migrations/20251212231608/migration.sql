/*
  Warnings:

  - Added the required column `gender` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "age" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "gender" "Gender" NOT NULL;
