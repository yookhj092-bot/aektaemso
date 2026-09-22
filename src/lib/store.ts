"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EntryType = "misfortune" | "fortune"; // misfortune = 적립, fortune = 차감
export type EmotionScore = 1 | 3 | 5 | 7 | 10;

export type DiaryEntry = {
  id: string;
  type: EntryType;
  title: string;
  body: string;
  score: EmotionScore;
  pointsDelta: number;
  overDeduction: boolean;
  createdAt: string; // ISO
};

type AddEntryResult = {
  entry: DiaryEntry;
  overDeduction: boolean;
  overAmount: number;
  balanceAfter: number;
};

type AppState = {
  onboarded: boolean;
  loggedIn: boolean;
  tutorialSeen: boolean;
  nickname: string;
  joinedAt: string | null;
  points: number;
  entries: DiaryEntry[];
  completeOnboarding: () => void;
  login: () => void;
  logout: () => void;
  markTutorialSeen: () => void;
  addEntry: (type: EntryType, title: string, body: string, score: EmotionScore) => AddEntryResult;
  removeEntry: (id: string) => void;
  resetAccount: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      loggedIn: false,
      tutorialSeen: false,
      nickname: "소연",
      joinedAt: null,
      points: 0,
      entries: [],

      completeOnboarding: () => set({ onboarded: true }),
      login: () => set({ loggedIn: true, joinedAt: get().joinedAt ?? new Date().toISOString() }),
      logout: () => set({ loggedIn: false }),
      markTutorialSeen: () => set({ tutorialSeen: true }),

      addEntry: (type, title, body, score) => {
        const current = get().points;
        let delta = 0;
        let overDeduction = false;
        let overAmount = 0;

        if (type === "misfortune") {
          delta = score;
        } else {
          delta = -score;
          if (score > current) {
            overDeduction = true;
            overAmount = score - current;
          }
        }

        const entry: DiaryEntry = {
          id: crypto.randomUUID(),
          type,
          title,
          body,
          score,
          pointsDelta: delta,
          overDeduction,
          createdAt: new Date().toISOString(),
        };

        const balanceAfter = Math.max(0, current + delta);
        set({ points: balanceAfter, entries: [entry, ...get().entries] });

        return { entry, overDeduction, overAmount, balanceAfter };
      },

      removeEntry: (id) => set({ entries: get().entries.filter((e) => e.id !== id) }),

      resetAccount: () =>
        set({
          onboarded: false,
          loggedIn: false,
          tutorialSeen: false,
          joinedAt: null,
          points: 0,
          entries: [],
        }),
    }),
    { name: "aektaemso-store" }
  )
);
