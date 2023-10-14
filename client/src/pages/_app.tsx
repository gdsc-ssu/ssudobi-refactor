import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Frame } from '@/components/Layouts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Frame>
      <Component {...pageProps} />
    </Frame>
  );
}
