import { ComponentProps } from 'react';
import {
  ModalButton,
  Message,
  ModalContent,
  Title,
  ModalOverlay,
} from '../common';
import styled from '@emotion/styled';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import { COLORS } from '@/styles/colors';
import { injectAnimation } from '@/styles/animations';

interface ModalProps extends ComponentProps<'button'> {
  /**
   * 모달에 표시할 타이틀
   */
  title: string;
  /**
   * 모달에 표시할 메시지
   */
  message: string;
  /**
   * 취소 버튼 눌렀을 때 실행되는 함수
   */
  onCancle: () => void;
  /**
   * 모달 꺼질 때
   */
  isTransition?: boolean;
}

const DecisionModal = ({
  title,
  message,
  onCancle,
  isTransition,
  ...props
}: ModalProps) => {
  return (
    <ModalContent
      css={isTransition && injectAnimation('modalDisappear', '0.3s', 'ease')}
    >
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ButtonsWrapper>
        <ModalButton css={[closeStyle, commonStyle]} onClick={onCancle}>
          닫기
        </ModalButton>
        <ModalButton css={commonStyle} {...props}>
          확인
        </ModalButton>
      </ButtonsWrapper>
    </ModalContent>
  );
};

const ButtonsWrapper = styled.div`
  width: 100%;
  padding: 0rem 2rem;
  ${flex('row', 'center', 'center', 0.8)};
`;

const commonStyle = css`
  flex: 1;
  max-width: 20rem;
`;

const closeStyle = css`
  background-color: ${COLORS.disabled};
  color: white;
`;

export default DecisionModal;
