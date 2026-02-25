'use client';

import { Suspense } from "react";
import EmotionJournalPage from "./EmotionJournalContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading journal...</div>}>
      <EmotionJournalPage />
    </Suspense>
  );
}