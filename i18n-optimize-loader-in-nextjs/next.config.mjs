import { SupportLocaleList, DefaultLang, LocalesMapper } from "./config/locale.config.mjs";

import pluginBundleAnalyzer from '@next/bundle-analyzer';
import path from "node:path";
import process from 'node:process';

const withBundleAnalyzer = pluginBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const needSplitKey = process.env.splitKey === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: SupportLocaleList,
    defaultLocale: DefaultLang,
    localeDetection: false,
  },
  webpack: (config, { dev }) => {
    if (needSplitKey) {
      console.log('使用多语言拆分插件');
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
          translationMapperName: 'TranslationMapper',
          replaceHook: {
            name: 'useModuleLang',
            importStr: 'import useModuleLang from "@/hooks/useModuleLang";',
          },
          validLocaleNames: Object.values(LocalesMapper),
        },
      });
    } else {
      console.log('不使用多语言拆分插件');
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
