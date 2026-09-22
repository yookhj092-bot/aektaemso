import type { KakaoUserMeResponse } from "@/types/kakao";

export function kakaoLogin(): Promise<KakaoUserMeResponse | null> {
  return new Promise((resolve, reject) => {
    const kakao = typeof window !== "undefined" ? window.Kakao : undefined;
    if (!kakao) {
      reject(new Error("카카오 SDK가 아직 로드되지 않았어요"));
      return;
    }

    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: "/v2/user/me",
          success: (res) => resolve(res),
          fail: () => resolve(null),
        });
      },
      fail: (error) => reject(error),
    });
  });
}

export function kakaoLogout(): Promise<void> {
  return new Promise((resolve) => {
    const kakao = typeof window !== "undefined" ? window.Kakao : undefined;
    if (!kakao || !kakao.Auth.getAccessToken()) {
      resolve();
      return;
    }
    kakao.Auth.logout(() => resolve());
  });
}
