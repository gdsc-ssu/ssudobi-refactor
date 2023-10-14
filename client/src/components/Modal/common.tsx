import { COLORS } from '@/styles/colors';
import { flex, transform, transition } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';

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
