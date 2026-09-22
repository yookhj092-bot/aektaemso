"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import BottomNav from "@/components/ui/BottomNav";
import SafeArea from "@/components/ui/SafeArea";
import Emotion from "@/components/ui/Emotion";
import { useAppStore } from "@/lib/store";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DUMMY_DAYS = [13, 14, 15, 16, 17, 18, 19];

type Step = {
  bubbleTop: number;
  text: string;
  highlight?: "record-button" | "points-badge" | "week-calendar" | "recent-list";
};

const STEPS: Step[] = [
  { bubbleTop: 80, text: "왔어? 여기는 액땜소야. 오늘 있었던 일은 여기서 훌훌 털고, 액땜 적립하고 가면 돼." },
  {
    bubbleTop: 80,
    text: "이 버튼을 눌러서 안 좋은 일도, 좋은 일도 뭐든 좋으니 솔직한 하루를 기록해 봐.",
    highlight: "record-button",
  },
  {
    bubbleTop: 276,
    text: "이게 네가 쌓아둔 액땜이야. 눌러 보면 상세 적립 내역을 볼 수 있어.",
    highlight: "points-badge",
  },
  {
    bubbleTop: 80,
    text: "이번주 기록들은 여기서 캘린더로 한눈에 볼 수 있어. 매일매일 도장 찍듯 남겨봐.",
    highlight: "week-calendar",
  },
  {
    bubbleTop: 80,
    text: "방금 접수한 일기는 여기 최근 기록에서 다시 볼 수 있어.",
    highlight: "recent-list",
  },
  { bubbleTop: 80, text: "안 좋은 날은 쌓이고, 좋은 날엔 쓰는 거야. 오늘도 천천히 두고 가." },
];

export default function Tutorial() {
  const router = useRouter();
  const markTutorialSeen = useAppStore((s) => s.markTutorialSeen);
  const points = useAppStore((s) => s.points);
  const [step, setStep] = useState(1);
  const data = STEPS[step - 1];
  const isLast = step === STEPS.length;

  function next() {
    if (isLast) {
      markTutorialSeen();
      router.push("/home");
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-secondary-800">
      {/* background: static home snapshot */}
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <div className="flex w-full items-center justify-between p-4">
          <Logo variant="secondary" />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
        <div className="flex w-full flex-col gap-4">
          <div className="relative h-[196px] w-full overflow-hidden rounded-16 bg-gradient-to-t from-secondary-800 to-secondary-500">
            <div className="absolute left-2 right-2 top-2 flex items-center justify-between">
              <span className="flex items-center gap-2 rounded-12 bg-white p-2">
                <Image src="/icons/tutorial-20.svg" alt="" width={20} height={20} />
              </span>
              <span className="flex items-center gap-2 rounded-12 bg-white p-2">
                <Image src="/icons/points-badge.svg" alt="" width={20} height={20} />
                <span className="type-body-lg text-grayscale-900">{points}</span>
              </span>
            </div>
            <div className="absolute left-1/2 top-[27.55%] flex w-[190px] -translate-x-1/2 flex-col items-center">
              <div className="mb-[-16px] w-full rounded-16 bg-primary-100 p-4">
                <p className="type-body-md-md text-grayscale-800">오늘은 무슨 일이 있어서 왔어?</p>
              </div>
              <div className="relative h-[117px] w-[105px] translate-x-[10px] opacity-90">
                <Image src="/characters/home/home-character-2.png" alt="" fill className="object-contain" />
              </div>
              <div className="relative h-[138px] w-[120px]">
                <Image src="/characters/home/home-character-1.png" alt="" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4 rounded-16 bg-primary-200 p-4">
            <span className="type-title-md-md text-primary-900">액땜 기록하기</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="type-title-md-bd text-white">이번주 액땜 적립 현황</p>
          <div className="flex w-full items-center rounded-16 bg-white p-4">
            {DUMMY_DAYS.map((day, i) => (
              <div key={day} className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-16 p-1">
                <Emotion emotion={i < 4 ? "null" : "upcoming"} />
                <div className="flex w-full flex-col items-center text-center">
                  <p className="type-caption-md-rg text-grayscale-500">{WEEKDAYS[i]}</p>
                  <p className="type-body-md-md text-grayscale-900">{day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="type-title-md-bd text-white">최근 기록</p>
          <div className="flex h-[93px] w-full items-center justify-center rounded-16 bg-grayscale-200 p-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="type-title-md-bd text-grayscale-700">아직 기록된 일기가 없어요!</p>
              <p className="type-body-md-md text-grayscale-500">오늘 하루를 기록하고 액땜을 적립해요</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>

      {/* coach-mark overlay */}
      <button type="button" onClick={next} className="absolute inset-0 z-40 bg-grayscale-950/90 text-left">
        {data.highlight === "record-button" && (
          <div className="absolute left-4 right-4 top-[292px] flex items-center justify-center gap-4 rounded-16 bg-primary-200 p-4">
            <span className="type-title-md-md text-primary-900">액땜 기록하기</span>
          </div>
        )}
        {data.highlight === "points-badge" && (
          <div className="absolute right-6 top-[88px] flex items-center gap-2 rounded-12 bg-white p-2">
            <Image src="/icons/points-badge.svg" alt="" width={20} height={20} />
            <span className="type-body-lg text-grayscale-900">{points}</span>
          </div>
        )}
        {data.highlight === "week-calendar" && (
          <div className="absolute left-4 right-4 top-[232px] flex flex-col gap-3">
            <p className="type-title-md-bd text-white">이번주 액땜 적립 현황</p>
            <div className="flex w-full items-center rounded-16 bg-white p-4">
              {DUMMY_DAYS.map((day, i) => (
                <div key={day} className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-16 p-1">
                  <Emotion emotion={i < 4 ? "null" : "upcoming"} />
                  <div className="flex w-full flex-col items-center text-center">
                    <p className="type-caption-md-rg text-grayscale-500">{WEEKDAYS[i]}</p>
                    <p className="type-body-md-md text-grayscale-900">{day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.highlight === "recent-list" && (
          <div className="absolute left-4 right-4 top-[532px] flex flex-col gap-3">
            <p className="type-title-md-bd text-white">최근 일기</p>
            <div className="flex h-[93px] w-full items-center justify-center rounded-16 bg-grayscale-200 p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="type-title-md-bd text-grayscale-700">아직 기록된 일기가 없어요!</p>
                <p className="type-body-md-md text-grayscale-500">오늘 하루를 기록하고 액땜을 적립해요</p>
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute left-4 right-4 flex items-center gap-4 rounded-16 bg-primary-100 p-4"
          style={{ top: data.bubbleTop }}
        >
          <p className="type-body-lg min-w-0 flex-1 text-left text-grayscale-900">{data.text}</p>
          <div className="relative size-9 shrink-0 overflow-hidden rounded-12 bg-secondary-700">
            <Image src="/characters/tutorial/dugo-mini.svg" alt="" width={36} height={51} className="absolute left-0 top-0.5" />
          </div>
        </div>

        {isLast && (
          <div className="absolute bottom-[296px] left-1/2 h-[265px] w-[210px] -translate-x-1/2">
            <Image src="/characters/tutorial/dugo-final.svg" alt="" fill className="object-contain" />
          </div>
        )}

        <div className="absolute bottom-[105px] left-1/2 flex -translate-x-1/2 items-center gap-1">
          <span className="type-caption-md-md whitespace-nowrap text-white">
            {isLast ? "액땜소 시작!" : "클릭해서 다음 단계로"}
          </span>
          <Image src="/icons/caret-right-16.svg" alt="" width={16} height={16} />
        </div>
      </button>
    </div>
  );
}
