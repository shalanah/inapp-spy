declare const InAppSpy: (options?: {
    ua?: string;
} | undefined) => {
    isInApp: boolean;
    appName: "messenger" | "facebook" | "twitter" | "line" | "wechat" | "instagram" | "tiktok" | "snapchat" | undefined;
    ua: any;
};

export { InAppSpy as default };
