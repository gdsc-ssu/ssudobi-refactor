import { ComponentProps } from 'react';
import * as styles from './Circle.styles';
import { css } from '@emotion/react';

interface FCProps extends ComponentProps<'div'> {
  /**
   * 이름
   */
  name: string;
  /**
   * 타입
   */
  type: 'friend' | 'plus';
}

const FriendCircle = ({ name, type, ...props }: FCProps) => {
  return (
    <styles.CircleContainer css={leftStyle} type={type} {...props}>
      {name}
    </styles.CircleContainer>
  );
};

const leftStyle = css`
  margin-left: -1.2rem;
`;

export default FriendCircle;
