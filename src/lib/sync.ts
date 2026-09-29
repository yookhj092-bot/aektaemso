import type { DiaryEntry } from "@/lib/store";

export type PulledUserData = {
  nickname: string;
  profileImageUrl: string | null;
  points: number;
  entries: DiaryEntry[];
  joinedAt: string;
};

function getAccessToken(): string | null {
  if (typeof window === "undefined" || !window.Kakao) return null;
  return window.Kakao.Auth.getAccessToken();
}

export async function pullUserData(defaults: {
  defaultNickname?: string;
  defaultProfileImageUrl?: string;
}): Promise<PulledUserData | null> {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const res = await fetch("/api/user-data/pull", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, ...defaults }),
  });
  if (!res.ok) return null;
  return (await res.json()) as PulledUserData;
}

export async function pushUserData(data: {
  nickname: string;
  profileImageUrl: string | null;
  points: number;
  entries: DiaryEntry[];
}): Promise<boolean> {
  const accessToken = getAccessToken();
  if (!accessToken) return false;

  const res = await fetch("/api/user-data/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, ...data }),
  });
  return res.ok;
}

export async function deleteUserData(): Promise<boolean> {
  const accessToken = getAccessToken();
  if (!accessToken) return false;

  const res = await fetch("/api/user-data/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken }),
  });
  return res.ok;
}
