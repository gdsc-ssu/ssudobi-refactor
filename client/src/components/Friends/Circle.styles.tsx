import { COLORS } from '@/styles/colors';
import { transform, transition } from '@/styles/tokens';
import styled from '@emotion/styled';

export const CircleContainer = styled.div<{
  type: 'friend' | 'plus';
}>`
  border: 0.3rem solid
    ${(props) => (props.type === 'friend' ? COLORS.primary : COLORS.grey3)};

  width: 4.2rem;
  height: 4.2rem;
  border-radius: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.type === 'friend' ? '1rem' : '2rem')};
  font-weight: 800;
  background-color: ${(props) =>
    props.type === 'friend' ? '#e8f4ff' : 'rgba(238, 238, 238, 0.87)'};
  padding-top: ${(props) => (props.type === 'friend' ? 0 : '3px')};
  color: ${(props) =>
    props.type === 'friend' ? COLORS.primary : COLORS.grey3};

  position: relative;
  ${transition('0.2s', 'ease')};

  cursor: ${(props) => (props.type === 'friend' ? 'default' : 'pointer')};

  &:hover {
    ${transform('translateY(-0.2rem)')}
  }
`;
