import styled from '@emotion/styled';
import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
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
    const updatedTemplate = {
      ...template,
      title: title,
      type: SelectUsage(),
      time: parseInt(AvailableTime()?.slice(0, 1), 10),
      seminarType: isSeminar ? '세미나' : '개방형',
    };
    setAtomTemplate(updatedTemplate);
  };

  return (
    <PageContainer>
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
      <MenuBox>
        <MenuTitle>사용 시간과 용도를 선택해 주세요.</MenuTitle>
      </MenuBox>
      <SmallMenuBox>
        <SmallTitleBox>사용 시간</SmallTitleBox>
        <TimesBox>
          <ItemButton
            style={{ marginRight: '8px' }}
            title="1시간"
            disabled={false}
            checked={checkedButtons['1시간']}
            onClick={() => handleButtonClick('1시간')}
          />
          <ItemButton
            style={{ marginRight: '8px' }}
            title="2시간"
            disabled={false}
            checked={checkedButtons['2시간']}
            onClick={() => handleButtonClick('2시간')}
          />
          <ItemButton
            style={{ marginRight: '8px' }}
            title="3시간"
            disabled={false}
            checked={checkedButtons['3시간']}
            onClick={() => handleButtonClick('3시간')}
          />
        </TimesBox>
      </SmallMenuBox>
      <SmallMenuBox>
        <SmallTitleBox>사용 용도를 선택해 주세요.</SmallTitleBox>
        <FlexBox>
          <UsageMarginBox>
            <Usage
              title="학습"
              checked={usageBtns['학습']}
              onClick={() => handleUsageBtnClick('학습')}
            />
          </UsageMarginBox>
          <Usage
            title="회의"
            checked={usageBtns['회의']}
            onClick={() => handleUsageBtnClick('회의')}
          />
        </FlexBox>
        <FlexBox>
          <UsageMarginBox>
            <Usage
              title="수업"
              checked={usageBtns['수업']}
              onClick={() => handleUsageBtnClick('수업')}
            />
          </UsageMarginBox>
          <Usage
            title="기타"
            checked={usageBtns['기타']}
            onClick={() => handleUsageBtnClick('기타')}
          />
        </FlexBox>
      </SmallMenuBox>

      <MenuBox>
        <MenuTitle>장소 종류</MenuTitle>
        <DescriptionBox>
          개방형 세미나실은 3명만 이용할 수 있어요.
        </DescriptionBox>
        <TypeBox>
          <ItemButton
            style={{ marginRight: '8px' }}
            title="세미나실"
            disabled={false}
            checked={isSeminar}
            onClick={() => setIsSeminar(true)}
          />
          <ItemButton
            style={{ marginRight: '8px' }}
            title="&nbsp;&nbsp;&nbsp;개방형 세미나실&nbsp;&nbsp;&nbsp;"
            disabled={false}
            checked={!isSeminar}
            onClick={() => setIsSeminar(false)}
          />
        </TypeBox>
      </MenuBox>

      <NextFixedBox>
        <NextWidthBox>
          <Link href={'/template/2'}>
            <RoundButton
              style={{ width: '322px' }}
              title="다음 단계로"
              theme="primary"
              onClick={handleOnClickNext}
            />
          </Link>
        </NextWidthBox>
      </NextFixedBox>
    </PageContainer>
  );
};

const TitleBox = styled.div`
  margin-top: 77px;
`;

const SmallTitleBox = styled.div`
  ${TYPO.title3.Reg};
  margin-bottom: 15px;
`;

const SmallMenuBox = styled.div`
  margin-top: 20px;
`;

const MenuBox = styled.div`
  margin-top: 30px;
`;

const TimesBox = styled.div`
  display: flex;
  width: 241px;
`;

const TypeBox = styled.div`
  display: flex;
`;

const NextFixedBox = styled.div`
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  margin: auto;
  display: flex;
  justify-content: center;
`;

const NextWidthBox = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const DescriptionBox = styled.div`
  ${TYPO.text2.Reg};
  color: ${COLORS.grey3};
  margin-top: -10px;
  margin-bottom: 10px;
`;

const FlexBox = styled.div`
  display: flex;
  margin-bottom: 7px;
`;

const UsageMarginBox = styled.div`
  margin-right: 6px;
  width: 100%;
`;
export default NameTimeType;
