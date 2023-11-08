import { TemplateInfo } from 'Template';
import Carousel from './Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';
import styled from '@emotion/styled';
import { injectAnimation } from '@/styles/animations';

const dummyTemplates: TemplateInfo[] = [
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
  {
    // template 제목
    title: '더미',
    day: 'Thu',
    beginTime: '18:00',
    endTime: '19:00',
    place: 1,
    memo: '템플릿 메모',
    friends: [
      {
        name: '홍길동',
        sId: '20111111',
      },
      {
        name: '홍길동',
        sId: '20111112',
      },
    ],
  },
];

const TemplateList = () => {
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  };
  return (
    <Container css={injectAnimation('fadeInTopDownTranslate', '0.5s')}>
      <Carousel templates={dummyTemplates} options={OPTIONS} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default TemplateList;
