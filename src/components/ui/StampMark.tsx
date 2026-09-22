import Image from "next/image";
import { cn } from "@/lib/utils";

type StampMarkProps = {
  type: "misfortune" | "fortune";
  className?: string;
};

export default function StampMark({ type, className }: StampMarkProps) {
  const isMisfortune = type === "misfortune";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        className="absolute size-[97px] origin-center rotate-[-25.95deg] opacity-0 [animation:stamp-mark-dissolve_0.3s_ease-out_0.45s_forwards]"
        style={{ left: 39.66, top: 119.5 }}
      >
        <Image
          src={isMisfortune ? "/icons/stamp-ring-negative.svg" : "/icons/stamp-ring-positive.svg"}
          alt=""
          fill
        />
      </div>
      <div
        className="absolute flex origin-center items-center justify-center rotate-[-25.95deg] opacity-0 [animation:stamp-mark-dissolve_0.3s_ease-out_0.45s_forwards]"
        style={{ left: 58.84, top: 143.75, width: 62.96, height: 54.75 }}
      >
        <p
          className={cn(
            "point-title-md whitespace-nowrap",
            isMisfortune ? "text-negative-400" : "text-positive-400"
          )}
          style={{ fontSize: 27.681, lineHeight: "34.601px" }}
        >
          {isMisfortune ? "액땜" : "행운"}
        </p>
      </div>
    </div>
  );
}
