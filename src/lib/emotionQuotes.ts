import type { EmotionScore } from "./store";

export const NEGATIVE_QUOTES: Record<EmotionScore, string> = {
  1: "에잇.. 살짝 별로였어",
  3: "아, 은근 신경 쓰이네..",
  5: "이것 땜에 하루가 꼬였어",
  7: "솔직히 이건 진짜 너무해!",
  10: "오늘 진짜 버티기 힘들었어ㅠㅠ",
};

export const POSITIVE_QUOTES: Record<EmotionScore, string> = {
  1: "소소하게 좋았어",
  3: "기운이 좀 났어!",
  5: "하루가 즐거웠어!",
  7: "너무 좋아 날아갈 것 같아",
  10: "이건 진짜 잭팟이야!!",
};
