import { SupportLocaleList, DefaultLang } from "./config/locale.config.mjs";

import pluginBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = pluginBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: SupportLocaleList,
    defaultLocale: DefaultLang,
    localeDetection: false,
  },
};

export default withBundleAnalyzer(nextConfig);
