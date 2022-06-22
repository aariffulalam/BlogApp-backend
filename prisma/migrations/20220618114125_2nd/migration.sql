/*
  Warnings:

  - You are about to drop the column `Dislike` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `Like` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `Postid` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `Userid` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `Bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `DP` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `DateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postid` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_Email_key";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "Dislike",
DROP COLUMN "Like",
DROP COLUMN "Postid",
DROP COLUMN "Userid",
ADD COLUMN     "dislike" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "like" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postid" INTEGER NOT NULL,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Bio",
DROP COLUMN "DP",
DROP COLUMN "DateOfBirth",
DROP COLUMN "Email",
DROP COLUMN "Gender",
DROP COLUMN "Password",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dp" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
