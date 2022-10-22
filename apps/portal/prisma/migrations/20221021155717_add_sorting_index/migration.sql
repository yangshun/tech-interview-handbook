-- CreateIndex
CREATE INDEX "QuestionsQuestion_lastSeenAt_id_idx" ON "QuestionsQuestion"("lastSeenAt", "id");

-- CreateIndex
CREATE INDEX "QuestionsQuestion_upvotes_id_idx" ON "QuestionsQuestion"("upvotes", "id");
