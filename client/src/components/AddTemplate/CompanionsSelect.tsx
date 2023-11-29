import { MateManageKit } from '@/components/Mate';
import { useMate } from '@/hooks';
import styled from '@emotion/styled';
import { Title } from '../Layouts';
import { PageContainer, flex } from '@/styles/tokens';
import RoundButton from '../Buttons/Round';
import Link from 'next/link';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom, useSetAtom } from 'jotai';
import { templateAtom } from '.';
import { Patron } from 'Template';
import { css } from '@emotion/react';
import { injectAnimation } from '@/styles/animations';
import { useRouter } from 'next/router';

const CompanionsSelect = () => {
  const { selectedList, handleSelect } = useMate();
  const router = useRouter();

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const setAtomTemplate = useSetAtom(templateAtom);

  const hanldeOnClickNext = () => {
    const updatedTemplate: MyTemplate = {
      ...template,
      people: selectedList.map((item) => {
        const { id, ...rest } = item;
        return {
          id: typeof id === 'number' ? id.toString() : id,
          ...rest,
        } as Patron;
      }),
      usePerson: selectedList.length,
    };
    setAtomTemplate(updatedTemplate);
    router.push('/template/3');
  };

  console.log('selectedlist', selectedList);

  return (
    <PageContainer css={pageStyle}>
      <TitleBox css={paddingStyle}>
        <Title
          title="메이트를 선택할 거예요."
          subtitle="함께 도서관을 이용할 메이트를 선택해 주세요."
          animated={false}
        />
      </TitleBox>
      <MateManageKit
        kitType="selectable"
        handleSelect={handleSelect}
        selectedList={selectedList}
      />
      <NextBox css={paddingStyle}>
        {template.seminarType === '개방형 세미나실' ? (
          <WarningBox display={true}>최대 2명까지 선택 가능합니다.</WarningBox>
        ) : (
          <WarningBox display={selectedList.length >= 8}>
            {selectedList.length >= 8 ? '최대 8명까지 선택 가능합니다.' : '.'}
          </WarningBox>
        )}
        <ButtonWrapper>
          <RoundButton
            title="예약 가능 시간 탐색하기"
            theme="primary"
            disabled={selectedList.length < 2}
            onClick={hanldeOnClickNext}
          />
        </ButtonWrapper>
      </NextBox>
    </PageContainer>
  );
};

const TitleBox = styled.div``;

const NextBox = styled.div`
  width: 100%;
  ${flex('column', 'end', 'center', 1)}
`;

const WarningBox = styled.div<{ display: boolean }>`
  ${TYPO.text2.Reg};
  color: ${(props) => (props.display ? COLORS.tomato : COLORS.white)};
  display: flex;
  justify-content: center;
  margin-bottom: 13px;
`;

const pageStyle = css`
  width: 100%;
  padding: 3rem 0rem;
  padding-bottom: 10rem;
  position: relative;
  ${flex('column', 'start', 'start', 3)};
  ${injectAnimation('fadeInTopDown', '0.5s', 'ease')};
`;

const paddingStyle = css`
  padding: 0rem 2.7rem;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  margin-top: 4rem;
`;

export default CompanionsSelect;
