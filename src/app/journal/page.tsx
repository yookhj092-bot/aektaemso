"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import TopNav from "@/components/ui/TopNav";

export default function JournalChoice() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh w-full flex-col bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <TopNav variant="title" title="액땜 기록하기" onBack={() => router.back()} />
      </div>

      <div className="flex w-full flex-col gap-10 px-4 pb-4">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="relative w-full rounded-16 bg-primary-100 p-4">
            <p className="type-body-lg text-grayscale-800">어떤 하루를 기록하러 왔는지 먼저 볼까?</p>
            <span className="absolute -bottom-1.5 left-5 h-2.5 w-3 -scale-y-100">
              <Image src="/icons/bubble-tail.svg" alt="" fill />
            </span>
          </div>
          <div className="relative h-[265px] w-[187px]">
            <Image src="/characters/journal/journal-default.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-5">
          <p className="type-title-md-bd text-white">내가 생각하기에 오늘 하루는...</p>
          <button
            type="button"
            onClick={() => router.push("/journal/write?type=misfortune")}
            className="w-full rounded-16 border-2 border-primary-200 bg-primary-100 px-4 py-5 text-left"
          >
            <span className="type-body-lg text-primary-800">생각보다 잘 안 풀렸어...</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/journal/write?type=fortune")}
            className="w-full rounded-16 border-2 border-primary-200 bg-primary-100 px-4 py-5 text-left"
          >
            <span className="type-body-lg text-primary-800">기분 좋은 일이 생겼어!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
