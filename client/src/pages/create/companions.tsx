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
import { PageContainer, flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import { Title } from '@/components/Layouts';

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
    <PageContainer css={pageStyle}>
      <Title
        title="메이트를 선택할거예요"
        subtitle="함께 도서관을 이용할 메이트를 선택해주세요."
        animated
        css={paddingStyle}
      />
      <CompanionListContainer>
        <MateManageKit
          kitType="selectable"
          selectedList={selectedList}
          handleSelect={handleSelect}
          css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}
        />
      </CompanionListContainer>
      <ButtonWrapper>
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
      </ButtonWrapper>
    </PageContainer>
  );
};

export default Reserve;

const pageStyle = css`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
  padding: 3rem 0rem;
`;

const paddingStyle = css`
  padding: 0rem 2.7rem;
`;

const CompanionListContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 50vh;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 5rem 2.7rem 0rem 2.7rem;
`;
