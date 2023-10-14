import { COLORS } from '@/styles/colors';
import { flex, transform, transition } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  title: string;
  subtitle: string;
  assets: any[];
  buttonStyleType: 'blue' | 'skyblue';
}

const ReservationButton = ({
  title,
  subtitle,
  assets,
  buttonStyleType,
  ...props
}: Props) => {
  return (
    <ButtonWrapper css={buttonStyles[buttonStyleType]} {...props}>
      <span css={tokens.title}>{title}</span>
      <span css={tokens.subtitle}>{subtitle}</span>
      {assets.map((Asset, idx) => (
        <span css={[assetCommon, assetsStyle[idx]]}>
          <Asset />
        </span>
      ))}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  width: 100%;
  min-width: 33rem;
  height: 10rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 1.2rem 1.4rem;

  ${flex('column', 'end', 'end', 0.3)};

  position: relative;

  &:hover {
    svg {
      ${transform('translateY(-5px)')}
    }
  }

  &:active {
    svg {
      ${transform('translateY(2px)')}
    }
  }
`;

const buttonStyles = {
  blue: css`
    border-radius: 1rem;
    background: linear-gradient(94deg, #1d9bf0 -5.09%, #1d76b1 111.14%);
  `,
  skyblue: css`
    border-radius: 1rem;
    background: linear-gradient(94deg, #56cbe4 -4.61%, #1d9bf0 111%);
  `,
};

const assetCommon = css`
  position: absolute;

  svg {
    ${transition('0.5s', 'ease')};
  }
`;

const assetsStyle = [
  css`
    top: 25%;
    left: 10%;
    ${transform('rotate(23deg)')};
  `,
  css`
    top: 55%;
    left: 25%;
    ${transform('rotate(-11deg)')}
  `,
  css`
    top: 30%;
    left: 42%;
    ${transform('rotate(-17deg)')}
  `,
];

const tokens = {
  title: css`
    ${TYPO.title3.Sb};
    color: white;
  `,
  subtitle: css`
    ${TYPO.label.Reg};
    color: white;
  `,
};

export default ReservationButton;
