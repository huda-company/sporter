export const ENV = process.env.NODE_ENV;
export const IS_DEV = ENV === "development";
export const IS_PRODUCTION = ENV === "production";
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "v1";
export const BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000";
