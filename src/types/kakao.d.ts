export type KakaoUserMeResponse = {
  id: number;
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
  properties?: {
    nickname?: string;
  };
};

type KakaoAuthLoginOptions = {
  success: (authObj: unknown) => void;
  fail: (error: unknown) => void;
};

type KakaoApiRequestOptions = {
  url: string;
  success: (response: KakaoUserMeResponse) => void;
  fail: (error: unknown) => void;
};

interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    login: (options: KakaoAuthLoginOptions) => void;
    logout: (callback?: () => void) => void;
    getAccessToken: () => string | null;
  };
  API: {
    request: (options: KakaoApiRequestOptions) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

export {};
