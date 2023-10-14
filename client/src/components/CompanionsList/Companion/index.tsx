import styled from '@emotion/styled';
import Image from 'next/image';
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
  /**
   * 선택 여부
   */
  isSelected: boolean;
}

const Companion = ({ name, id, memberNo, isSelected }: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lid = id;
  return (
    <Container isSelected={isSelected}>
      <Image width={35} src={Logo} alt="profileLogo" />
      <Profile>
        <Name>{name}</Name>
        <MemberNo>{memberNo}</MemberNo>
      </Profile>
    </Container>
  );
};

const Container = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#d7eafc' : '#f7f7f7')};
  padding: 15px 30px;

  display: flex;

  align-items: center;
`;

const Profile = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-family: Pretendard Variable;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MemberNo = styled.div`
  font-family: Pretendard Variable;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default Companion;
