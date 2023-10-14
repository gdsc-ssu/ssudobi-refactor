import * as styles from './Circle.styles';

interface FCProps {
  /**
   * 이름
   */
  name: string;
  /**
   * 타입
   */
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
