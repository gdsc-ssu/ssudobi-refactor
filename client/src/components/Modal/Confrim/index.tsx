import { ComponentProps } from 'react';
import {
  ModalButton,
  Message,
  ModalContent,
  Title,
  ModalOverlay,
} from '../common';
import { css } from '@emotion/react';

interface ModalProps extends ComponentProps<'button'> {
  /**
   * 모달에 표시할 타이틀
   */
  title: string;
  /**
   * 모달에 표시할 메시지
   */
  message: string;
}

const ConfirmModal = ({ title, message, ...props }: ModalProps) => {
  return (
    <ModalContent>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ModalButton css={buttonStyle} {...props}>
        확인
      </ModalButton>
    </ModalContent>
  );
};

const buttonStyle = css`
  width: 20rem;
`;

export default ConfirmModal;
