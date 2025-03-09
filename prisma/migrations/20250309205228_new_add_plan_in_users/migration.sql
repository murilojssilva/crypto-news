/*
  Warnings:

  - Made the column `endPremium` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startPremium` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `endPremium` DATETIME(3) NOT NULL,
    MODIFY `startPremium` DATETIME(3) NOT NULL;
