import { PropsWithChildren } from "react";
import css from './index.module.scss';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Layout(props: PropsWithChildren) {
  return (
    <div className={css.layout}>
      <Header />

      <div className={css.main}>
        {props.children}
      </div>

      <Footer />
    </div>
  );
}


export default Layout;
