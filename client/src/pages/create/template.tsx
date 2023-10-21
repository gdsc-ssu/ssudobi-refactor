import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect } from 'react';

/**
 * 템플릿 추가하기 페이지
 */
const Template = () => {
  const { setHeader } = useHeader();

  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  return <PageContainer></PageContainer>;
};

export default Template;
