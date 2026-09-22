import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icon, { type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "assistive" | "disabled" | "login";
type Size = "lg" | "md";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-primary-200 text-primary-900",
  secondary: "bg-secondary-200 text-secondary-600",
  assistive: "bg-white text-secondary-600",
  disabled: "bg-grayscale-200 text-grayscale-300",
  login: "bg-[#ffe500] text-[#2a2a2a]",
};

const SIZE_CLASS: Record<Size, string> = {
  lg: "p-4",
  md: "px-4 py-3",
};

type ButtonProps = {
  className?: string;
  variant?: Variant;
  size?: Size;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function Button({
  className,
  variant = "primary",
  size = "lg",
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || variant === "disabled";

  if (variant === "login") {
    return (
      <button
        type="button"
        disabled={isDisabled}
        className={cn(
          "flex w-full items-center justify-center gap-1.5 rounded-16 disabled:opacity-60",
          VARIANT_CLASS.login,
          SIZE_CLASS[size],
          className
        )}
        {...rest}
      >
        <span className="relative size-6 shrink-0">
          <Image src="/brand/kakao-mark.svg" alt="" fill className="object-contain" />
        </span>
        <span className="type-title-sm whitespace-nowrap">카카오로 시작하기</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={cn(
        "flex w-full items-center justify-center gap-4 rounded-16 transition-opacity active:opacity-80 disabled:cursor-not-allowed",
        isDisabled ? VARIANT_CLASS.disabled : VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} className="shrink-0" />}
      <span className="type-title-md-md min-w-0 flex-1 text-center">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} className="shrink-0" />}
    </button>
  );
}
