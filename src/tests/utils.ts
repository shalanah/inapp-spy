export type DeviceObj = {
  [os: string]: {
    not_inapp?: { [app: string]: BrowserDetection[] };
    inapp?: { [app: string]: BrowserDetection[] };
  };
};

export type BrowserDetection = {
  useragents?: string[];
  window?: Record<string, any>;
};

// Utilities to make TypeScript better to deal with
export const typedEntries = <T>(obj: T) => {
  return Object.entries(obj!) as [keyof T, T[keyof T]][];
};
export const typedValues = <T>(obj: T) => {
  return Object.values(obj!) as T[keyof T][];
};
export const typedKeys = <T>(obj: T) => {
  return Object.keys(obj!) as (keyof T)[];
};
export const typedFromEntries = <T>(entries: [keyof T, T[keyof T]][]) => {
  return Object.fromEntries(entries) as T;
};

export const appleTouchWindow = {
  window: {
    document: { ontouchend: {} },
  },
};
