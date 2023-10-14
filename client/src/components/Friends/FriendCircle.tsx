import React from 'react';
import * as styles from './Circle.styles';

interface FCProps {
  name: string;
  type: 'friend' | 'plus';
}

const FriendCircle = ({ name, type }: FCProps) => {
  return (
    <styles.CircleContainer style={{ marginLeft: '-12px' }} type={type}>
      {name}
    </styles.CircleContainer>
  );
};

export default FriendCircle;
