import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import reset from '@/styles/reset';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
}
