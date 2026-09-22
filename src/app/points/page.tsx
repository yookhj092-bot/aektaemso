"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

type Period = "1주" | "1개월" | "3개월" | "6개월";
type Sort = "최신순" | "과거순";

const PERIOD_DAYS: Record<Period, number> = {
  "1주": 7,
  "1개월": 30,
  "3개월": 90,
  "6개월": 180,
};

export default function Points() {
  const router = useRouter();
  const points = useAppStore((s) => s.points);
  const allEntries = useAppStore((s) => s.entries);

  const [period, setPeriod] = useState<Period>("1주");
  const [sort, setSort] = useState<Sort>("최신순");
  const [showFilter, setShowFilter] = useState(false);
  const [draftPeriod, setDraftPeriod] = useState<Period>(period);
  const [draftSort, setDraftSort] = useState<Sort>(sort);
  const [now] = useState(() => Date.now());

  // running balance after each entry, oldest -> newest
  const balanceById = useMemo(() => {
    const chronological = [...allEntries].reverse();
    const map = new Map<string, number>();
    let running = 0;
    for (const e of chronological) {
      running = Math.max(0, running + e.pointsDelta);
      map.set(e.id, running);
    }
    return map;
  }, [allEntries]);

  const recentGain = allEntries.find((e) => e.type === "misfortune");
  const recentSpend = allEntries.find((e) => e.type === "fortune");

  const filtered = useMemo(() => {
    const cutoff = now - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000;
    let list = allEntries.filter((e) => new Date(e.createdAt).getTime() >= cutoff);
    if (sort === "과거순") list = [...list].reverse();
    return list;
  }, [allEntries, period, sort, now]);

  const monthLabel = `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`;

  function applyFilter() {
    setPeriod(draftPeriod);
    setSort(draftSort);
    setShowFilter(false);
  }

  function resetFilter() {
    setDraftPeriod("1주");
    setDraftSort("최신순");
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-start gap-4 bg-secondary-50">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <div className="flex w-full items-center gap-4 p-4">
          <button type="button" onClick={() => router.back()} className="relative size-6 shrink-0">
            <Image src="/icons/caret-back.svg" alt="뒤로" fill className="object-contain invert" />
          </button>
          <p className="type-title-md-bd flex-1 text-center text-grayscale-900">액땜 적립 현황</p>
          <span className="size-6 shrink-0" />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-4 px-4">
        <div
          className="flex w-full flex-col items-center gap-2 rounded-16 p-4"
          style={{
            backgroundImage:
              "linear-gradient(147deg, var(--color-secondary-100) 2.5%, var(--color-app-bg) 37%)",
          }}
        >
          <p className="type-body-lg text-grayscale-700">현재 나의 액땜 적립 현황</p>
          <div className="flex items-center gap-4">
            <Image src="/icons/points-coin-24.svg" alt="" width={24} height={24} />
            <p className="point-display-lg text-grayscale-900">{points}</p>
          </div>
          <div className="flex w-full items-center justify-center gap-3.5 border-t border-grayscale-100 pt-2">
            <div className="flex flex-1 items-center justify-center gap-2">
              <p className="type-body-md-md text-grayscale-700">최근 적립</p>
              <p className="type-body-md-md text-negative-400">
                {recentGain ? `+${recentGain.pointsDelta}` : "-"}
              </p>
            </div>
            <span className="h-full w-px bg-grayscale-100" />
            <div className="flex flex-1 items-center justify-center gap-2">
              <p className="type-body-md-md text-grayscale-700">최근 상쇄</p>
              <p className="type-body-md-md text-positive-400">
                {recentSpend ? `${recentSpend.pointsDelta}` : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-3 bg-white p-4">
        <button
          type="button"
          onClick={() => {
            setDraftPeriod(period);
            setDraftSort(sort);
            setShowFilter(true);
          }}
          className="flex w-full items-center justify-end gap-2"
        >
          <span className="type-body-md-md text-grayscale-600">{period === "1주" ? "일주일" : period}</span>
          <span className="size-0.5 rounded-full bg-grayscale-400" />
          <span className="type-body-md-md text-grayscale-600">{sort}</span>
          <Image src="/icons/sort-chevron.svg" alt="" width={20} height={20} />
        </button>

        <p className="type-title-md-bd w-full text-grayscale-700">{monthLabel}</p>

        {filtered.length === 0 ? (
          <p className="type-body-md-md w-full py-8 text-center text-grayscale-400">해당 기간의 기록이 없어요</p>
        ) : (
          filtered.map((entry) => {
            const isMisfortune = entry.type === "misfortune";
            const d = new Date(entry.createdAt);
            return (
              <div key={entry.id} className="flex w-full flex-col gap-1">
                <p className="type-caption-md-rg text-grayscale-500">
                  {d.getMonth() + 1}월 {d.getDate()}일
                </p>
                <div className="flex w-full flex-col items-end gap-1">
                  <div className="type-title-sm flex w-full items-center gap-4">
                    <p className="min-w-0 flex-1 text-grayscale-900">{entry.title}</p>
                    <p className={isMisfortune ? "text-negative-400" : "text-positive-400"}>
                      {entry.pointsDelta > 0 ? `+${entry.pointsDelta}` : entry.pointsDelta}
                    </p>
                  </div>
                  <p className="type-caption-md-rg text-grayscale-500">총 액땜 {balanceById.get(entry.id) ?? 0}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] flex-col justify-end">
          <button
            type="button"
            aria-label="닫기"
            className="absolute inset-0 bg-grayscale-950/60"
            onClick={() => setShowFilter(false)}
          />
          <div className="relative flex w-full flex-col gap-5 rounded-t-16 bg-grayscale-100 px-4 py-5">
            <p className="type-title-lg text-grayscale-900">조회조건 선택</p>

            <div className="flex w-full flex-col gap-4">
              <p className="type-title-md-bd text-grayscale-900">조회기간</p>
              <div className="flex w-full items-center gap-2 rounded-12 bg-white p-2">
                {(Object.keys(PERIOD_DAYS) as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDraftPeriod(p)}
                    className={`flex-1 rounded-8 px-4 py-1 ${draftPeriod === p ? "bg-secondary-50" : ""}`}
                  >
                    <span className={`type-body-md-md ${draftPeriod === p ? "text-secondary-500" : "text-grayscale-500"}`}>
                      {p === "1주" ? "일주일" : p}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <p className="type-title-md-bd text-grayscale-900">정렬</p>
              <div className="flex w-full items-start gap-4">
                <Button
                  variant={draftSort === "최신순" ? "secondary" : "assistive"}
                  size="md"
                  onClick={() => setDraftSort("최신순")}
                >
                  최신순
                </Button>
                <Button
                  variant={draftSort === "과거순" ? "secondary" : "assistive"}
                  size="md"
                  onClick={() => setDraftSort("과거순")}
                >
                  과거순
                </Button>
              </div>
            </div>

            <div className="flex w-full items-start gap-4 py-2">
              <Button variant="assistive" size="md" className="w-20 flex-none" onClick={resetFilter}>
                초기화
              </Button>
              <Button size="md" onClick={applyFilter}>
                적용
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
