import { ComponentProps } from 'react';
import ConfirmModal from './Confrim';
import DecisionModal from './Decision';
import { injectAnimation } from '@/styles/animations';
import ReactPortal from './Portal';
import { useVh } from '@/hooks';
import styled from '@emotion/styled';
import { flex } from '@/styles/tokens';

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
  const { fullPageStyle } = useVh();

  return (
    <ReactPortal wrapperId="modal-portal">
      <Overlay
        css={[
          fullPageStyle(),
          isTransition &&
            injectAnimation('modalBackgroundDisappear', '0.3s', 'ease'),
        ]}
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
      </Overlay>
    </ReactPortal>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  z-index: 999;
  ${flex('row', 'center', 'center', 0)};
  ${injectAnimation('modalBackgroundAppear', '0.3s', 'ease')}
`;

export default Modal;
