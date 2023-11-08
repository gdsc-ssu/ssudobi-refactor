import Carousel from './Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';
import styled from '@emotion/styled';
import { injectAnimation } from '@/styles/animations';
import { basicTemplates, emptyTemplates, maxTemplates } from './dummy';
import Empty from './Empty';

const TemplateList = () => {
  const templates = emptyTemplates;
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  };

  return (
    <Container css={injectAnimation('fadeInTopDownTranslate', '0.5s')}>
      {templates.length > 0 ? (
        <Carousel templates={templates} options={OPTIONS} />
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
