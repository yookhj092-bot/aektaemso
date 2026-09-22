"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import TopNav from "@/components/ui/TopNav";
import Button from "@/components/ui/Button";
import { useAppStore, type EmotionScore, type EntryType } from "@/lib/store";
import { NEGATIVE_QUOTES, POSITIVE_QUOTES } from "@/lib/emotionQuotes";

const SCORES: EmotionScore[] = [1, 3, 5, 7, 10];

const COPY: Record<EntryType, { navTitle: string; bubble: string; sectionTitle: string; placeholder: string }> = {
  misfortune: {
    navTitle: "액땜 기록하기",
    bubble: "뭐 그런 날도 있는 거지. 쌓였던 거 여기에 전부 적고 액땜 했다고 치자.",
    sectionTitle: "오늘의 액땜 일기",
    placeholder: "오늘의 하루가 어땠는지 적어보세요",
  },
  fortune: {
    navTitle: "행운 기록하기",
    bubble: "잘 됐네. 이렇게 되려고 액땜 했나 보다.\n오늘의 기분 좋은 내용을 맘껏 적어봐.",
    sectionTitle: "오늘의 행운 일기",
    placeholder: "오늘의 하루가 어땠는지 적어보세요",
  },
};

function WriteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const type: EntryType = params.get("type") === "fortune" ? "fortune" : "misfortune";
  const addEntry = useAppStore((s) => s.addEntry);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState<EmotionScore | null>(null);

  const copy = COPY[type];
  const quotes = type === "misfortune" ? NEGATIVE_QUOTES : POSITIVE_QUOTES;
  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && score !== null;
  const charCount = title.length + body.length;

  function handleSubmit() {
    if (!canSubmit || score === null) return;
    addEntry(type, title.trim(), body.trim(), score);
    router.push("/journal/result");
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <TopNav variant="title" title={copy.navTitle} onBack={() => router.back()} />
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-4 px-4 pb-4">
        <div className="flex w-full items-center gap-4 rounded-16 bg-primary-100 p-4">
          <p className="type-body-lg min-w-0 flex-1 whitespace-pre-line text-grayscale-900">{copy.bubble}</p>
          <div className="relative size-9 shrink-0 overflow-hidden rounded-12 bg-secondary-700">
            <Image src="/characters/journal/journal-mini.svg" alt="" width={36} height={51} className="absolute left-0 top-0.5" />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <p className="type-title-md-bd text-white">{copy.sectionTitle}</p>
          <div className="flex w-full flex-col items-end gap-3">
            <div className="flex h-[360px] w-full flex-col gap-2 rounded-16 bg-white p-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                placeholder="제목"
                className="type-title-md-bd w-full border-b border-grayscale-100 pb-2 text-grayscale-950 placeholder:text-grayscale-400 focus:outline-none"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, 1000 - title.length))}
                placeholder={copy.placeholder}
                className="type-body-md-md w-full flex-1 resize-none text-grayscale-800 placeholder:text-grayscale-400 focus:outline-none"
              />
            </div>
            <p className="type-caption-md-rg text-grayscale-400">{charCount}/1,000</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <p className="type-title-md-bd w-full text-white">오늘의 기분 점수</p>
          <div className="flex w-full items-center justify-between px-5">
            {SCORES.map((level) => {
              const active = score === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setScore(level)}
                  className={`flex w-11 items-center justify-center rounded-full py-2 ${
                    active ? "border-4 border-secondary-300 bg-secondary-200" : "border-3 border-grayscale-300 bg-grayscale-200"
                  }`}
                >
                  <span className={`type-title-lg ${active ? "text-secondary-500" : "text-grayscale-600"}`}>{level}</span>
                </button>
              );
            })}
          </div>
          {score !== null && (
            <div className="relative flex w-full items-center gap-4 rounded-16 bg-secondary-50 p-4">
              <p className="type-body-lg min-w-0 flex-1 text-grayscale-900">&ldquo;{quotes[score]}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-start px-4 pb-7">
        <Button variant={canSubmit ? "primary" : "disabled"} disabled={!canSubmit} onClick={handleSubmit}>
          작성 완료
        </Button>
      </div>
    </div>
  );
}

export default function JournalWrite() {
  return (
    <Suspense>
      <WriteForm />
    </Suspense>
  );
}
