import { COLORS } from '@/styles/colors';
// import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
// import { ComponentProps, ReactNode } from 'react';
// import RoundButton from './path-to-your-round-button'; // 경로를 수정해주세요.

interface ModalProps {
  /**
   * 모달에 표시할 타이틀
   */
  title: string;
  /**
   * 모달에 표시할 메시지
   */
  message: string;
  /**
   * 확인 버튼 눌렀을 때 실행되는 함수
   */
  onConfirm: () => void;
  /**
   * 취소 버튼 눌렀을 때 실행되는 함수
   */
  onCancle: () => void;
  /**
   * 모달이 표시되어야 하는지 여부
   */
  isOpen: boolean;
}

const DecisionModal = ({
  title,
  message,
  onCancle,
  onConfirm,
  isOpen,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalContent>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <div style={{ display: 'flex' }}>
        <CancleButton onClick={onCancle}>닫기</CancleButton>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </div>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  background-color: ${COLORS.white};
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 500px;
  height: 32px;
  width: 100px;
  cursor: pointer;
  ${TYPO.text1.Md};
`;

const CancleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #b5b5b5;
  color: ${COLORS.white};
  border-radius: 500px;
  height: 32px;
  width: 100px;
  cursor: pointer;
  ${TYPO.text1.Md};
`;

const Title = styled.div`
  ${TYPO.text1.Md};
  text-align: center;
`;

const Message = styled.p`
  margin-bottom: 22px;
`;

export default DecisionModal;
