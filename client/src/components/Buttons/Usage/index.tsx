import { injectAnimation } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { flex, transition } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {
  /**
   * 버튼에 들어갈 내용
   */
  title: string;
  /**
   * 버튼 체크 여부
   */
  checked: boolean;
}

const Usage = ({ title, checked, ...props }: Props) => {
  const getButtonStyle = (checked: boolean) => {
    if (checked) return buttonStyles.checked;
    else return buttonStyles.default;
  };

  return (
    <UsageButton htmlFor={title} css={getButtonStyle(checked)}>
      <UsageInput checked={checked} id={title} {...props} />
      <span>{title}</span>
      {checked && (
        <>
          <Circle css={circleStyles[0]} />
          <Circle css={circleStyles[1]} />
        </>
      )}
    </UsageButton>
  );
};

const Circle = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="81"
      height="81"
      viewBox="0 0 81 81"
      fill="none"
      {...props}
    >
      <circle
        cx="40.5"
        cy="40.5"
        r="40.5"
        fill="url(#paint0_linear_1437_3598)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1437_3598"
          x1="40.5"
          y1="0"
          x2="40.5"
          y2="81"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AEDDFD" />
          <stop offset="1" stop-color="#1D9BF0" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const circleStyles = [
  css`
    position: absolute;
    top: 50%;
    left: 10%;
    ${injectAnimation('usageMovingBottom')};
  `,
  css`
    position: absolute;
    bottom: 50%;
    right: 10%;
    ${injectAnimation('usageMovingTop')};
  `,
];

const buttonStyles = {
  checked: css`
    background-color: ${COLORS.primary};
    color: white;
  `,
  default: css`
    background-color: ${COLORS.grey6};
    color: ${COLORS.grey4};
  `,
};

const UsageButton = styled.label`
  width: 100%;
  height: 6.8rem;
  border-radius: 1rem;
  ${flex('row', 'center', 'center', 0)};
  position: relative;
  overflow: hidden;
  ${TYPO.title2.Sb};
  ${buttonStyles.default};
  ${transition('0.3s', 'linear')};
`;

const UsageInput = styled.input`
  display: none;
`;

export default Usage;
