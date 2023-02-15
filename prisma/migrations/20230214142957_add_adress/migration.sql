/*
  Warnings:

  - Added the required column `org_address` to the `org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org" ADD COLUMN     "org_address" TEXT NOT NULL;
