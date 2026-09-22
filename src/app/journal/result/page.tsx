"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import Button from "@/components/ui/Button";
import StampMark from "@/components/ui/StampMark";
import { useAppStore } from "@/lib/store";

const HEADLINE = {
  misfortune: ["오늘도 액땜했다!", "나중에 얼마나 더 잘 되려고?!"],
  fortune: ["완전 럭키잖아~~~", "이러려고 잘 안 풀리던 순간을 지나온 거구나!"],
};

export default function JournalResult() {
  const router = useRouter();
  const entry = useAppStore((s) => s.entries[0]);

  useEffect(() => {
    if (!entry) router.replace("/home");
  }, [entry, router]);

  if (!entry) return null;

  const isMisfortune = entry.type === "misfortune";
  const headline = HEADLINE[entry.type];
  const deltaText = entry.pointsDelta > 0 ? `+${entry.pointsDelta}` : `${entry.pointsDelta}`;

  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start">
          <SafeArea variant="top" />
          <div className="flex w-full items-center gap-4 p-4">
            <p className="type-title-md-bd flex-1 text-center text-white">
              {isMisfortune ? "액땜 접수하기" : "행운 접수하기"}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-10 px-4 py-5">
          <div className="relative h-[227px] w-[276px]">
            <Image
              src="/characters/onboarding/vector1.svg"
              alt=""
              width={186}
              height={186}
              className="absolute bottom-0 left-0 object-contain opacity-0 [animation:stamp-burst_0.4s_ease-out_0.55s_forwards]"
            />
            <Image
              src={isMisfortune ? "/characters/onboarding/stamp-2.svg" : "/characters/onboarding/stamp-3.svg"}
              alt=""
              width={140}
              height={140}
              className="absolute right-0 top-0 origin-center opacity-0 [animation:stamp-drop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.15s_forwards]"
            />
            <StampMark type={entry.type} />
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <div
              className={`rounded-16 px-3 py-2 ${
                isMisfortune ? "bg-negative-100" : "bg-positive-100"
              }`}
            >
              <p className={`point-header-md ${isMisfortune ? "text-negative-400" : "text-positive-400"}`}>
                {deltaText}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-0 text-center">
              {headline.map((line) => (
                <p key={line} className="type-title-md-bd text-white">
                  {line}
                </p>
              ))}
            </div>
            {entry.overDeduction && (
              <p className="type-caption-md-rg text-center text-grayscale-300">
                쌓아둔 액땜을 다 넘어서는 행운이 찾아왔어요! 남은 액땜은 0으로 싹 비워드렸어요
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2.5 px-4 pb-7">
        <Button onClick={() => router.push("/home")}>홈으로 돌아가기</Button>
        <Button variant="secondary" onClick={() => router.push("/diary")}>
          나의 일기 보러 가기
        </Button>
      </div>
    </div>
  );
}
