/*
  Warnings:

  - You are about to drop the column `groupDays` on the `Group` table. All the data in the column will be lost.
  - The `time` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `name` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GroupTime" AS ENUM ('Clock_12_00', 'Clock_12_30', 'Clock_01_00', 'Clock_01_30', 'Clock_02_00', 'Clock_02_30', 'Clock_03_00', 'Clock_03_30', 'Clock_04_00', 'Clock_04_30', 'Clock_05_00', 'Clock_05_30', 'Clock_06_00');

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "groupDays",
ADD COLUMN     "moreInfo" TEXT,
DROP COLUMN "name",
ADD COLUMN     "name" "GroupDays" NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" "GroupTime";
