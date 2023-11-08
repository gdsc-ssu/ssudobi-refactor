import styled from '@emotion/styled';
import { transform } from '@/styles/tokens';
import { useToast } from '@/hooks';
import { injectAnimation } from '@/styles/animations';
import ToastBox from './ToastBox';

const Toast = () => {
  const { isMount, theme, content, isTransition } = useToast();

  if (isMount) {
    return (
      <ToastContainer
        css={isTransition && injectAnimation('toastClose', '1s', 'ease')}
      >
        <ToastBox theme={theme} content={content} />
      </ToastContainer>
    );
  }
  return <></>;
};

const ToastContainer = styled.div`
  position: fixed;
  z-index: 99;
  top: 2rem;
  left: 50%;
  opacity: 0;
  ${transform('translate(-50%, 0%)')};
  ${injectAnimation('toastOpen', '1s', 'ease')};
`;

export default Toast;
