import type { Metadata, Viewport } from "next";
import { pretendard, cafe24Ssurround } from "./fonts";
import KakaoInit from "@/components/KakaoInit";
import "./globals.css";

export const metadata: Metadata = {
  title: "액땜소",
  description: "액땜은 적립하고, 좋은 일은 크게 받자!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "액땜소",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${cafe24Ssurround.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-grayscale-100">
        <KakaoInit />
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
