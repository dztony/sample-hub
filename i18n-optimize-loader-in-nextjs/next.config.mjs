import { SupportLocaleList, DefaultLang } from "./config/locale.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: SupportLocaleList,
    defaultLocale: DefaultLang,
    localeDetection: false,
  },
};

export default nextConfig;
