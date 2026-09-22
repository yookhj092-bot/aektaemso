"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SafeArea from "./SafeArea";

const TABS: { href: string; label: string; icon: string; match: (path: string) => boolean }[] = [
  { href: "/home", label: "홈", icon: "/icons/home-24.svg", match: (p) => p === "/home" },
  { href: "/diary", label: "일기", icon: "/icons/pencil-24.svg", match: (p) => p.startsWith("/diary") },
  { href: "/my", label: "마이", icon: "/icons/my-24.svg", match: (p) => p.startsWith("/my") },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 z-40 w-full bg-white">
      <div className="flex w-full items-center">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex min-w-0 flex-1 items-center justify-center px-4 py-3"
            >
              <span className="flex w-6 flex-col items-center gap-1">
                <span
                  className={cn("size-6 shrink-0 bg-current", active ? "text-secondary-500" : "text-grayscale-400")}
                  style={{
                    maskImage: `url(${tab.icon})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: `url(${tab.icon})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
                <span
                  className={cn(
                    "type-caption-md-md w-full text-center whitespace-nowrap",
                    active ? "text-secondary-500" : "text-grayscale-500"
                  )}
                >
                  {tab.label}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <SafeArea variant="bottom" />
    </nav>
  );
}
