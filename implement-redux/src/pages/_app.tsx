import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <Link href={'/'}>首页</Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
