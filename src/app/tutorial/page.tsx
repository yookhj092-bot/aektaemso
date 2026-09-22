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

function DugoCharacter() {
  return (
    <>
      <div className="absolute left-[115px] top-[72px] h-[117px] w-[105px] overflow-hidden opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/characters/home/home-character-1.png"
          alt=""
          className="absolute"
          style={{ height: "138.87%", width: "155.39%", left: "-27.63%", top: "-19.6%", maxWidth: "none" }}
        />
      </div>
      <div className="relative h-[137.895px] w-[120px] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/characters/home/home-character-2.png"
          alt=""
          className="absolute"
          style={{ height: "114.5%", width: "157.89%", left: "-29.82%", top: "-8.4%", maxWidth: "none" }}
        />
      </div>
    </>
  );
}

function RecentRecordRow() {
  return (
    <div className="flex w-full items-end gap-4 rounded-16 bg-white p-4">
      <div className="flex shrink-0 self-stretch">
        <div className="flex h-full flex-col items-center justify-center border-r border-grayscale-100 pr-4 text-center">
          <p className="type-caption-md-rg w-6 text-grayscale-500">09</p>
          <p className="type-title-md-bd w-6 text-grayscale-900">16</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex w-full items-center gap-2 border-b border-grayscale-100 pb-2">
          <span className="type-caption-md-md shrink-0 rounded-8 bg-positive-100 px-2 py-1 text-positive-500">
            행운 수령
          </span>
          <p className="type-title-md-bd min-w-0 flex-1 truncate text-grayscale-950">정규직 전환!!!!!!</p>
        </div>
        <p className="type-body-md-md w-full truncate text-grayscale-500">예상보다 빨리 정규직 전환 소식을 들었다</p>
      </div>
      <p className="type-body-md-md w-8 shrink-0 text-right text-positive-400">-10</p>
    </div>
  );
}

type ArrowSpec = {
  src: string;
  rotate: number;
  boxTop: number;
  boxRight: number;
  boxW: number;
  boxH: number;
  innerW: number;
  innerH: number;
};

type Step = {
  bubbleTop: number;
  text: string;
  highlight?: "record-button" | "points-badge" | "week-calendar" | "recent-list";
  arrow?: ArrowSpec;
};

const STEPS: Step[] = [
  { bubbleTop: 80, text: "왔어? 여기는 액땜소야. 오늘 있었던 일은 여기서 훌훌 털고, 액땜 적립하고 가면 돼." },
  {
    bubbleTop: 80,
    text: "이 버튼을 눌러서 안 좋은 일도, 좋은 일도 뭐든 좋으니 솔직한 하루를 기록해 봐.",
    highlight: "record-button",
    arrow: {
      src: "/characters/tutorial/arrow-2.svg",
      rotate: 68.61,
      boxTop: 160,
      boxRight: 13.76,
      boxW: 107.242,
      boxH: 120.924,
      innerW: 100.116,
      innerH: 75.955,
    },
  },
  {
    bubbleTop: 276,
    text: "이게 네가 쌓아둔 액땜이야. 눌러 보면 상세 적립 내역을 볼 수 있어.",
    highlight: "points-badge",
    arrow: {
      src: "/characters/tutorial/arrow-3.svg",
      rotate: -111.39,
      boxTop: 140,
      boxRight: 25.76,
      boxW: 107.242,
      boxH: 120.924,
      innerW: 100.116,
      innerH: 75.955,
    },
  },
  {
    bubbleTop: 80,
    text: "이번주 기록들은 여기서 캘린더로 한눈에 볼 수 있어. 매일매일 도장 찍듯 남겨봐.",
    highlight: "week-calendar",
    arrow: {
      src: "/characters/tutorial/arrow-4.svg",
      rotate: 68.61,
      boxTop: 160,
      boxRight: -9.7,
      boxW: 276.3,
      boxH: 311.6,
      innerW: 258,
      innerH: 195.7,
    },
  },
  {
    bubbleTop: 80,
    text: "방금 접수한 일기는 여기 최근 기록에서 다시 볼 수 있어.",
    highlight: "recent-list",
    arrow: {
      src: "/characters/tutorial/arrow-5.svg",
      rotate: 68.61,
      boxTop: 160,
      boxRight: -36.28,
      boxW: 342.276,
      boxH: 385.946,
      innerW: 319.533,
      innerH: 242.42,
    },
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
                <span className="relative size-5 shrink-0">
                  <Image src="/icons/tutorial-20.svg" alt="" fill className="object-contain" />
                </span>
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
              <DugoCharacter />
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4 rounded-16 bg-primary-200 p-4">
            <span className="size-6 shrink-0" />
            <span className="type-title-md-md flex-1 text-center text-primary-900">액땜 기록하기</span>
            <Image src="/icons/arrow-right-24.svg" alt="" width={24} height={24} className="shrink-0" />
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
          <RecentRecordRow />
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>

      {/* coach-mark overlay */}
      <button type="button" onClick={next} className="absolute inset-0 z-40 bg-grayscale-950/90 text-left">
        {data.highlight === "record-button" && (
          <div className="absolute left-4 right-4 top-[292px] flex items-center gap-4 rounded-16 bg-primary-200 p-4">
            <span className="size-6 shrink-0" />
            <span className="type-title-md-md flex-1 text-center text-primary-900">액땜 기록하기</span>
            <Image src="/icons/arrow-right-24.svg" alt="" width={24} height={24} className="shrink-0" />
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
            <RecentRecordRow />
          </div>
        )}

        {data.arrow && (
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: data.arrow.boxTop,
              right: data.arrow.boxRight,
              width: data.arrow.boxW,
              height: data.arrow.boxH,
            }}
          >
            <div style={{ transform: `rotate(${data.arrow.rotate}deg)` }}>
              <Image src={data.arrow.src} alt="" width={data.arrow.innerW} height={data.arrow.innerH} />
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
