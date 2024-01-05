import { ToastTheme } from '@/atoms/toastState';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  /**
   * 토스트 테마
   */
  theme: ToastTheme;
  /**
   * 글 내용
   */
  content: string;
}

/**
 * 커스텀 Alert입니다.
 */
const ToastBox = ({ theme, content }: Props) => {
  return (
    <ToastInnerWrapper>
      <ToastContent>{content}</ToastContent>
      <ToastThemeLine css={toastStyles[theme]} />
    </ToastInnerWrapper>
  );
};

const ToastInnerWrapper = styled.div`
  width: 32rem;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  text-align: start;
  white-space: pre-line;

  background-color: ${COLORS.white};

  position: relative;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const ToastContent = styled.span`
  ${TYPO.text1.Reg};
  color: ${COLORS.grey2};
  white-space: pre-line;
  text-align: start;
  line-height: 150%;
`;

const ToastThemeLine = styled.div`
  width: 0.7rem;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const toastStyles = {
  positive: css`
    background-color: ${COLORS.primaryDeep};
  `,
  negative: css`
    background-color: ${COLORS.negative};
  `,
};

export default ToastBox;
