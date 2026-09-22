import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

type TopNavHomeProps = {
  variant: "home";
  className?: string;
  right?: ReactNode;
};

type TopNavTitleProps = {
  variant: "title";
  className?: string;
  title: string;
  onBack?: () => void;
  right?: ReactNode;
};

type TopNavProps = TopNavHomeProps | TopNavTitleProps;

export default function TopNav(props: TopNavProps) {
  if (props.variant === "home") {
    return (
      <div className={cn("flex w-full items-center justify-between p-4", props.className)}>
        <Logo variant="secondary" />
        <div className="flex items-center gap-4">{props.right}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full items-center gap-4 p-4", props.className)}>
      <button type="button" onClick={props.onBack} className="relative size-6 shrink-0">
        <Image src="/icons/caret-back.svg" alt="뒤로" fill className="object-contain brightness-0 invert" />
      </button>
      <p className="type-title-md-bd min-w-0 flex-1 text-center text-white">{props.title}</p>
      <div className="flex size-6 shrink-0 items-center justify-center">{props.right}</div>
    </div>
  );
}
