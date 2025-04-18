-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "statement" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionsOnExamTemplates" (
    "examTemplateId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("examTemplateId", "questionId"),
    CONSTRAINT "QuestionsOnExamTemplates_examTemplateId_fkey" FOREIGN KEY ("examTemplateId") REFERENCES "ExamTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExamTemplates_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExamTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
