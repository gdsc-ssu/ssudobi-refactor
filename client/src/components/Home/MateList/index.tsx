import FriendCircle from '@/components/Friends/FriendCircle';
import { flex } from '@/styles/tokens';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  mates: string[];
}

const MateList = ({ mates, ...props }: Props) => {
  return (
    <MateWrapper {...props}>
      {mates.map((mate, idx) => (
        <FriendCircle name={mate} type={'friend'} key={mate} />
      ))}
      <FriendCircle type="plus" name="+" />
    </MateWrapper>
  );
};

const MateWrapper = styled.div`
  width: 100%;
  ${flex('row', 'start', 'center', 0)};
  padding-left: 1.2rem;
`;

export default MateList;
