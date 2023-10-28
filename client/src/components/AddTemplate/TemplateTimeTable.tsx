import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect, useState } from 'react';

const TemplateTimeTable = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);


  return (
    <>
      <PageContainer>{/* TODO: 시간표 + 바텀모달 추가하기 */}</PageContainer>
    </>
  );
};

export default TemplateTimeTable;
