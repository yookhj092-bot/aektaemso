import "server-only";

type KakaoMeResponse = {
  id: number;
};

/**
 * Verifies a Kakao access token by asking Kakao's own API who it belongs to.
 * A forged or expired token simply fails this call — this is the only place
 * we trust a client's claimed identity.
 */
export async function verifyKakaoToken(accessToken: string): Promise<number | null> {
  if (!accessToken) return null;

  const res = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const data = (await res.json()) as KakaoMeResponse;
  return typeof data.id === "number" ? data.id : null;
}
