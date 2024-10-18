import { getIsTelegram } from "./detectionTelegram";

export const appNameCustom = {
  telegram: {
    name: "Telegram",
  },
} as const;

export const getDetectionCustom = () => {
  if (getIsTelegram()) return "telegram";
  return;
};

export const appKeysDetectByCustom = Object.keys(
  appNameCustom
) as (keyof typeof appNameCustom)[];
