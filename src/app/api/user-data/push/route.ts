import { NextResponse } from "next/server";
import { verifyKakaoToken } from "@/lib/kakao-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { DiaryEntry } from "@/lib/store";

type PushRequestBody = {
  accessToken: string;
  nickname: string;
  profileImageUrl: string | null;
  points: number;
  entries: DiaryEntry[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as PushRequestBody;
  const kakaoId = await verifyKakaoToken(body.accessToken);
  if (!kakaoId) {
    return NextResponse.json({ error: "invalid access token" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("app_user_data")
    .update({
      nickname: body.nickname,
      profile_image_url: body.profileImageUrl,
      points: body.points,
      entries: body.entries,
      updated_at: new Date().toISOString(),
    })
    .eq("kakao_id", kakaoId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
