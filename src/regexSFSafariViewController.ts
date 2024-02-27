// Source: https://stackoverflow.com/a/29696509/2824643
export const getIsIOSOrIPadOSSafari = (ua: string) => {
  const iOS = !!ua.match(/iP(ad|hone)/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
};

export const getIsSFSafariViewController =
  ({ ua, isInApp }: { ua: string; isInApp: boolean }) =>
  async () => {
    if (isInApp) return false; // don't want any false positives like with Messenger or FB
    if (typeof window === "undefined") return false;
    if (!getIsIOSOrIPadOSSafari(ua)) return false; // not iOS/iPadOS Safari

    // Experimental... `MicrodataExtractor` is undefined in SFSafariViewController but not in full iOS / iPadOS Safari
    return await new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // For some reason, MicrodataExtractor takes a little bit to load, so we need to wait a bit
        // @ts-ignore
        resolve(!window.MicrodataExtractor);
      }, 0);
    });
  };
