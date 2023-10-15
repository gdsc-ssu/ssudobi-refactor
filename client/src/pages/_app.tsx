import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Frame } from '@/components/Layouts';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import reset from '@/styles/reset';
import { useRouter } from 'next/router';
import { COLORS } from '@/styles/colors';

export default function App({ Component, pageProps }: AppProps) {
  const { checkAuth } = useAuth();
  const router = useRouter();

  const getBgColor = (pathname: string) => {
    switch (pathname) {
      case '/login':
        return bgColorStyle.login;
      default:
        return bgColorStyle.default;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Frame>
      <Global styles={[reset, getBgColor(router.pathname)]} />
      <Component {...pageProps} />
    </Frame>
  );
}

const bgColorStyle = {
  login: css`
    html {
      background-color: ${COLORS.primary};
    }
  `,
  default: css`
    html {
      background-color: ${COLORS.white};
    }
  `,
};
