import Carousel from './Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';
import styled from '@emotion/styled';
import { injectAnimation } from '@/styles/animations';
import Empty from './Empty';
import { useTemplate } from '@/hooks';
import { useEffect } from 'react';

const TemplateList = () => {
  const { templateList, getMyTemplateList } = useTemplate();
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  };

  useEffect(() => {
    getMyTemplateList();
  }, []);

  return (
    <Container css={injectAnimation('fadeInTopDownTranslate', '0.5s', 'ease')}>
      {templateList.length > 0 ? (
        <Carousel templates={templateList} options={OPTIONS} />
      ) : (
        <Empty />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default TemplateList;
