import { NextResponse } from "next/server";
import { verifyKakaoToken } from "@/lib/kakao-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type PullRequestBody = {
  accessToken: string;
  defaultNickname?: string;
  defaultProfileImageUrl?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as PullRequestBody;
  const kakaoId = await verifyKakaoToken(body.accessToken);
  if (!kakaoId) {
    return NextResponse.json({ error: "invalid access token" }, { status: 401 });
  }

  const { data: existing, error: selectError } = await supabaseAdmin
    .from("app_user_data")
    .select("nickname, profile_image_url, points, entries, joined_at")
    .eq("kakao_id", kakaoId)
    .maybeSingle();

  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({
      nickname: existing.nickname,
      profileImageUrl: existing.profile_image_url,
      points: existing.points,
      entries: existing.entries,
      joinedAt: existing.joined_at,
    });
  }

  const joinedAt = new Date().toISOString();
  const { data: created, error: insertError } = await supabaseAdmin
    .from("app_user_data")
    .insert({
      kakao_id: kakaoId,
      nickname: body.defaultNickname ?? "소연",
      profile_image_url: body.defaultProfileImageUrl ?? null,
      points: 0,
      entries: [],
      joined_at: joinedAt,
    })
    .select("nickname, profile_image_url, points, entries, joined_at")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    nickname: created.nickname,
    profileImageUrl: created.profile_image_url,
    points: created.points,
    entries: created.entries,
    joinedAt: created.joined_at,
  });
}
