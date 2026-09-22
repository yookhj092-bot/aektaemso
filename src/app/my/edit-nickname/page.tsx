"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SafeArea from "@/components/ui/SafeArea";
import TopNav from "@/components/ui/TopNav";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

const MAX_LENGTH = 12;

export default function EditNickname() {
  const router = useRouter();
  const nickname = useAppStore((s) => s.nickname);
  const setNickname = useAppStore((s) => s.setNickname);
  const [value, setValue] = useState(nickname);

  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0 && trimmed !== nickname;

  function handleSubmit() {
    if (!canSubmit) return;
    setNickname(trimmed);
    router.push("/my");
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-secondary-800">
      <div className="flex w-full flex-col items-start">
        <SafeArea variant="top" />
        <TopNav variant="title" title="닉네임 변경" onBack={() => router.push("/my")} />
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-5 px-4 pb-4 pt-2">
        <p className="type-title-md-bd text-white">어떤 닉네임으로 불러줄까?</p>
        <div className="flex w-full flex-col items-end gap-2">
          <div className="flex w-full flex-col gap-2 rounded-16 bg-white p-4">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
              placeholder="닉네임을 입력해주세요"
              autoFocus
              className="type-title-md-bd w-full text-grayscale-950 placeholder:text-grayscale-400 focus:outline-none"
            />
          </div>
          <p className="type-caption-md-rg text-grayscale-400">
            {value.length}/{MAX_LENGTH}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-start px-4 pb-7">
        <Button variant={canSubmit ? "primary" : "disabled"} disabled={!canSubmit} onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
}
