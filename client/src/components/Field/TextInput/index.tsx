import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import { injectAnimation } from '@/styles/animations';

interface Props extends ComponentProps<'input'> {
  /**
   * 입력 값 오버라이딩
   */
  value: string;
  /**
   * 경고 여부 (underline)
   */
  warning?: boolean;
  /**
   * 경고 상황일 때, 하단 캡션 문구
   */
  warningCaption?: string;
}

/**
 * 커스텀 인풋 박스
 */
const TextInput = ({
  value,
  warning = false,
  warningCaption,
  ...props
}: Props) => {
  return (
    <InputWrapper>
      <CustomInput value={value} {...props} />
      <Underline
        css={[
          !!value && underlineStyle.filled,
          warning && underlineStyle.warning,
        ]}
      />
      {warning && warningCaption && <Caption>{warningCaption}</Caption>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const CustomInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  ${TYPO.title3.Lg};

  &:focus + div::before {
    width: 100%;
  }

  &::placeholder {
    ${TYPO.title3.Lg};
    color: ${COLORS.grey5};
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: -0.6rem;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${COLORS.grey5};

  ::before,
  ::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 0;
    bottom: 0;
    left: 0;
    background-color: ${COLORS.primary};
    transition: width 0.4s;
  }
`;

const Caption = styled.span`
  ${TYPO.caption.Reg};
  color: ${COLORS.tomato};
  text-align: start;
  white-space: nowrap;

  position: absolute;
  bottom: -2.8rem;
  right: 0px;

  ${injectAnimation('fadeInTopDownTranslate', '0.2s')};
`;

const underlineStyle = {
  filled: css`
    &::before {
      width: 100%;
    }
  `,
  warning: css`
    &::after {
      background-color: ${COLORS.tomato};
      width: 100%;
    }
  `,
};

export default TextInput;
