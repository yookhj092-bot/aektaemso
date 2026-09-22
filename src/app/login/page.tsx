"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

export default function Login() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  function handleKakaoLogin() {
    login();
    router.push("/home");
  }

  return (
    <div className="relative flex size-full min-h-dvh flex-col items-center justify-between overflow-hidden bg-secondary-800 px-4 pb-7 pt-[104px]">
      <div className="relative z-10 flex w-full flex-col items-center gap-5">
        <Logo variant="secondary" className="h-11 w-[143px]" />
        <p className="type-title-md-md w-full text-center text-white">
          액땜은 적립하고,
          <br />
          좋은 일은 크게 받자!
        </p>
      </div>

      <div className="absolute left-1/2 top-[230px] h-[503px] w-[360px] -translate-x-1/2 overflow-hidden">
        <Image
          src="/characters/login/login-character.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <Button variant="login" onClick={handleKakaoLogin} className="relative z-10" />
    </div>
  );
}
