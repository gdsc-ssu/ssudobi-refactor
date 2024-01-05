import loadingAnimaion from '@/assets/json/loading.json';
import { useVh } from '@/hooks';
import { injectAnimation } from '@/styles/animations';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const LoadingScreen = () => {
  const { fullPageStyle } = useVh();

  return (
    <ScreenLayout css={fullPageStyle(0, 0)}>
      <Lottie animationData={loadingAnimaion} css={animationStyle} />
    </ScreenLayout>
  );
};

const ScreenLayout = styled.div`
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #000000ac;
  ${injectAnimation('modalBackgroundAppear')};
  ${flex('column', 'center', 'center', 0)};
  z-index: 999;
`;

const animationStyle = css`
  width: 50%;
  max-width: 300px;
  height: auto;
`;

export default LoadingScreen;
