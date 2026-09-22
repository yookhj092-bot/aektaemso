"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SafeArea from "@/components/ui/SafeArea";
import TopNav from "@/components/ui/TopNav";
import BottomNav from "@/components/ui/BottomNav";
import { useAppStore } from "@/lib/store";

export default function Diary() {
  const router = useRouter();
  const entries = useAppStore((s) => s.entries);

  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start">
          <SafeArea variant="top" />
          <TopNav variant="title" title="나의 일기" onBack={() => router.back()} />
        </div>

        <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
          <p className="type-title-md-bd text-white">최근 일기</p>

          {entries.length === 0 ? (
            <div className="flex h-[93px] w-full items-center justify-center rounded-16 bg-grayscale-200 p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="type-title-md-bd text-grayscale-700">아직 기록된 일기가 없어요!</p>
                <p className="type-body-md-md text-grayscale-500">오늘 하루를 기록하고 액땜을 적립해요</p>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-3">
              {entries.map((entry) => {
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
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
