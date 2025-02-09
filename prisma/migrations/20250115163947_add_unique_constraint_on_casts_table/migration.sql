/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `casts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `casts_name_key` ON `casts`(`name`);
