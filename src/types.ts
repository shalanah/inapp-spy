import { appNameRegExps } from "./regexAppName";
import { appNameCustom } from "./detectClientSide";

export type AppKey =
  | keyof typeof appNameCustom
  | keyof typeof appNameRegExps
  | undefined;

export type AppName =
  | (typeof appNameCustom)[keyof typeof appNameCustom]["name"]
  | (typeof appNameRegExps)[keyof typeof appNameRegExps]["name"]
  | undefined;

export type Skip = {
  appKey: AppKey;
  platform?: "apple" | "android";
}[];
