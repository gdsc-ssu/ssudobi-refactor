import { injectAnimation } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { flex, transform, transition } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const Modal = styled(Backdrop)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 10px;
  max-width: 50rem;

  transition: height 0.5s ease;
  ${injectAnimation('modalBackgroundAppear', '0.5s', 'ease')};
`;

export const ModalContent = styled.div`
  ${flex('column', 'center', 'center', 0)}

  background-color: ${COLORS.white};
  padding: 2rem;
  border-radius: 1rem;
  width: 30rem;
  text-align: center;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export const ModalButton = styled.button`
  ${flex('column', 'center', 'center', 0)}

  border: none;
  outline: none;

  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 50rem;

  height: 3.2rem;
  ${TYPO.text2.Md};

  position: relative;
  ${transition('0.2s', 'ease')};

  &:hover {
    ${transform('translateY(-0.2rem)')};
  }

  &:active {
    ${transform('translateY(0.1rem)')};
  }
`;

export const Title = styled.div`
  ${TYPO.text1.Md};
  text-align: center;
`;

export const Message = styled.p`
  margin-bottom: 2.2rem;
`;
