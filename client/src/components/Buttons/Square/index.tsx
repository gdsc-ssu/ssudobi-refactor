import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type Theme = 'white' | 'primary';

interface Props extends ComponentProps<'button'> {
  /**
   * 버튼 내부 문자열
   */
  title: string;
  /**
   * white: 배경 흰색, 텍스트 프라이머리
   *
   * primary: 배경 프라미어리, 텍스트 흰색
   *
   * disabled={true} 인 경우 자동으로 회색처리
   */
  theme: Theme;
}

/**
 * 모서리가 각진 버튼
 */
const RoundButton = ({ title, theme, ...props }: Props) => {
  return (
    <ButtonWrapper theme={theme} {...props}>
      {title}
    </ButtonWrapper>
  );
};

const buttonStyles: Record<Theme, SerializedStyles> = {
  white: css`
    background-color: ${COLORS.white};
    color: ${COLORS.primary};
  `,
  primary: css`
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
  `,
} as const;

const ButtonWrapper = styled.button<{ theme: Theme }>`
  width: 100%;
  min-width: 25rem;
  height: 5rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  ${TYPO.text1.Sb};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  ${flex('row', 'center', 'center', 0)};

  ${(props) => {
    return buttonStyles[props.theme as Theme];
  }}

  &:disabled {
    background-color: ${COLORS.grey3};
    color: ${COLORS.white};
    cursor: default;
  }
`;

export default RoundButton;
