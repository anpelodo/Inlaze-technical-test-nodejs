/*
  Warnings:

  - Made the column `voteCount` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "voteCount" SET NOT NULL,
ALTER COLUMN "voteCount" SET DEFAULT 0;
