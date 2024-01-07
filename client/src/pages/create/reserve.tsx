import { RoundButton } from '@/components/Buttons';
import Usage from '@/components/Buttons/Usage';
import { Picker } from '@/components/Layouts';
import { useDisabled, useHeader, useTemplate } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { PageContainer, flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CheckedBox from '@/assets/svg/checkBox-checked.svg';
import UnCheckedBox from '@/assets/svg/checkBox-unChecked.svg';
import { useEffect, useLayoutEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Title } from '@/components/Layouts';
import { injectAnimation } from '@/styles/animations';
import Seo from '@/components/Seo';
import { seos } from '@/assets/seos';
import { MenuTitle } from '@/components/AddTemplate/common';
import { TextInput } from '@/components/Field';
import { useAtom } from 'jotai';
import { makeTemplateState } from '@/atoms/templateState';

/**
 * 예약하기 페이지
 */
const Reserve = () => {
  const { setHeader } = useHeader();
  const route = useRouter();
  useDisabled();

  const {
    template,
    settingTitle,
    settingSeminarType,
    settingTime,
    settingUsage,
  } = useTemplate();

  const [checkedButton, setCheckedButton] = useState<boolean>(true);
  const [checkBox, setCheckBox] = useAtom(makeTemplateState);
  const [selectedUsage, setSelectedUsage] = useState('');

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
    <PageContainer css={pageStyle}>
      <Seo {...seos.reserve} />
      <Title
        title="세미나실을 예약할 거예요."
        subtitle="간단한 예약 정보를 입력해 주세요!"
        animated
      />
      <OptionSelectWrapper
        css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}
      >
        <SubTitle>사용시간과 용도를 선택해주세요.</SubTitle>
        <Picker
          title="사용 시간"
          itemType="Info"
          isMultiple={false}
          itemSetter={setTime}
          onClick={() => settingTime(Number(time[0]?.slice(0, 1)))}
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
        <UsageContainer>
          <Caption>사용 용도를 선택해 주세요</Caption>
          <UsageDiv>
            <Usage
              title="학습"
              checked={selectedUsage === '학습'}
              onClick={() => {
                handleUsageClick('학습');
                settingUsage('학습');
              }}
            />
            <Usage
              title="회의"
              checked={selectedUsage === '회의'}
              onClick={() => {
                handleUsageClick('회의');
                settingUsage('회의');
              }}
            />
            <Usage
              title="수업"
              checked={selectedUsage === '수업'}
              onClick={() => {
                handleUsageClick('수업');
                settingUsage('수업');
              }}
            />
            <Usage
              title="기타"
              checked={selectedUsage === '기타'}
              onClick={() => {
                handleUsageClick('기타');
                settingUsage('기타');
              }}
            />
          </UsageDiv>
        </UsageContainer>
      </OptionSelectWrapper>
      <CheckWrapper css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}>
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
        <Caption>{`자주하는 예약의 경우 탬플릿으로 추가하면\n다음번에 간편하게 예약할 수 있어요`}</Caption>
      </CheckWrapper>
      {checkBox && (
        <MenuBox>
          <MenuTitle>템플릿 이름</MenuTitle>
          <TextInput
            value={template.title}
            onChange={settingTitle}
            placeholder="ex. 슈도비 프로젝트 회의"
          />
        </MenuBox>
      )}
      <RoundButton
        css={buttonStyle}
        title="예약 가능 시간 탐색하기"
        theme="primary"
        disabled={checkedButton}
        onClick={() => {
          // TODO: 추후에 세미나실 또는 개방형세미나실 조건에 맞게 변경 필요
          settingSeminarType('세미나실');
          route.push({
            pathname: '/create/companions',
            query: { time: time, useCase: selectedUsage },
          });
        }}
      />
    </PageContainer>
  );
};

export default Reserve;

const pageStyle = css`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
  padding: 3rem 2.7rem;
`;

const SubTitle = styled.div`
  color: ${COLORS.grey0};
  ${TYPO.title3.Sb};
`;

const Caption = styled.div`
  ${TYPO.text1.Reg};
  white-space: pre-line;
  line-height: 155%;
`;

const OptionSelectWrapper = styled.div`
  width: 100%;
  position: relative;
  ${flex('column', 'start', 'start', 2.5)};
`;

const UsageContainer = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1)};
`;

const UsageDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 0.6rem;
  grid-row-gap: 0.6rem;
`;

const CheckWrapper = styled.div`
  width: 100%;
  position: relative;
  ${flex('column', 'start', 'start', 1)}
`;

const CheckBoxDiv = styled.div`
  width: 100%;
  ${flex('row', 'start', 'center', 1)}
`;

const CheckBoxText = styled.div`
  color: ${COLORS.grey0};
  ${TYPO.title3.Sb};
`;

const buttonStyle = css`
  margin-top: 5rem;
`;

const MenuBox = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1.5)};
`;
