/*
  Warnings:

  - Made the column `status` on table `ExamTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "ExamTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExamTemplate" ("authorId", "createdAt", "description", "id", "status", "title", "updatedAt") SELECT "authorId", "createdAt", "description", "id", "status", "title", "updatedAt" FROM "ExamTemplate";
DROP TABLE "ExamTemplate";
ALTER TABLE "new_ExamTemplate" RENAME TO "ExamTemplate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
