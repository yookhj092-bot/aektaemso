import type { EmotionScore } from "./store";

export const NEGATIVE_QUOTES: Record<EmotionScore, string> = {
  1: "그냥 그런 날이었어",
  3: "조금 신경 쓰이긴 했어",
  5: "진짜 별로였다...",
  7: "솔직히 이건 진짜 너무해!",
  10: "이 정도면 방출 각이다 진짜",
};

export const POSITIVE_QUOTES: Record<EmotionScore, string> = {
  1: "소소하게 좋았어",
  3: "기분 좋은 하루였어",
  5: "완전 럭키데이!",
  7: "이 정도면 인생 최고 순간",
  10: "우주가 나를 도왔다!!",
};
