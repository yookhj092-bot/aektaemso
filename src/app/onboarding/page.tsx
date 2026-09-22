"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import TextButton from "@/components/ui/TextButton";
import Button from "@/components/ui/Button";
import SafeArea from "@/components/ui/SafeArea";
import StampMark from "@/components/ui/StampMark";
import { useAppStore } from "@/lib/store";

const STEPS = [
  {
    title: ["오늘 하루,", "일이 좀 꼬였어?"],
    body: [
      "이상하리만큼 맘대로 잘 안 되고 힘든 하루가 있지.",
      "",
      "그냥 한 번 액땜 했다 치자!",
      "나중에 엄~청 잘 되려고 그러나 보지",
      "여기까지 온 김에 액땜 적립하고 가는 거 어때?",
    ],
    cta: "좋아. 액땜 했다 치자!",
  },
  {
    title: ["고생한 하루", "그냥 보내긴 아깝잖아"],
    body: [
      "오늘 하루를 기록하면서",
      "마음도 풀고, 액땜은 쌓아 올려",
      "",
      "나중에 다가올 행운을 위해 오늘을 바쳤다고 생각하는 거야",
    ],
    cta: "한 번 해볼게",
  },
  {
    title: ["좋은 일이 생겼다면", "드디어 적립을 차감할 때!"],
    body: [
      "쌓아둔 액땜을 꺼내서 행운으로 수령하자",
      "",
      "이러려고 그때 그렇게 고생했던 거겠지?",
      "다~ 나중에 좋으려고 그랬던 거다 이 말이야",
    ],
    cta: "맞아. 기쁨은 한도가 없으니까!",
  },
];

function StampCharacter({ stamp, type }: { stamp: string; type: "misfortune" | "fortune" }) {
  return (
    <div className="relative h-[227px] w-[276px]">
      <div className="absolute inset-[32.82%_24.16%_0_0]">
        <div className="absolute inset-[0.35%_3.27%_0.94%_0.44%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/characters/onboarding/vector1.svg" alt="" className="block size-full" />
        </div>
      </div>
      <StampMark type={type} ringSize={93} />
      <div
        className="absolute flex items-center justify-center"
        style={{ containerType: "size", inset: "-8.82% -7.25% 26.51% 44.22%" }}
      >
        <div className="h-[hypot(-53.1519cqw,68.3052cqh)] w-[hypot(46.8481cqw,31.6948cqh)] origin-center opacity-0 [animation:stamp-drop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.15s_forwards]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stamp} alt="" className="block size-full" />
        </div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(1);
  const data = STEPS[step - 1];

  function goNext() {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.push("/login");
    }
  }

  function skip() {
    completeOnboarding();
    router.push("/login");
  }

  return (
    <div className="relative flex size-full min-h-dvh flex-col items-center gap-[66px] overflow-hidden bg-secondary-800">
      <div className="absolute -left-[74px] -right-[69px] -top-[2px] h-[433px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/characters/onboarding/bubble.svg" alt="" className="block size-full" />
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-start">
        <SafeArea variant="top" />
        <div className="flex w-full flex-1 flex-col gap-12 p-4">
          <div className="flex w-full items-center justify-between">
            <Pagination total={3} step={step} />
            <TextButton onClick={skip}>
              Skip
            </TextButton>
          </div>
          <div className="flex w-full flex-1 flex-col gap-5">
            <p className="point-header-md text-white">
              {data.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="type-body-md-md text-grayscale-200">
              {data.body.map((line, i) => (
                <p key={i} className="min-h-[20px]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        {step === 1 ? (
          <div className="relative h-[273px] w-[180px] overflow-hidden">
            <Image
              src="/characters/onboarding/onboarding-1.png"
              alt=""
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        ) : (
          <StampCharacter
            key={step}
            stamp={step === 2 ? "/characters/onboarding/stamp-2.svg" : "/characters/onboarding/stamp-3.svg"}
            type={step === 2 ? "misfortune" : "fortune"}
          />
        )}
      </div>

      <div className="flex w-full shrink-0 flex-col items-start px-4 pb-7">
        <Button onClick={goNext}>{data.cta}</Button>
      </div>
    </div>
  );
}
