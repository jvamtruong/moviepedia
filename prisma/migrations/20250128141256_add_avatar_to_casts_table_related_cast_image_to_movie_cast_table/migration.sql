/*
  Warnings:

  - You are about to drop the column `createdAt` on the `casts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `casts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `episodes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `episodes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `genres` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `genres` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `movie_cast` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movie_cast` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `movie_country` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movie_country` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `movie_genre` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movie_genre` table. All the data in the column will be lost.
  - Added the required column `description` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `casts` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `countries` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `episodes` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `genres` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `movie_cast` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `relatedCastImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `movie_country` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `movie_genre` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `cast_episode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `castId` INTEGER NOT NULL,
    `episodeId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cast_episode` ADD CONSTRAINT `cast_episode_castId_fkey` FOREIGN KEY (`castId`) REFERENCES `casts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cast_episode` ADD CONSTRAINT `cast_episode_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
