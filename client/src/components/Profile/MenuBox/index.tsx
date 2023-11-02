import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  title: string;
}

const MenuBox = ({ title, ...props }: Props) => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3rem 3rem;
  cursor: pointer;
  ${transition('0.2s', 'linear')};

  &:hover {
    background-color: ${COLORS.grey8};
  }
`;

const Title = styled.span`
  ${TYPO.title3.Reg};
  color: ${COLORS.grey1};
  text-align: start;
`;

export default MenuBox;
