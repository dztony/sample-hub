import Link from "next/link";
import css from './index.module.scss';
import { EnumLang } from '@/util/lang';
import { useRouter } from 'next/router';
import useLang from '@/hooks/useLang';

function Header() {
  const { asPath, locale } = useRouter();
  const { t } = useLang();

  const handleSwitchLocale = (targetLocale: EnumLang) => {
    if (targetLocale === locale) {
      return ;
    }

    if (targetLocale === EnumLang.en) {
      window.location.href = asPath;
    } else {
      window.location.href = `/${targetLocale}${asPath}`;
    }
  }

  return (
    <header className={css.header}>
      <Link href={'/'}>首页</Link>
      <Link href={'/book'}>Book</Link>
      <Link href={'/404'}>404</Link>

      <br />

      <button onClick={() => handleSwitchLocale(EnumLang.en)}>英文</button>
      <button onClick={() => handleSwitchLocale(EnumLang.cn)}>简体中文</button>
      <button onClick={() => handleSwitchLocale(EnumLang.tw)}>繁体中文</button>

      <br />
      <div>
        翻译 key1 - {t('key1')}
      </div>
    </header>
  );
}

export default Header;
