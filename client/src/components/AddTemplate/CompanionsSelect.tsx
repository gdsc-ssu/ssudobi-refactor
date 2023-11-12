import { MateManageKit } from '@/components/Mate';
import { useMate } from '@/hooks';
import styled from '@emotion/styled';
import { Title } from '../Layouts';
import { PageContainer } from '@/styles/tokens';
import RoundButton from '../Buttons/Round';
import Link from 'next/link';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';

const CompanionsSelect = () => {
  const { selectedList, handleSelect } = useMate();
  console.log('seleclist', selectedList);
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
          <WarningBox display={selectedList.length >= 8}>
            {selectedList.length >= 8 ? '최대 8명까지 선택 가능합니다.' : '.'}
          </WarningBox>
          <NextWidthBox>
            <Link href={'/template/3'}>
              <RoundButton
                style={{ width: '322px' }}
                title="다음 단계로"
                theme="primary"
                disabled={true}
              />
            </Link>
          </NextWidthBox>
        </NextBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 659px;
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
  margin: auto;
`;

const WarningBox = styled.div<{ display: boolean }>`
  ${TYPO.text2.Reg};
  color: ${(props) => (props.display ? COLORS.tomato : COLORS.white)};
  display: flex;
  justify-content: center;
  margin-bottom: 13px;
`;

export default CompanionsSelect;
