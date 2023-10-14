import reset from '@/styles/reset';
import { Global } from '@emotion/react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Global styles={reset} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
