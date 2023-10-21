import styled from '@emotion/styled';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { flex, transform } from '@/styles/tokens';
import HumanIcon from '@/assets/svg/human.svg';
import { css } from '@emotion/react';
import { mq } from '@/styles/breakpoints';

interface Props {
  mypageHandler?: () => void;
}

const TitleHeader = ({ mypageHandler }: Props) => {
  return (
    <HeaderWrapper>
      <Logo>SSUDOBI</Logo>
      <HumanIcon onClick={mypageHandler} css={iconStyle} />
    </HeaderWrapper>
  );
};

const hovering = css`
  position: relative;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02) translateY(-1px);
  }

  &:active {
    transform: scale(0.99) translateY(0.5px);
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  min-width: 32rem;
  height: 6rem;
  ${flex('row', 'between', 'center', 0)};
  position: fixed;
  top: 0px;
  left: 50%;
  ${transform('translate(-50%, 0%)')};

  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  padding: 0rem 2.7rem;

  ${mq[4]} {
    height: 5rem;
  }
`;

const Logo = styled.span`
  ${TYPO.title1.Sb};
  font-weight: 900;
  color: ${COLORS.primary};
  cursor: pointer;

  ${hovering}
`;

const iconStyle = css`
  cursor: pointer;
  ${hovering}
`;

export default TitleHeader;
