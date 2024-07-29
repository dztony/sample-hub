import useLang from '@/hooks/useLang';
import css from './index.module.scss';

function Index() {
  const { t } = useLang();

  return (
    <div>
      <h3>首页中使用的 key</h3>
      <div>{t('key709')}</div>
      <div>{t('key70')}</div>
      <div>{t('key79')}</div>
      <div>{t('key179')}</div>
    </div>
  );
}

export default Index;
