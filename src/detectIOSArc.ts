export const getIsIOSArc = () => {
  return "observeHeadAdded" in window && !!window.observeHeadAdded;
};
