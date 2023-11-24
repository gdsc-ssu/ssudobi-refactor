import styled from '@emotion/styled';
import Plus from '@/assets/svg/puls.svg';
import Companion from './Companion';
import { Dispatch, SetStateAction, useState } from 'react';
import { CompanionProps } from '@/utils/types/Companion';

interface CompanionsListProps {
  companions: CompanionProps[];
  curCompanions: CompanionProps[];
  setCurCompanions: Dispatch<SetStateAction<CompanionProps[]>>;
}

const CompanionsList = ({
  companions,
  curCompanions,
  setCurCompanions,
}: CompanionsListProps) => {
  const [selectedStates, setSelectedStates] = useState(
    companions.map(() => false),
  );

  const handleCompanionClick = (index: number, companion: CompanionProps) => {
    const isSelected = !selectedStates[index];

    const newSelectedStates = [...selectedStates];
    newSelectedStates[index] = !newSelectedStates[index];
    setSelectedStates(newSelectedStates);

    if (isSelected) {
      if (!curCompanions.some((comp) => comp.id === companion.id)) {
        setCurCompanions((prev) => [...prev, companion]);
      }
    } else {
      if (curCompanions.some((comp) => comp.id === companion.id)) {
        setCurCompanions((prev) =>
          prev.filter((comp) => comp.id !== companion.id),
        );
      }
    }
  };

  return (
    <Container>
      <AddMate
        onClick={() => {
          // TODO : 동반이용자 추가페이지로 이동해야함
        }}
      >
        <PlusButton>
          <Plus />
        </PlusButton>
        <AddMateText>메이트 추가하기</AddMateText>
      </AddMate>
      {companions.map((res, idx) => {
        return (
          <Companion
            key={idx}
            name={res.name}
            id={res.id}
            memberNo={res.memberNo}
            isSelected={selectedStates[idx]}
            onClick={() => {
              handleCompanionClick(idx, res);
            }}
          />
        );
      })}
    </Container>
  );
};

export default CompanionsList;

const Container = styled.div`
  display: flex;
  min-height: 200px;
  flex-direction: column;
  border-bottom: 1px solid #e1e1e1;
  background: #f7f7f7;
`;

const AddMate = styled.div`
  padding: 1.5rem 3rem;
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

const PlusButton = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
