export const getIsTelegram = () => {
  return (
    "TelegramWebview" in window || // Android
    "TelegramWebviewProxy" in window || // iPhone
    "TelegramWebviewProxyProto" in window // iPhone
  );
};
