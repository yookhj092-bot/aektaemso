"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import TopNav from "@/components/ui/TopNav";
import { useAppStore, type EmotionScore } from "@/lib/store";
import { NEGATIVE_QUOTES, POSITIVE_QUOTES } from "@/lib/emotionQuotes";

const SCORES: EmotionScore[] = [1, 3, 5, 7, 10];

export default function DiaryDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const entry = useAppStore((s) => s.entries.find((e) => e.id === params.id));

  if (!entry) {
    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-secondary-800 px-4 text-center">
        <p className="type-title-md-bd text-white">기록을 찾을 수 없어요</p>
        <button type="button" onClick={() => router.push("/diary")} className="type-body-md-md text-secondary-200 underline">
          나의 일기로 돌아가기
        </button>
      </div>
    );
  }

  const isMisfortune = entry.type === "misfortune";
  const quotes = isMisfortune ? NEGATIVE_QUOTES : POSITIVE_QUOTES;
  const d = new Date(entry.createdAt);
  const bubbleText = isMisfortune
    ? `이 날 ${entry.score}만큼 액땜이 쌓였어. 참 애썼다.`
    : `그간의 액땜에서 ${entry.score}만큼 상쇄된 날이야. 기분 좋은 하루 축하해!`;

  return (
    <div className="flex min-h-dvh w-full flex-col items-start bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <TopNav variant="title" title="나의 일기" onBack={() => router.back()} />
      </div>

      <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
        <div
          className={`flex w-full items-center gap-4 rounded-16 p-4 ${
            isMisfortune ? "bg-primary-100" : "bg-positive-100"
          }`}
        >
          <p className="type-body-lg min-w-0 flex-1 text-grayscale-900">{bubbleText}</p>
          <div className="relative size-9 shrink-0 overflow-hidden rounded-12 bg-secondary-700">
            <Image
              src={isMisfortune ? "/characters/journal/journal-mini.svg" : "/characters/journal/journal-mini-fortune.svg"}
              alt=""
              width={36}
              height={51}
              className="absolute left-0 top-0.5"
            />
          </div>
        </div>

        <p className="type-title-md-bd text-white">
          {d.getMonth() + 1}월 {d.getDate()}일의 일기
        </p>

        <div className="flex w-full flex-col gap-2 rounded-16 bg-white p-4">
          <p className="type-title-md-bd border-b border-grayscale-100 pb-2 text-grayscale-950">{entry.title}</p>
          <p className="type-body-md-md whitespace-pre-line text-grayscale-800">{entry.body}</p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <p className="type-title-md-bd w-full text-white">이날 나의 기분 점수</p>
          <div className="flex w-full items-center justify-between px-5">
            {SCORES.map((level) => {
              const active = entry.score === level;
              return (
                <div
                  key={level}
                  className={`flex w-11 items-center justify-center rounded-full py-2 ${
                    active ? "border-4 border-secondary-300 bg-secondary-200" : "border-3 border-grayscale-300 bg-grayscale-200"
                  }`}
                >
                  <span className={`type-title-lg ${active ? "text-secondary-500" : "text-grayscale-600"}`}>{level}</span>
                </div>
              );
            })}
          </div>
          <div className="flex w-full items-center gap-4 rounded-16 bg-secondary-50 p-4">
            <div className="relative size-9 shrink-0">
              <Image src={`/emotion/${entry.type === "misfortune" ? "negative" : "positive"}-${entry.score}.svg`} alt="" fill className="object-contain" />
            </div>
            <p className="type-body-lg min-w-0 flex-1 text-grayscale-900">&ldquo;{quotes[entry.score]}&rdquo;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
