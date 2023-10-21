import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect } from 'react';

/**
 * 예약하기 페이지
 */
const Reserve = () => {
  const { setHeader } = useHeader();

  useLayoutEffect(() => {
    setHeader('예약하기');
  }, []);

  return <PageContainer></PageContainer>;
};

export default Reserve;
