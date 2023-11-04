import { ComponentProps } from 'react';
import {
  ModalButton,
  Message,
  ModalContent,
  Title,
<<<<<<< Updated upstream
  ModalOverlay,
=======
  Modal,
  ModalView,
>>>>>>> Stashed changes
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
  /*
   * 버튼 클릭시 실행할 함수
   */
  onClick: () => void;
}

const ConfirmModal = ({ title, message, onClick, ...props }: ModalProps) => {
  return (
<<<<<<< Updated upstream
    <ModalOverlay>
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ModalButton css={buttonStyle} {...props}>
          확인
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
=======
    <Modal>
      <ModalView
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalContent>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ModalButton css={buttonStyle} {...props} onClick={onClick}>
            확인
          </ModalButton>
        </ModalContent>
      </ModalView>
    </Modal>
>>>>>>> Stashed changes
  );
};

const buttonStyle = css`
  width: 20rem;
`;

export default ConfirmModal;
