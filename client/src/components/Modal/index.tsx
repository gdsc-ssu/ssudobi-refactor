import { ComponentProps } from 'react';
import ConfirmModal from './Confrim';
import DecisionModal from './Decision';
import { ModalOverlay } from './common';
import { injectAnimation } from '@/styles/animations';

type ModalType = 'confirm' | 'decision';
interface Props extends ComponentProps<'button'> {
  modalType: ModalType;
  isTransition: boolean;
  handleClose: () => void;
  /**
   * 모달에 표시할 타이틀
   */
  title: string;
  /**
   * 모달에 표시할 메시지
   */
  message: string;
}

const Modal = ({
  isTransition,
  modalType,
  handleClose,
  title,
  message,
  ...props
}: Props) => {
  return (
    <ModalOverlay
      css={isTransition && injectAnimation('modalBackgroundDisappear')}
    >
      {modalType === 'confirm' && (
        <ConfirmModal title={title} message={message} {...props} />
      )}
      {modalType === 'decision' && (
        <DecisionModal
          title={title}
          message={message}
          onCancle={handleClose}
          {...props}
        />
      )}
    </ModalOverlay>
  );
};

export default Modal;
