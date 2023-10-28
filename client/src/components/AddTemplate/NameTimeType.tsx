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

const NameTimeType = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [title, setTitle] = useState<string>('');
  const [checkedButtons, setCheckedButtons] = useState({
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
        <TextInput value={title} placeholder="ex. 슈도비 프로젝트 회의" />
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
