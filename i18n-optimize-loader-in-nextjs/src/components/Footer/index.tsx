import useLang from '@/hooks/useLang';
import css from './index.module.scss';

function Footer() {
  const { t } = useLang();

  return (
    <div className={css.footer}>
      <h3>底部中使用的 key</h3>
      <div>{t('key809')}</div>
      <div>{t('key1809')}</div>
      <div>{t('key9')}</div>
      <div>{t('key80')}</div>
    </div>
  );
}

export default Footer;
