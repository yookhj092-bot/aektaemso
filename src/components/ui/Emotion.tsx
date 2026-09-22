import Image from "next/image";
import { cn } from "@/lib/utils";

export type EmotionLevel = 1 | 3 | 5 | 7 | 10;
export type EmotionKind = "positive" | "negative" | "null" | "upcoming";

type EmotionProps = {
  className?: string;
  emotion: EmotionKind;
  level?: EmotionLevel;
};

export default function Emotion({ className, emotion, level = 1 }: EmotionProps) {
  if (emotion === "upcoming" || emotion === "null") {
    return (
      <div
        className={cn(
          "relative size-9 overflow-hidden rounded-12",
          emotion === "upcoming" ? "bg-grayscale-100" : "bg-grayscale-200",
          className
        )}
      >
        <Image src="/emotion/eye-left.svg" alt="" width={14} height={12} className="absolute left-[3px] top-[12px]" />
        <Image src="/emotion/eye-right.svg" alt="" width={14} height={12} className="absolute left-[19px] top-[12px]" />
      </div>
    );
  }

  return (
    <div className={cn("relative size-9", className)}>
      <Image src={`/emotion/${emotion}-${level}.svg`} alt="" fill className="object-contain" />
    </div>
  );
}
