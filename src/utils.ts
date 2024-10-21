import { AppKey, Skip } from "./types";

export const WIN_ERROR =
  "Window is not available and no user agent was provided.";

export const getUA = (): string => {
  if (typeof window !== "undefined") {
    const ua =
      window?.navigator?.userAgent ||
      window?.navigator?.vendor ||
      // @ts-ignore
      window?.opera;
    if (ua) return ua;
  }
  console.error(WIN_ERROR);
  return "";
};

export const empty = {
  isInApp: false,
  appKey: undefined,
  appName: undefined,
  skipped: false,
};

export const getIsAppleDevice = (ua: string) => {
  return ua.match(/(iPhone|iPad|iPod|Macintosh)/) !== null;
};

export const checkSkip = ({
  skip,
  appKey,
  ua,
}: {
  skip?: Skip;
  appKey: AppKey;
  ua: string;
}) => {
  if (!skip || skip.length === 0) return false;
  const isApple = getIsAppleDevice(ua);
  return skip.some(
    ({ appKey: excludeAppKey, platform }) =>
      appKey === excludeAppKey &&
      (!platform ||
        (isApple && platform === "apple") ||
        (!isApple && platform === "android"))
  );
};
