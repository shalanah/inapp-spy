export const WIN_ERROR =
  "Window is not available and no user agent was provided.";

export const getUA = () => {
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
