import HomeTemplate from '@/components/TemplateList/HomeTemplate/HomeTemplate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TemplateInfo } from 'Template';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

type PropType = {
  slides: TemplateInfo[];
  options?: EmblaOptionsType;
};

const Carousel = ({ slides, options }: PropType) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <Container>
          {slides.map((slide, idx) => (
            <Slide idx={idx} key={slide.title}>
              <HomeTemplate {...slide} />
            </Slide>
          ))}
        </Container>
      </Viewport>
    </Embla>
  );
};

const Embla = styled.div`
  --slide-spacing: 1rem;
  --slide-size: 28rem;
`;

const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const Slide = styled.div<{ idx: number }>`
  flex: 0 0 var(--slide-size);
  min-width: 0;
  position: relative;
  ${(props) => (props.idx === 0 ? paddingStyle.first : paddingStyle.default)}
`;

const paddingStyle = {
  default: css`
    padding-left: var(--slide-spacing);
  `,
  first: css`
    padding-left: calc(var(--slide-spacing) + 2.7rem);
  `,
};

export default Carousel;
