import { MateManageKit } from '@/components/Mate';
import { useMate } from '@/hooks';
import styled from '@emotion/styled';
import { Title } from '../Layouts';
import { PageContainer } from '@/styles/tokens';
import RoundButton from '../Buttons/Round';
import Link from 'next/link';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom, useSetAtom } from 'jotai';
import { templateAtom } from '.';

const CompanionsSelect = () => {
  const { selectedList, handleSelect } = useMate();

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const setAtomTemplate = useSetAtom(templateAtom);

  const hanldeOnClickReserve = () => {
    const updatedTemplate = {
      ...template,
      people: selectedList,
      usePerson: selectedList.length,
    };
    setAtomTemplate(updatedTemplate);
  };

  return (
    <>
      <PageContainer>
        <TitleBox>
          <Title
            title="메이트를 선택할 거예요."
            subtitle="함께 도서관을 이용할 메이트를 선택해 주세요."
            animated={false}
          />
        </TitleBox>
      </PageContainer>
      <Container>
        <MateManageKit
          kitType="selectable"
          handleSelect={handleSelect}
          selectedList={selectedList}
        />
        <NextBox>
          {template.seminarType === '개방형 세미나실' ? (
            <WarningBox display={true}>
              최대 2명까지 선택 가능합니다.
            </WarningBox>
          ) : (
            <WarningBox display={selectedList.length >= 8}>
              {selectedList.length >= 8 ? '최대 8명까지 선택 가능합니다.' : '.'}
            </WarningBox>
          )}
          <NextWidthBox>
            <Link href={'/template/3'}>
              <RoundButton
                style={{ width: '322px' }}
                title="예약 가능 시간 탐색하기"
                theme="primary"
                disabled={selectedList.length < 2}
                onClick={hanldeOnClickReserve}
              />
            </Link>
          </NextWidthBox>
        </NextBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  margin: 30px 27px;
`;
const NextBox = styled.div`
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const NextWidthBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const WarningBox = styled.div<{ display: boolean }>`
  ${TYPO.text2.Reg};
  color: ${(props) => (props.display ? COLORS.tomato : COLORS.white)};
  display: flex;
  justify-content: center;
  margin-bottom: 13px;
`;

export default CompanionsSelect;
