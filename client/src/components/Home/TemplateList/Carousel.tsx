import HomeTemplate from '@/components/TemplateList/HomeTemplate/HomeTemplate';
import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faAnglesRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TemplateInfo } from 'Template';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { useEffect, useState } from 'react';

type PropType = {
  templates: TemplateInfo[];
  options?: EmblaOptionsType;
};

const Carousel = ({ templates, options }: PropType) => {
  const [isMax, setIsMax] = useState(false);
  const [slides, setSlides] = useState<TemplateInfo[]>([]);
  const [emblaRef] = useEmblaCarousel(options);

  const calculTemplates = () => {
    if (templates.length > 5) {
      setSlides(templates.slice(0, 5));
      setIsMax(true);
    } else {
      setSlides(templates);
      setIsMax(false);
    }
  };

  useEffect(() => {
    calculTemplates();
  }, []);

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <Container>
          {slides.map((slide, idx) => (
            <Slide idx={idx} key={idx}>
              <HomeTemplate {...slide} />
            </Slide>
          ))}
          <ButtonsWrapper>
            {isMax && (
              <Box css={boxStyles.more}>
                <FontAwesomeIcon icon={faAnglesRight} />
              </Box>
            )}
            <Box css={boxStyles.plus}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Box>
          </ButtonsWrapper>
        </Container>
      </Viewport>
    </Embla>
  );
};

const Embla = styled.div`
  --slide-spacing: 1rem;
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

const paddingStyle = {
  default: css`
    padding-left: var(--slide-spacing);
  `,
  first: css`
    padding-left: calc(var(--slide-spacing));
    margin-left: 2.7rem;
  `,
};

const ButtonsWrapper = styled.div`
  ${flex('row', 'start', 'center', 1)};
  margin-left: 1rem;
  flex: 0 0 20rem;
`;

const Slide = styled.div<{ idx: number }>`
  min-width: 0;
  position: relative;
  flex: 0 0 28rem;
  ${paddingStyle.default};
  ${(props) => props.idx === 0 && paddingStyle.first};
`;

const Box = styled.div`
  width: 7rem;
  height: 100%;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  cursor: pointer;
  ${flex('column', 'center', 'center', 0)};
  font-size: 2.4rem;
  color: ${COLORS.primaryWhite};
`;

const boxStyles = {
  plus: css`
    background-color: ${COLORS.primary};
  `,
  more: css`
    background-color: ${COLORS.grey3};
  `,
};

export default Carousel;
