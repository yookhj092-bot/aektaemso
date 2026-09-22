import { cn } from "@/lib/utils";

export type IconName =
  | "clear"
  | "tutorial"
  | "info"
  | "my"
  | "home"
  | "pencil"
  | "aektaem"
  | "calendar"
  | "list"
  | "filter"
  | "edit"
  | "setting"
  | "caret-back";

const ICON_SRC: Record<string, string> = {
  clear: "/icons/clear.svg",
  info: "/icons/info-24.svg",
  my: "/icons/my-24.svg",
  home: "/icons/home-24.svg",
  pencil: "/icons/pencil-24.svg",
  setting: "/icons/setting-24.svg",
  "caret-back": "/icons/caret-back.svg",
  "tutorial-24": "/icons/tutorial-24.svg",
  "tutorial-20": "/icons/tutorial-20.svg",
  "aektaem-24": "/icons/aektaem-24.svg",
  "aektaem-20": "/icons/aektaem-20.svg",
  "calendar-24": "/icons/calendar-24.svg",
  "calendar-20": "/icons/calendar-20.svg",
  "list-24": "/icons/list-24.svg",
  "list-20": "/icons/list-20.svg",
  "filter-24": "/icons/filter-24.svg",
  "filter-20": "/icons/filter-20.svg",
  "edit-24": "/icons/edit-24.svg",
  "edit-16": "/icons/edit-16.svg",
};

type IconProps = {
  className?: string;
  name: IconName;
  size?: 24 | 20 | 16;
};

export default function Icon({ className, name, size = 24 }: IconProps) {
  const sized = ["tutorial", "aektaem", "calendar", "list", "filter", "edit"].includes(name);
  const key = sized ? `${name}-${size}` : name;
  const src = ICON_SRC[key] ?? ICON_SRC[name];

  return (
    <span
      className={cn("inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="block size-full" />
    </span>
  );
}
