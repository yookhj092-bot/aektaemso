"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SafeArea from "@/components/ui/SafeArea";
import BottomNav from "@/components/ui/BottomNav";
import { useAppStore } from "@/lib/store";

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function My() {
  const router = useRouter();
  const nickname = useAppStore((s) => s.nickname);
  const joinedAt = useAppStore((s) => s.joinedAt);
  const points = useAppStore((s) => s.points);
  const entries = useAppStore((s) => s.entries);
  const logout = useAppStore((s) => s.logout);
  const resetAccount = useAppStore((s) => s.resetAccount);
  const [confirmingLeave, setConfirmingLeave] = useState(false);
  const [now] = useState(() => Date.now());

  const daysUsed = joinedAt
    ? Math.max(1, Math.floor((now - new Date(joinedAt).getTime()) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = entries.filter((e) => {
      const d = new Date(e.createdAt);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
    const misfortunes = thisMonth.filter((e) => e.type === "misfortune");
    const fortunes = thisMonth.filter((e) => e.type === "fortune");

    const biggestGain = misfortunes.reduce((max, e) => (!max || e.score > max.score ? e : max), null as (typeof misfortunes)[number] | null);
    const biggestSpend = fortunes.reduce((max, e) => (!max || e.score > max.score ? e : max), null as (typeof fortunes)[number] | null);

    const fmt = (iso: string) => {
      const d = new Date(iso);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    };

    return {
      count: misfortunes.length,
      biggestGainDate: biggestGain ? fmt(biggestGain.createdAt) : "-",
      biggestSpendDate: biggestSpend ? fmt(biggestSpend.createdAt) : "-",
    };
  }, [entries]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function handleLeave() {
    resetAccount();
    router.push("/");
  }

  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start">
          <SafeArea variant="top" />
          <div className="flex w-full items-center gap-4 p-4">
            <button type="button" onClick={() => router.push("/home")} className="relative size-6 shrink-0">
              <Image src="/icons/caret-back.svg" alt="뒤로" fill className="object-contain brightness-0 invert" />
            </button>
            <p className="type-title-md-bd flex-1 text-center text-white">마이</p>
            <span className="size-6 shrink-0" />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
          <div className="flex w-full items-center gap-4 rounded-16 bg-secondary-700 p-4">
            <div className="size-12 shrink-0 rounded-full bg-secondary-500" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-end gap-3">
                <p className="type-title-md-bd text-white">{nickname}</p>
                <Image src="/icons/edit-pencil-16.svg" alt="" width={16} height={16} />
              </div>
              <p className="type-body-md-md text-grayscale-400">액땜소를 이용한지 {daysUsed}일째</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 rounded-16 bg-white p-4">
            <div className="flex w-full flex-col gap-2 border-b border-grayscale-100 pb-3">
              <p className="type-body-md-md text-grayscale-700">나의 액땜 요약</p>
              <div className="flex items-center gap-2">
                <Image src="/icons/points-coin-24-alt.svg" alt="" width={24} height={24} />
                <p className="type-header-md text-grayscale-900">{points}</p>
              </div>
            </div>
            <div className="flex w-full items-start gap-3 pb-2 text-center">
              <div className="flex flex-1 flex-col items-center gap-1">
                <p className="type-caption-md-md text-grayscale-600">이번 달 접수</p>
                <p className="type-title-lg text-grayscale-700">{stats.count}회</p>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <p className="type-caption-md-md text-grayscale-600">가장 크게 쌓인 날</p>
                <p className="type-title-lg text-grayscale-700">{stats.biggestGainDate}</p>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <p className="type-caption-md-md text-grayscale-600">최고의 잭팟</p>
                <p className="type-title-lg text-grayscale-700">{stats.biggestSpendDate}</p>
              </div>
            </div>
            <Link href="/points" className="flex w-full items-center justify-center gap-1">
              <span className="type-caption-md-md text-secondary-500">적립 내역 더보기</span>
              <Image src="/icons/caret-right-16-light.svg" alt="" width={16} height={16} />
            </Link>
          </div>

          <div className="flex w-full flex-col items-start">
            <button
              type="button"
              onClick={() => router.push("/tutorial")}
              className="flex w-full items-center gap-4 border-b border-secondary-700 py-4"
            >
              <span className="type-title-md-md flex-1 text-left text-white">튜토리얼 다시 보기</span>
              <span className="text-white">
                <ChevronRight />
              </span>
            </button>
            <Link href="/my/terms" className="flex w-full items-center gap-4 border-b border-secondary-700 py-4">
              <span className="type-title-md-md flex-1 text-left text-white">이용약관</span>
              <span className="text-white">
                <ChevronRight />
              </span>
            </Link>
            <Link href="/my/privacy" className="flex w-full items-center gap-4 border-b border-secondary-700 py-4">
              <span className="type-title-md-md flex-1 text-left text-white">개인정보처리방침</span>
              <span className="text-white">
                <ChevronRight />
              </span>
            </Link>
            <div className="flex w-full items-center gap-4 border-b border-secondary-700 py-4">
              <span className="type-body-lg flex-1 text-white">버전 정보</span>
              <span className="type-body-md-rg text-right text-grayscale-400">v 1.0</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 pt-4">
            <button type="button" onClick={handleLogout} className="type-body-md-md text-grayscale-400">
              로그아웃
            </button>
            <button type="button" onClick={() => setConfirmingLeave(true)} className="type-caption-md-rg text-grayscale-500">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>

      <BottomNav />

      {confirmingLeave && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-center justify-center bg-grayscale-950/60 px-4">
          <div className="flex w-full flex-col items-center gap-4 rounded-16 bg-white p-5 text-center">
            <p className="type-title-md-bd text-grayscale-900">정말 탈퇴하시겠어요?</p>
            <p className="type-body-md-md text-grayscale-500">쌓아둔 액땜과 기록이 모두 사라져요</p>
            <div className="flex w-full items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmingLeave(false)}
                className="type-title-md-md flex-1 rounded-16 bg-grayscale-100 py-3 text-grayscale-700"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleLeave}
                className="type-title-md-md flex-1 rounded-16 bg-negative-100 py-3 text-negative-500"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
