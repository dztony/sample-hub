import Link from "next/link";
import css from './index.module.scss';

function Header() {
  return (
    <header className={css.header}>
      <Link href={'/'}>首页</Link>
      <Link href={'/book'}>Book</Link>
      <Link href={'/404'}>404</Link>
    </header>
  );
}

export default Header;
