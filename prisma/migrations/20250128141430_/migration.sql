/*
  Warnings:

  - You are about to drop the column `createdAt` on the `movie_production` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movie_production` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `watch_links` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `watch_links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movie_production` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `productions` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `watch_links` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
