import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect } from 'react';

/**
 * 마이페이지
 */
const Mypage = () => {
  const { setHeader } = useHeader();

  useLayoutEffect(() => {
    setHeader('마이페이지');
  }, []);

  return <PageContainer></PageContainer>;
};

export default Mypage;
