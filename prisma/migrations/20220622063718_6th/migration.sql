/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userid_key" ON "Reaction"("userid");
