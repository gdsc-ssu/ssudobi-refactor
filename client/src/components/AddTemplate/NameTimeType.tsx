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

type CheckedButtons = {
  '1시간': boolean;
  '2시간': boolean;
  '3시간': boolean;
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

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const setAtomTemplate = useSetAtom(templateAtom);

  const AvailableTime = () => {
    const selectedHour = Object.keys(checkedButtons).find(
      (key) => checkedButtons[key as keyof CheckedButtons] === true,
    );
    return selectedHour || '';
  };

  const handleOnClickNext = () => {
    const updatedTemplate = {
      ...template,
      title: title,
      type: '수업',
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
        <MenuTitle>세미나실 종류</MenuTitle>
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

      <MenuBox>
        <MenuTitle>사용 시간</MenuTitle>
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
      </MenuBox>
      <MenuBox>
        <MenuTitle>사용 용도를 선택해 주세요.</MenuTitle>
        {/** TODO: 사용용도 컴포넌트 추가하기 */}
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

export default NameTimeType;
