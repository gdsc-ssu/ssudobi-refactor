import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';

export const CircleContainer = styled.div<{
  type: 'friend' | 'plus';
}>`
  border: 3.51px solid
    ${(props) => (props.type === 'friend' ? COLORS.primary : COLORS.grey3)};

  width: 42.76px;
  height: 42.76px;
  border-radius: 50px;
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
`;
