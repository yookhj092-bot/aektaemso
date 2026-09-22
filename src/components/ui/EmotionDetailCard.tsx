import Image from "next/image";
import Emotion, { type EmotionLevel } from "./Emotion";
import { NEGATIVE_QUOTES, POSITIVE_QUOTES } from "@/lib/emotionQuotes";

const TAIL_POSITION: Record<EmotionLevel, string> = {
  10: "right-[38px]",
  7: "right-[98px]",
  5: "left-1/2 -translate-x-1/2",
  3: "left-[98px]",
  1: "left-[38px]",
};

type EmotionDetailCardProps = {
  emotion: "positive" | "negative";
  level: EmotionLevel;
  className?: string;
};

export default function EmotionDetailCard({ emotion, level, className }: EmotionDetailCardProps) {
  const quote = emotion === "negative" ? NEGATIVE_QUOTES[level] : POSITIVE_QUOTES[level];

  return (
    <div className={`relative flex w-full items-center gap-4 rounded-16 bg-secondary-50 p-4 ${className ?? ""}`}>
      <Emotion emotion={emotion} level={level} />
      <p className="type-body-lg min-w-0 flex-1 text-grayscale-900">&ldquo;{quote}&rdquo;</p>
      <span className={`absolute -top-1.5 h-2.5 w-3 ${TAIL_POSITION[level]}`}>
        <Image src={level === 10 && emotion === "negative" ? "/icons/quote-tail-alt.svg" : "/icons/quote-tail.svg"} alt="" fill />
      </span>
    </div>
  );
}
