import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = {
  primary: "/brand/logo-primary.svg",
  secondary: "/brand/logo-secondary.svg",
  white: "/brand/logo-white.svg",
  dark: "/brand/logo-dark.svg",
} as const;

type LogoProps = {
  className?: string;
  variant?: keyof typeof LOGO_SRC;
};

export default function Logo({ className, variant = "primary" }: LogoProps) {
  return (
    <div className={cn("relative h-6 w-[78.2px]", className)}>
      <Image src={LOGO_SRC[variant]} alt="액땜소" fill className="object-contain" priority />
    </div>
  );
}
