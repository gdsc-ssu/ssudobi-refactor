import styled from '@emotion/styled';
import { useHeader } from '@/hooks';
import { PageContainer, flex } from '@/styles/tokens';
import { useLayoutEffect, useState } from 'react';
import { Title } from '../Layouts';
import { MenuTitle } from './common';
import { TextInput } from '../Field';
import { ItemButton } from '../Buttons';
import RoundButton from '../Buttons/Round';
import Link from 'next/link';
import { useAtom, useSetAtom } from 'jotai';
import { MyTemplate } from '@/@types/MyTemplate';
import { templateAtom } from '.';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import Usage from '../Buttons/Usage';
import { css } from '@emotion/react';
import { injectAnimation } from '@/styles/animations';
import { useRouter } from 'next/router';

type CheckedButtons = {
  '1시간': boolean;
  '2시간': boolean;
  '3시간': boolean;
};

type UsageBtns = {
  학습: boolean;
  회의: boolean;
  수업: boolean;
  기타: boolean;
};

const NameTimeType = () => {
  const { setHeader } = useHeader();
  const router = useRouter();

  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [title, setTitle] = useState<string>('');
  const [isSeminar, setIsSeminar] = useState<boolean>(true);
  const [checkedButtons, setCheckedButtons] = useState<CheckedButtons>({
    '1시간': true,
    '2시간': false,
    '3시간': false,
  });
  const handleButtonClick = (buttonTitle: keyof typeof checkedButtons) => {
    const newCheckedButtons = {
      '1시간': false,
      '2시간': false,
      '3시간': false,
    };
    newCheckedButtons[buttonTitle] = true;
    setCheckedButtons(newCheckedButtons);
  };

  const [usageBtns, setUsageBtns] = useState<UsageBtns>({
    학습: true,
    회의: false,
    수업: false,
    기타: false,
  });
  const handleUsageBtnClick = (usageTitle: keyof typeof usageBtns) => {
    const newUsageBtns = {
      학습: false,
      회의: false,
      수업: false,
      기타: false,
    };
    newUsageBtns[usageTitle] = true;
    setUsageBtns(newUsageBtns);
  };

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const setAtomTemplate = useSetAtom(templateAtom);

  const AvailableTime = () => {
    const selectedHour = Object.keys(checkedButtons).find(
      (key) => checkedButtons[key as keyof CheckedButtons] === true,
    );
    return selectedHour || '';
  };

  const SelectUsage = () => {
    const selectUsg = Object.keys(usageBtns).find(
      (key) => usageBtns[key as keyof UsageBtns] === true,
    );
    return selectUsg || '';
  };

  const handleOnClickNext = () => {
    const updatedTemplate: MyTemplate = {
      ...template,
      title: title,
      type: SelectUsage() as '학습' | '회의' | '수업' | '기타',
      time: parseInt(AvailableTime()?.slice(0, 1), 10),
      seminarType: isSeminar ? '세미나실' : '개방형 세미나실',
    };
    setAtomTemplate(updatedTemplate);
    router.push('/template/2');
  };

  return (
    <PageContainer css={pageStyle}>
      <TitleBox>
        <Title
          title="템플릿을 추가할 거예요"
          subtitle="자주 만나는 모임의 정보를 입력해 주세요!"
          animated={false}
        />
      </TitleBox>
      <MenuBox>
        <MenuTitle>템플릿 이름</MenuTitle>
        <TextInput
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          placeholder="ex. 슈도비 프로젝트 회의"
        />
      </MenuBox>
      <MenuArea
        css={css`
          margin-top: 0.6rem;
        `}
      >
        <MenuTitle>사용 시간과 용도를 선택해 주세요.</MenuTitle>
        <MenuBox>
          <SmallTitleBox>사용 시간</SmallTitleBox>
          <TimesBox>
            <ItemButton
              title="1시간"
              disabled={false}
              checked={checkedButtons['1시간']}
              onClick={() => handleButtonClick('1시간')}
            />
            <ItemButton
              title="2시간"
              disabled={false}
              checked={checkedButtons['2시간']}
              onClick={() => handleButtonClick('2시간')}
            />
            <ItemButton
              title="3시간"
              disabled={false}
              checked={checkedButtons['3시간']}
              onClick={() => handleButtonClick('3시간')}
            />
          </TimesBox>
        </MenuBox>
        <MenuBox>
          <SmallTitleBox>사용 용도를 선택해 주세요.</SmallTitleBox>
          <UsageWrapper>
            <Usage
              title="학습"
              checked={usageBtns['학습']}
              onClick={() => handleUsageBtnClick('학습')}
            />
            <Usage
              title="회의"
              checked={usageBtns['회의']}
              onClick={() => handleUsageBtnClick('회의')}
            />
            <Usage
              title="수업"
              checked={usageBtns['수업']}
              onClick={() => handleUsageBtnClick('수업')}
            />
            <Usage
              title="기타"
              checked={usageBtns['기타']}
              onClick={() => handleUsageBtnClick('기타')}
            />
          </UsageWrapper>
        </MenuBox>
      </MenuArea>
      <MenuBox>
        <DescriptionWrapper>
          <MenuTitle>장소 종류</MenuTitle>
          <DescriptionBox>
            개방형 세미나실은 3명만 이용할 수 있어요.
          </DescriptionBox>
        </DescriptionWrapper>
        <TypeBox>
          <ItemButton
            title="세미나실"
            disabled={false}
            checked={isSeminar}
            onClick={() => setIsSeminar(true)}
          />
          <ItemButton
            title="&nbsp;&nbsp;&nbsp;개방형 세미나실&nbsp;&nbsp;&nbsp;"
            disabled={false}
            checked={!isSeminar}
            onClick={() => setIsSeminar(false)}
          />
        </TypeBox>
      </MenuBox>
      <RoundButton
        title="다음 단계로"
        theme="primary"
        onClick={handleOnClickNext}
        css={buttonStyle}
      />
    </PageContainer>
  );
};

const TitleBox = styled.div``;

const SmallTitleBox = styled.div`
  ${TYPO.text1.Reg};
`;

const MenuArea = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 2)};
`;

const MenuBox = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1.5)};
`;

const TimesBox = styled.div`
  width: 70%;
  ${flex('row', 'start', 'center', 0.8)}
`;

const TypeBox = styled.div`
  width: 100%;
  ${flex('row', 'start', 'center', 0.8)}
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 0.5)}
`;

const DescriptionBox = styled.div`
  ${TYPO.text2.Reg};
  color: ${COLORS.grey3};
`;

const UsageWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.6rem;
`;

const pageStyle = css`
  width: 100%;
  padding: 3rem 2.7rem;
  padding-bottom: 10rem;
  position: relative;
  ${flex('column', 'start', 'start', 3)};
  ${injectAnimation('fadeInTopDown', '0.5s', 'ease')};
`;

const buttonStyle = css`
  width: 95%;
  margin-top: 4rem;
`;

export default NameTimeType;
