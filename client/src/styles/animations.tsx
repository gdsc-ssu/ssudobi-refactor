import { SerializedStyles, css, keyframes } from '@emotion/react';
import { transform } from './tokens';

// 인터랙션 저장소
// 애니메이션 추가 -> 해당 애니메이션 객체에 담기 -> injextAnimation 함수로 사용
const fadeInTopDown = keyframes`
    from{
        opacity: 0;
        top: -1rem;
    }
    to{
        opacity: 1;
        top: 0rem;
    }
`;

const popUp = keyframes`
  0%{
    opacity: 0;
    ${transform('translate(0px, 1px)')}
  }
  90%{
    opacity: 1;
    ${transform('translate(0px, -0.5px) scale(1.01)')}
  }
  100%{
    opacity: 1;
    ${transform('translate(0px, 0px) scale(1)')}
  }
`;

const animations = {
  fadeInTopDown,
  popUp,
};

export const injectAnimation = (
  animation: keyof typeof animations,
  duration = '1.5s',
  type = 'linear',
  delay = '0s',
  afterStyle?: SerializedStyles,
): SerializedStyles => {
  const newAnimation = css`
    position: relative;
    animation: ${animations[animation]} ${duration} ${type} ${delay} forwards;
    ${afterStyle}
  `;

  return newAnimation;
};
