/*
  Warnings:

  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false;
