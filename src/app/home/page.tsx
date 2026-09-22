"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import BottomNav from "@/components/ui/BottomNav";
import Emotion, { type EmotionLevel } from "@/components/ui/Emotion";
import SafeArea from "@/components/ui/SafeArea";
import { useAppStore, type DiaryEntry } from "@/lib/store";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function entryFor(entries: DiaryEntry[], date: Date) {
  return entries.find((e) => sameDay(new Date(e.createdAt), date));
}

export default function Home() {
  const router = useRouter();
  const points = useAppStore((s) => s.points);
  const entries = useAppStore((s) => s.entries);

  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekStart = startOfWeek(today);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const recent = entries.slice(0, 3);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <div className="flex w-full items-center justify-between p-4">
          <Logo variant="secondary" />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
        <div className="flex w-full flex-col gap-4">
          <div className="relative h-[196px] w-full overflow-hidden rounded-16 bg-gradient-to-t from-secondary-800 to-secondary-500">
            <div className="absolute left-2 right-2 top-2 z-10 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-2 rounded-12 bg-white p-2"
                onClick={() => router.push("/tutorial")}
              >
                <Image src="/icons/tutorial-20.svg" alt="" width={20} height={20} />
              </button>
              <Link href="/points" className="flex items-center gap-2 rounded-12 bg-white p-2">
                <Image src="/icons/points-badge.svg" alt="" width={20} height={20} />
                <span className="type-body-lg text-grayscale-900">{points}</span>
              </Link>
            </div>

            <div className="absolute left-1/2 top-[27.55%] bottom-[-16.27%] flex w-[190px] -translate-x-1/2 flex-col items-center">
              <div className="relative z-10 mb-[-16px] w-full shrink-0 rounded-16 bg-primary-100 p-4">
                <p className="type-body-md-md text-grayscale-800">오늘은 무슨 일이 있어서 왔어?</p>
                <span className="absolute -bottom-1.5 left-5 h-2.5 w-3 -scale-y-100">
                  <Image src="/icons/bubble-tail.svg" alt="" fill />
                </span>
              </div>
              <div className="absolute left-[115px] top-[72px] h-[117px] w-[105px] opacity-90">
                <Image src="/characters/home/home-character-2.png" alt="" fill className="object-contain" />
              </div>
              <div className="relative h-[138px] w-[120px] shrink-0">
                <Image src="/characters/home/home-character-1.png" alt="" fill className="object-contain" />
              </div>
            </div>
          </div>

          <Link
            href="/journal"
            className="flex w-full items-center justify-center gap-4 rounded-16 bg-primary-200 p-4"
          >
            <span className="type-title-md-md text-primary-900">액땜 기록하기</span>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="type-title-md-bd text-white">이번주 액땜 적립 현황</p>
          <div className="flex w-full items-center rounded-16 bg-white p-4">
            {week.map((date) => {
              const entry = entryFor(entries, date);
              const isToday = sameDay(date, today);
              const isFuture = date >= todayMidnight;

              return (
                <div
                  key={date.toISOString()}
                  className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-16 p-1 ${isToday ? "bg-secondary-50" : ""}`}
                >
                  {entry ? (
                    <Emotion
                      emotion={entry.type === "misfortune" ? "negative" : "positive"}
                      level={entry.score as EmotionLevel}
                    />
                  ) : isFuture ? (
                    <Emotion emotion="upcoming" />
                  ) : (
                    <Emotion emotion="null" />
                  )}
                  <div className="flex w-full flex-col items-center text-center">
                    <p className="type-caption-md-rg text-grayscale-500">{WEEKDAYS[date.getDay()]}</p>
                    <p className="type-body-md-md text-grayscale-900">{date.getDate()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link href="/diary" className="flex w-full items-center gap-4">
            <p className="type-title-md-bd flex-1 text-white">최근 기록</p>
          </Link>

          {recent.length === 0 ? (
            <div className="flex h-[93px] w-full items-center justify-center rounded-16 bg-grayscale-200 p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="type-title-md-bd text-grayscale-700">아직 기록된 일기가 없어요!</p>
                <p className="type-body-md-md text-grayscale-500">오늘 하루를 기록하고 액땜을 적립해요</p>
              </div>
            </div>
          ) : (
            recent.map((entry) => {
              const d = new Date(entry.createdAt);
              const isMisfortune = entry.type === "misfortune";
              return (
                <Link
                  key={entry.id}
                  href={`/diary/${entry.id}`}
                  className="flex w-full items-end gap-4 rounded-16 bg-white p-4"
                >
                  <div className="flex h-full shrink-0 flex-col items-center justify-center border-r border-grayscale-100 pr-4 text-center">
                    <p className="type-caption-md-rg w-6 text-grayscale-500">
                      {String(d.getMonth() + 1).padStart(2, "0")}
                    </p>
                    <p className="type-title-md-bd w-6 text-grayscale-900">{String(d.getDate()).padStart(2, "0")}</p>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex w-full items-center gap-2 border-b border-grayscale-100 pb-2">
                      <span
                        className={`type-caption-md-md shrink-0 rounded-8 px-2 py-1 ${
                          isMisfortune ? "bg-primary-100 text-primary-600" : "bg-positive-100 text-positive-500"
                        }`}
                      >
                        {isMisfortune ? "액땜 적립" : "행운 수령"}
                      </span>
                      <p className="type-title-md-bd min-w-0 flex-1 truncate text-grayscale-950">{entry.title}</p>
                    </div>
                    <p className="type-body-md-md w-full truncate text-grayscale-500">{entry.body}</p>
                  </div>
                  <p
                    className={`type-body-md-md w-8 shrink-0 text-right ${
                      isMisfortune ? "text-negative-400" : "text-positive-400"
                    }`}
                  >
                    {entry.pointsDelta > 0 ? `+${entry.pointsDelta}` : entry.pointsDelta}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
