import { useCallback } from 'react';
import { EnumLang } from '@/util/lang';
import { useRouter } from 'next/router';
import { LocalesMapper } from '../../config/locale.config.mjs';

function useModuleLang(langDict: Record<EnumLang, Record<string, string>>) {
  const { locale } = useRouter();

  const t = useCallback((key: string, params?: Record<string, string> | undefined) => {
    try {
      const filename = LocalesMapper[locale as EnumLang];
      // @ts-expect-error
      let translation = langDict[filename][key];

      if (translation === undefined) {
        return key;
      }

      if (params) {
        Reflect.ownKeys(params).forEach((item) => {
          translation = translation.replace(new RegExp(`{${item as string}}`, 'g'), params[item as string]);
        });
      }

      return translation;
    } catch (e) {
      return key;
    }

  }, [locale]);

  return {
    t,
  };
}

export default useModuleLang;
