import { getIsTelegram } from "./detectionTelegram";

export const appNameCustom = {
  telegram: {
    name: "Telegram",
  },
} as const;

export const getDetectionCustom = () => {
  if (typeof window === "undefined") return; // Skip if not in browser ie: server-side and only ua given
  if (getIsTelegram()) return "telegram";
  return;
};

export const appKeysDetectByCustom = Object.keys(
  appNameCustom
) as (keyof typeof appNameCustom)[];
