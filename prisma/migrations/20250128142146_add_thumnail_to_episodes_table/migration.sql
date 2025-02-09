/*
  Warnings:

  - Added the required column `thumbnail` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `episodes` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;
