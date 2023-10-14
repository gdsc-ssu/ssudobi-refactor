import { ComponentProps } from 'react';
import { ModalButton, Message, ModalContent, Title } from '../common';

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
      <ModalButton {...props}>확인</ModalButton>
    </ModalContent>
  );
};

export default ConfirmModal;
