import { ComponentProps } from 'react';
import {
  ModalButton,
  Message,
  ModalContent,
  Title,
  Modal,
  ModalView,
} from '../common';
import { css } from '@emotion/react';
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
   * 모달 꺼질 때
   */
  isTransition?: boolean;
}

const ConfirmModal = ({
  title,
  message,
  isTransition,
  ...props
}: ModalProps) => {
  return (
    <Modal>
      <ModalView
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalContent
          css={
            isTransition && injectAnimation('modalDisappear', '0.3s', 'ease')
          }
        >
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ModalButton css={buttonStyle} {...props}>
            확인
          </ModalButton>
        </ModalContent>
      </ModalView>
    </Modal>
  );
};

const buttonStyle = css`
  width: 20rem;
`;

export default ConfirmModal;
