/*
  Warnings:

  - You are about to drop the `QuestionsOnExamTemplates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuestionsOnExamTemplates";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "QuestionAlternative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "QuestionAlternative_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionsOnExamTemplate" (
    "examTemplateId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("examTemplateId", "questionId"),
    CONSTRAINT "QuestionsOnExamTemplate_examTemplateId_fkey" FOREIGN KEY ("examTemplateId") REFERENCES "ExamTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExamTemplate_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
