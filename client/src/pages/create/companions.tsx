import { RoundButton } from '@/components/Buttons';
import { useHeader } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import CompanionsList from '@/components/CompanionsList';
import { CompanionProps } from '@/utils/types/Companion';

/**
 * 예약하기 페이지
 */
const Reserve = () => {
  const { setHeader } = useHeader();
  const route = useRouter();

  const time = route.query.time as string;
  const useCase = route.query.useCase as string;

  const [curCompanions, setCurCompnaions] = useState<CompanionProps[]>([]);

  const [checkedButton, setCheckedButton] = useState<boolean>(false);

  useLayoutEffect(() => {
    setHeader('예약하기');
  }, []);

  useEffect(() => {
    if (curCompanions.length >= 2 && curCompanions.length <= 8) {
      setCheckedButton(false);
    } else {
      setCheckedButton(true);
    }
  }, [curCompanions]);

  return (
    <Container>
      <InnerContainer>
        <Title>메이트를 선택할거예요</Title>
        <Caption>간단한 예약 정보를 입력해주세요!</Caption>
      </InnerContainer>
      <CompanionListContainer>
        <CompanionsList
          curCompanions={curCompanions}
          setCurCompanions={setCurCompnaions}
          companions={[
            {
              name: '정명진',
              memberNo: '20180806',
              id: '227974',
              alternativeId: 'c002d415-f0f4-4111-90f8-a329cc9b31fe',
            },
            {
              name: '김수진',
              memberNo: '20182665',
              id: '240341',
              alternativeId: '4adcb026-ab3f-49d0-bfbc-81d1327a49ad',
            },
          ]}
        />
      </CompanionListContainer>
      <RoundButtonContainer>
        <RoundButton
          title="예약 가능 시간 탐색하기"
          theme="primary"
          disabled={checkedButton}
          onClick={() => {
            if (checkedButton) return;
            const companionsJson = JSON.stringify(curCompanions);
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
  height: 100vh;
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
  padding: 1rem 2.7rem;
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
