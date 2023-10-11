import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  /**
   * 버튼 내부 콘텐츠
   */
  title: string;
  /**
   * 클릭 가능 여부 오버라이딩
   */
  disabled: boolean;
  /**
   * 클릭 되었는지 여부 오버라이딩
   */
  checked: boolean;
}

const ItemButton = ({ title, disabled, checked, ...props }: Props) => {
  const buttonStyleInjector = (disabled: boolean, checked: boolean) => {
    if (disabled) return buttonStyles.disabled;
    if (checked) return buttonStyles.checked;
    return buttonStyles.abled;
  };

  return (
    <ButtonWrapper css={buttonStyleInjector(disabled, checked)} {...props}>
      {title}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
`;

const buttonStyles = {
  abled: css`
    background-color: ${COLORS.white};
    border: 0.05rem solid ${COLORS.grey4};
    color: ${COLORS.grey2};
    cursor: pointer;
    ${transition('0.2s', 'linear')};

    &:hover {
      background-color: ${COLORS.primaryWhite};
    }
  `,
  disabled: css`
    background-color: ${COLORS.grey6};
    border: 0.05rem solid ${COLORS.grey3};
    color: ${COLORS.grey3};
    cursor: default;
  `,
  checked: css`
    background-color: ${COLORS.primary};
    border: 0.05rem solid ${COLORS.primary};
    color: ${COLORS.white};
    cursor: pointer;
  `,
};

export default ItemButton;
