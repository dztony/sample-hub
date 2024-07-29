import { enUS, zhTW, zhCN, LocalesMapper } from '../../config/locale.config.mjs';
import React from 'react';

export enum EnumLang {
  // @ts-ignore
  en = enUS,
  // @ts-ignore
  cn = zhCN,
  // @ts-ignore
  tw = zhTW,
}

export const TranslationMapper = {
  // [EnumLang.en]: require(`@/locales/${LocalesMapper[EnumLang.en]}`),
  // [EnumLang.cn]: require(`@/locales/${LocalesMapper[EnumLang.cn]}`),
  // [EnumLang.tw]: require(`@/locales/${LocalesMapper[EnumLang.tw]}`),
};

export const I18nContext = React.createContext<II18nContext>({
  langDict: null,
});

export const I18nProvider = I18nContext.Provider;

type II18nContext = {
  langDict: Record<EnumLang, Record<string, string>> | any;
};
