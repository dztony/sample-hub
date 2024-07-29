import { PropsWithChildren } from "react";
import css from './index.module.scss';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TranslationMapper, I18nProvider } from '@/util/lang';

function Layout(props: PropsWithChildren) {
  return (
    <I18nProvider
      value={{
        langDict: TranslationMapper,
      }}
    >
      <div className={css.layout}>
        <Header/>

        <div className={css.main}>
          {props.children}
        </div>

        <Footer/>
      </div>
    </I18nProvider>

  );
}


export default Layout;
