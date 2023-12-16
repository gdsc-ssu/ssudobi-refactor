import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';

/** 리사이징 이벤트에 따라 변하는 vh 가져오는 훅 (불필요한 스크롤 생기는 이슈 방지) */
const useVh = () => {
  const [vh, setVh] = useState(0);

  const mobileScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    setVh(vh);
  };

  const remToPx = (rem: number) => {
    if (typeof window !== 'undefined') {
      return (
        parseFloat(getComputedStyle(document.documentElement).fontSize) * rem
      );
    } else {
      return 10 * rem;
    }
  };

  const fullPageHeight = useCallback(
    (headerHeight = 0, navigatorHeight = 0) => {
      const headerHeightPx = remToPx(headerHeight);
      const navigatorHeightPx = remToPx(navigatorHeight);
      return `calc(${vh}px * 100 - ${headerHeightPx}px - ${navigatorHeightPx}px)`;
    },
    [vh],
  );

  const fullPageStyle = useCallback(
    (headerHeight = 0, navigatorHeight = 0) => css`
      width: 100%;
      height: ${fullPageHeight(headerHeight, navigatorHeight)};
    `,
    [fullPageHeight],
  );

  useEffect(() => {
    mobileScreenSize();
    window.addEventListener('resize', () => mobileScreenSize());
    return () => {
      window.removeEventListener('resize', mobileScreenSize);
    };
  }, []);

  return { vh, fullPageStyle };
};

export default useVh;
