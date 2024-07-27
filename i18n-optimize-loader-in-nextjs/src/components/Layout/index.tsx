import { PropsWithChildren } from "react";

import css from './index.module.scss';

function Layout(props: PropsWithChildren) {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        头部
      </header>

      <div className={css.main}>
        {props.children}
      </div>
      <footer className={css.footer}>

      </footer>
    </div>
  );
}


export default Layout;
