import styled from '@emotion/styled';
import Plus from '../../../public/assets/companions/puls.svg';
import Image from 'next/image';
import Companion from './Companion';

const CompnaionsList = () => {
  const exData = [
    { name: '정명진', memberNo: '20180806', id: '111' },
    { name: '최상원', memberNo: '20180399', id: '112' },
  ];

  return (
    <Container>
      <AddMate
        onClick={() => {
          // TODO : 동반이용자 추가페이지로 이동해야함
        }}
      >
        <Image src={Plus} alt="plus-button" />
        <AddMateText>메이트 추가하기</AddMateText>
      </AddMate>
      {exData.map((res, idx) => {
        return (
          <Companion
            key={idx}
            name={res.name}
            id={res.id}
            memberNo={res.memberNo}
            isSelected={false}
          />
        );
      })}
    </Container>
  );
};

export default CompnaionsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e1e1e1;
  background: #f7f7f7;
`;

const AddMate = styled.div`
  padding: 15px 30px;
  display: flex;
  align-items: center;
`;

const AddMateText = styled.div`
  margin-left: 15px;
  color: #999;
  font-family: Pretendard Variable;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
