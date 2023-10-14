import styled from '@emotion/styled';
import Image from 'next/image';
import { TYPO } from '@/styles/typo';
import Logo from '@/assets/svg/logo-blue.svg';

interface ModalProps {
  /**
   * 이름
   */
  name: string;
  /**
   * 학번
   */
  memberNo: string;
  /**
   * 도서관 id
   */
  id: string;
}

const Profile = ({ name, id, memberNo }: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lid = id;
  return (
    <Container>
      <Image width={50} src={Logo} alt="profileLogo" />
      <InfoDiv>
        <Name>{name}님, 반가워요!</Name>
        <MemberNo>{memberNo}</MemberNo>
      </InfoDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 66px;
`;

const InfoDiv = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  ${TYPO.title3.Sb};
`;

const MemberNo = styled.div`
  font-family: Pretendard Variable;
  font-size: 13px;
  font-style: normal;
`;

export default Profile;
