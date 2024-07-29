import { useCallback, useContext } from 'react';
import { EnumLang, I18nContext } from '@/util/lang';
import { useRouter } from 'next/router';

function useLang() {
  const { locale } = useRouter();
  const { langDict } = useContext(I18nContext);

  const t = useCallback((key: string, params?: Record<string, string> | undefined) => {
    try {
      // @ts-expect-error context 初始化为 undefined
      let translation = langDict[locale][key];

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

export default useLang;
