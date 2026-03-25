export const getIsPWA = () => {
  return "clearAppBadge" in (window?.navigator || {});
};
