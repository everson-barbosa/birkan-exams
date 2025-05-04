-- CreateTable
CREATE TABLE "OutBoxEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);

-- CreateIndex
CREATE INDEX "OutBoxEvent_processedAt_idx" ON "OutBoxEvent"("processedAt");
