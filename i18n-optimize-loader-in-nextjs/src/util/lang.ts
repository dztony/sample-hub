import { enUS, zhTW, zhCN, LocalesMapper } from '../../config/locale.config.mjs';

export enum EnumLang {
  // @ts-ignore
  en = enUS,
  // @ts-ignore
  cn = zhCN,
  // @ts-ignore
  tw = zhTW,
}

export const TranslationMapper = {
  [EnumLang.en]: require(`@/locales/${LocalesMapper[EnumLang.en]}`),
  [EnumLang.cn]: require(`@/locales/${LocalesMapper[EnumLang.cn]}`),
  [EnumLang.tw]: require(`@/locales/${LocalesMapper[EnumLang.tw]}`),
};

