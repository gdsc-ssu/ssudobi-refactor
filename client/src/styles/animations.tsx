import { SerializedStyles, css, keyframes } from '@emotion/react';

// 인터랙션 저장소
// 애니메이션 추가 -> 해당 애니메이션 객체에 담기 -> injextAnimation 함수로 사용
const fadeInTopDown = keyframes`
    from{
        opacity: 0;
        top: -2rem;
    }
    to{
        opacity: 1;
        top: 0rem;
    }
`;

const animations = {
  fadeInTopDown,
};

export const injectAnimation = (
  animation: keyof typeof animations,
  delay = '1.5s',
  type = 'linear',
  afterStyle?: SerializedStyles,
): SerializedStyles => {
  const newAnimation = css`
    position: relative;
    animation: ${animations[animation]} ${delay} ${type} forwards;
    ${afterStyle}
  `;

  return newAnimation;
};
