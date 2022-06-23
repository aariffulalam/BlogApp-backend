/*
  Warnings:

  - You are about to drop the column `Dislikes` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Likes` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "Dislikes",
DROP COLUMN "Likes",
ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;
