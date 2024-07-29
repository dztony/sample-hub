import { SupportLocaleList, DefaultLang, LocalesMapper } from "./config/locale.config.mjs";

import pluginBundleAnalyzer from '@next/bundle-analyzer';
import path from "node:path";
import process from 'node:process';

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
  webpack: (config, { dev }) => {
    config.module.rules.push({
      // test: /\.m?js|jsx|ts|tsx$/,
      test: /\.ts|tsx$/,
      exclude: [
        /node_moduels/,
        /locales/,
        /assets/,
        /service/,
        /styles/,
        /utils/,
        // /submodule/, // 暂时先不处理
      ],
      loader: path.join(process.cwd(), './loader/loader-split-key.mjs'),
      options: {
        localesPath: path.join(process.cwd(), './src/locales'),
        translationFunctionName: 'useLang',
        replaceHook: {
          name: 'useModuleLang',
          importStr: 'import useModuleLang from "@/hooks/useModuleLang";',
        },
        validLocaleNames: Object.values(LocalesMapper),
      },
    });

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
