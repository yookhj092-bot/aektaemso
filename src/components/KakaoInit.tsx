"use client";

import Script from "next/script";

export default function KakaoInit() {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={() => {
        const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (window.Kakao && key && !window.Kakao.isInitialized()) {
          window.Kakao.init(key);
        }
      }}
    />
  );
}
