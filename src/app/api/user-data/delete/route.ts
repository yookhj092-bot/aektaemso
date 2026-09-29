import { NextResponse } from "next/server";
import { verifyKakaoToken } from "@/lib/kakao-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type DeleteRequestBody = {
  accessToken: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as DeleteRequestBody;
  const kakaoId = await verifyKakaoToken(body.accessToken);
  if (!kakaoId) {
    return NextResponse.json({ error: "invalid access token" }, { status: 401 });
  }

  const { error } = await supabaseAdmin.from("app_user_data").delete().eq("kakao_id", kakaoId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
