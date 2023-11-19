import { RoundButton } from '@/components/Buttons';
import Usage from '@/components/Buttons/Usage';
import { Picker } from '@/components/Layouts';
import { useHeader } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { PageContainer } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CheckedBox from '@/assets/svg/checkBox-checked.svg';
import UnCheckedBox from '@/assets/svg/checkBox-unChecked.svg';
import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * 예약하기 페이지
 */
const Reserve = () => {
  const { setHeader } = useHeader();
  const route = useRouter();

  const [checkedButton, setCheckedButton] = useState<boolean>(true);
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [selectedUsage, setSelectedUsage] = useState('학습');

  const handleUsageClick = (title: string) => {
    setSelectedUsage(title);
  };
  const [time, setTime] = useState<string[]>([]);

  useLayoutEffect(() => {
    setHeader('예약하기');
  }, []);

  useEffect(() => {
    if (time.length && selectedUsage !== '') {
      setCheckedButton(false);
    } else {
      setCheckedButton(true);
    }
  }, [time, selectedUsage]);

  return (
    <PageContainer>
      <Container>
        <div>
          <Title>세미나실을 예약할 거예요.</Title>
          <Caption>간단한 예약 정보를 입력해주세요!</Caption>
          <SubTitle>사용시간과 용도를 선택해주세요.</SubTitle>
          <Picker
            title="사용 시간"
            itemType="Info"
            isMultiple={false}
            itemSetter={setTime}
            contents={[
              {
                disabled: false,
                title: '1시간',
              },
              {
                disabled: false,
                title: '2시간',
              },
              {
                disabled: false,
                title: '3시간',
              },
            ]}
          />

          <EmptyBox />
          <UsageContainer>
            <Caption>사용 용도를 선택해 주세요</Caption>
            <EmptyBox />
            <UsageDiv>
              <Usage
                title="학습"
                checked={selectedUsage === '학습'}
                onClick={() => handleUsageClick('학습')}
              />
              <div style={{ width: '6px' }}></div>
              <Usage
                title="회의"
                checked={selectedUsage === '회의'}
                onClick={() => handleUsageClick('회의')}
              />
            </UsageDiv>
            <div style={{ height: '6px' }}></div>
            <UsageDiv>
              <Usage
                title="수업"
                checked={selectedUsage === '수업'}
                onClick={() => handleUsageClick('수업')}
              />
              <div style={{ width: '6px' }}></div>
              <Usage
                title="기타"
                checked={selectedUsage === '기타'}
                onClick={() => handleUsageClick('기타')}
              />
            </UsageDiv>
          </UsageContainer>

          <EmptyBox />
          <CheckBoxDiv>
            <div
              onClick={() => {
                setCheckBox((res) => !res);
              }}
            >
              {checkBox ? <CheckedBox /> : <UnCheckedBox />}
            </div>
            <CheckBoxText>현재 예약 정보를 템플릿으로 추가하기</CheckBoxText>
          </CheckBoxDiv>
          <div style={{ height: '10px' }}></div>
          <Caption>자주하는 예약의 경우 탬플릿으로 추가하면</Caption>
          <Caption>다음번에 간편하게 예약할 수 있어요</Caption>
        </div>
        <RoundButton
          title="예약 가능 시간 탐색하기"
          theme="primary"
          disabled={checkedButton}
          onClick={() => {
            route.push({
              pathname: '/create/companions',
              query: { time: time, useCase: selectedUsage },
            });
          }}
        />
      </Container>
    </PageContainer>
  );
};

export default Reserve;

const Container = styled.div`
  margin-top: 6rem;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-bottom: 10px;
  color: ${COLORS.grey1};
  ${TYPO.title1.Sb};
`;
const SubTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  color: ${COLORS.grey0};
  ${TYPO.title3.Sb};
`;

const Caption = styled.div`
  ${TYPO.text1.Reg}
`;

const EmptyBox = styled.div`
  height: 20px;
`;

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UsageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBoxDiv = styled.div`
  display: flex;
`;

const CheckBoxText = styled.div`
  margin-left: 10px;
  color: ${COLORS.grey0};
  ${TYPO.title3.Sb};
`;
