import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect, useState } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom } from 'jotai';
import { templateAtom } from '.';

const TemplateTimeTable = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);

  return (
    <>
      <PageContainer>{/* TODO: 시간표 + 바텀모달 추가하기 */}</PageContainer>
    </>
  );
};

export default TemplateTimeTable;
