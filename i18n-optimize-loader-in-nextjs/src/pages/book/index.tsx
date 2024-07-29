import useLang from '@/hooks/useLang';

function Book() {
  const { t } = useLang();

  return (
    <div>
      Book 首页

      <h3>book 页面的多语言翻译</h3>
      <div>{t('key201')}</div>
      <div>{t('key21')}</div>
      <div>{t('key20')}</div>
      <div>{t('key12')}</div>
      <div>{t('key102')}</div>
    </div>
  );
}

export default Book;
