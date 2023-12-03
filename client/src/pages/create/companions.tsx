import { RoundButton } from '@/components/Buttons';
import { useHeader, useMate } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MateManageKit } from '@/components/Mate';
import { injectAnimation } from '@/styles/animations';
import { CompanionProps } from '@/utils/types/Companion';

/**
 * 예약하기 페이지
 */
const Reserve = () => {
  const { setHeader } = useHeader();
  const route = useRouter();

  const time = route.query.time as string;
  const useCase = route.query.useCase as string;

  const { selectedList, handleSelect } = useMate();

  const [companions, setCompnaions] = useState<CompanionProps[]>([]);

  const [checkedButton, setCheckedButton] = useState<boolean>(false);

  useLayoutEffect(() => {
    setHeader('예약하기');
  }, []);

  useEffect(() => {
    const curComapnions: CompanionProps[] = selectedList.map((res) => {
      return {
        name: res.info.name,
        memberNo: res.info.sId,
        id: `${res.id}`,
        alternativeId: res.info.alternativeId,
      };
    });
    setCompnaions(curComapnions);
  }, [selectedList]);

  useEffect(() => {
    console.log(companions);
    if (companions.length >= 2 && companions.length <= 8) {
      setCheckedButton(false);
    } else {
      setCheckedButton(true);
    }
  }, [companions]);

  return (
    <Container>
      <InnerContainer>
        <Title>메이트를 선택할거예요</Title>
        <Caption>간단한 예약 정보를 입력해주세요!</Caption>
      </InnerContainer>
      <CompanionListContainer>
        <MateManageKit
          kitType="selectable"
          selectedList={selectedList}
          handleSelect={handleSelect}
          css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}
        />
      </CompanionListContainer>
      <RoundButtonContainer>
        <RoundButton
          title="예약 가능 시간 탐색하기"
          theme="primary"
          disabled={checkedButton}
          onClick={() => {
            if (checkedButton) return;
            const companionsJson = JSON.stringify(companions);
            const encodedCompanions = encodeURIComponent(companionsJson);

            route.push({
              pathname: '/create/timetable',
              query: {
                time: time,
                useCase: useCase,
                companions: encodedCompanions,
              },
            });
          }}
        />
      </RoundButtonContainer>
    </Container>
  );
};

export default Reserve;

const Container = styled.div`
  padding-top: 6rem;
  height: 90vh;
`;

const Title = styled.div`
  margin-bottom: 10px;
  color: ${COLORS.grey1};
  ${TYPO.title1.Sb};
`;

const Caption = styled.div`
  ${TYPO.text1.Reg}
`;

const InnerContainer = styled.div`
  padding-bottom: 2rem;
`;

const RoundButtonContainer = styled.div`
  padding: 1rem 2.7rem;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CompanionListContainer = styled.div`
  overflow-y: auto;
  max-height: 400px;
`;
