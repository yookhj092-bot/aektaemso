"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { useAppStore } from "@/lib/store";

export default function Splash() {
  const router = useRouter();

  // Read store state at fire-time (not as effect deps) so zustand's persist
  // rehydration re-render doesn't reset/re-schedule this timer.
  useEffect(() => {
    const timer = setTimeout(() => {
      const { onboarded, loggedIn } = useAppStore.getState();
      if (!onboarded) router.replace("/onboarding");
      else if (!loggedIn) router.replace("/login");
      else router.replace("/home");
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex size-full min-h-dvh flex-col overflow-hidden bg-gradient-to-b from-secondary-800 to-secondary-600">
      <div className="absolute left-1/2 top-[174px] flex w-[143px] -translate-x-1/2 flex-col items-center gap-8">
        <Logo variant="secondary" />
        <p className="type-title-md-md text-center text-white">
          액땜은 적립하고,
          <br />
          좋은 일은 크게 받자!
        </p>
      </div>

      <div className="absolute bottom-[26.5px] left-1/2 h-[192px] w-[260px] -translate-x-1/2">
        {/* eslint-disable @next/next/no-img-element */}
        <div className="absolute flex inset-[40.49%_45.6%_32.71%_30.74%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-scale-x-100 h-[hypot(-77.9459cqw,-42.6894cqh)] w-[hypot(22.0541cqw,-57.3106cqh)] rotate-[114.66deg]">
            <img src="/characters/splash/arm-1.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[73.69%_19.45%_0.14%_62.61%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-scale-x-100 h-[hypot(12.0203cqw,89.9159cqh)] w-[hypot(-87.9797cqw,10.0841cqh)] rotate-[-7.06deg]">
            <img src="/characters/splash/feet-1.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[73.69%_35.88%_0.14%_46.18%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(-12.0203cqw,89.9159cqh)] w-[hypot(87.9797cqw,10.0841cqh)] rotate-[7.06deg]">
            <img src="/characters/splash/feet-2.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[49.06%_6.34%_22.8%_69.84%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(74.3367cqw,47.6128cqh)] w-[hypot(25.6633cqw,-52.3872cqh)] rotate-[-60.74deg]">
            <img src="/characters/splash/arm-2.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute inset-[46.39%_19.49%_6.61%_45.72%]">
          <img src="/characters/splash/body.svg" alt="" className="absolute block size-full" />
        </div>
        <div className="absolute inset-[50.68%_18.22%_5.89%_44.74%]">
          <img src="/characters/splash/cloth.svg" alt="" className="absolute block size-full" />
        </div>
        <div className="absolute flex inset-[8.08%_13.21%_40.26%_39.43%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(-4.21622cqw,93.3683cqh)] w-[hypot(95.7838cqw,6.63167cqh)] rotate-[3.2deg]">
            <img src="/characters/splash/face.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[24.74%_37.53%_54.43%_44.29%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(-4.44493cqw,93.7022cqh)] w-[hypot(95.5551cqw,6.29785cqh)] rotate-[3.2deg]">
            <img src="/characters/splash/eye-1.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[26.23%_17.27%_52.93%_64.56%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(-4.44493cqw,93.7022cqh)] w-[hypot(95.5551cqw,6.29785cqh)] rotate-[3.2deg]">
            <img src="/characters/splash/eye-2.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[0_41.95%_80.16%_45.53%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(18.7791cqw,87.3091cqh)] w-[hypot(81.2209cqw,-12.6909cqh)] rotate-[-10.39deg]">
            <img src="/characters/splash/thorn.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[50.95%_0.11%_16.57%_80.45%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="h-[hypot(35.332cqw,81.7327cqh)] w-[hypot(64.668cqw,-18.2673cqh)] rotate-[-19.26deg]">
            <img src="/characters/splash/stamp.svg" alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute inset-[8.3%_70.95%_65.94%_9.22%]">
          <img src="/characters/splash/polygon.svg" alt="" className="block size-full" />
        </div>
        <div className="pointer-events-none absolute inset-[30.19%_62.57%_51.7%_1.12%] rounded-[5.81px]">
          <div className="absolute inset-0 rounded-[inherit] bg-primary-100" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_2.513px_-12.565px_12.565px_0px_var(--color-primary-200)]" />
        </div>
        <p className="point-title-md absolute inset-[32.45%_67.95%_52.35%_6.42%] whitespace-nowrap text-center text-primary-800">
          영업중
        </p>
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[82px] bg-gradient-to-b from-primary-800 to-primary-900" />
    </div>
  );
}
