/*
  Warnings:

  - Added the required column `status` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "like_count" INTEGER NOT NULL DEFAULT 0;
