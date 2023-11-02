import styled from '@emotion/styled';
import { TYPO } from '@/styles/typo';
import { companionIconGetter } from '@/utils/func/companionIconGetter';
import { css } from '@emotion/react';
import { flex } from '@/styles/tokens';
import { ComponentProps } from 'react';

interface ModalProps extends ComponentProps<'div'> {
  /**
   * 이름
   */
  name: string;
  /**
   * 학번
   */
  memberNo: string;
}

const Profile = ({ name, memberNo, ...props }: ModalProps) => {
  const ProfileIcon = companionIconGetter();

  return (
    <Container {...props}>
      <ProfileIcon css={logoStyle} />
      <InfoDiv>
        <span css={TYPO.title3.Sb}>{name}님, 반가워요!</span>
        <span css={TYPO.caption.Reg}>{memberNo}</span>
      </InfoDiv>
    </Container>
  );
};

const Container = styled.div`
  ${flex('row', 'center', 'center', 0)};
  min-height: 6.6rem;
`;

const InfoDiv = styled.div`
  margin-left: 1.5rem;

  ${flex('column', 'center', 'start', 0.3)};
`;

const logoStyle = css`
  width: 3.5rem;
  height: 3.5rem;
`;

export default Profile;
