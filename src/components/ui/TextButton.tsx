import Image from "next/image";
import { cn } from "@/lib/utils";

type TextButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "light" | "dark";
};

export default function TextButton({ className, children, onClick, variant = "light" }: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1",
        variant === "light" ? "text-white" : "text-grayscale-700",
        className
      )}
    >
      <span className="type-caption-md-md whitespace-nowrap">{children}</span>
      <span className="relative size-4 shrink-0">
        <Image
          src="/icons/caret-right-16.svg"
          alt=""
          fill
          className={cn("object-contain", variant === "dark" && "invert")}
        />
      </span>
    </button>
  );
}
