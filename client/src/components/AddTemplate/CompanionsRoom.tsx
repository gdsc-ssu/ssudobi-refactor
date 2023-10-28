import styled from '@emotion/styled';
import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useLayoutEffect, useState } from 'react';
import { MenuTitle } from './common';
import RoundButton from '../Buttons/Round';
import Link from 'next/link';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { ItemButton } from '../Buttons';

const CompanionsRoom = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [checkedButtons, setCheckedButtons] = useState({
    '1번': false,
    '2번': false,
    '3번': false,
    '4번': false,
    '5번': false,
    '6번': false,
    '7번': false,
    '8번': false,
  });
  const handleButtonClick = (buttonTitle: keyof typeof checkedButtons) => {
    const newCheckedButtons = {
      ...checkedButtons,
    };
    newCheckedButtons[buttonTitle] = !newCheckedButtons[buttonTitle];
    setCheckedButtons(newCheckedButtons);
  };

  const buttonTitles: (keyof typeof checkedButtons)[] = [
    '1번',
    '2번',
    '3번',
    '4번',
    '5번',
    '6번',
    '7번',
    '8번',
  ];

  return (
    <>
      <PageContainer>
        <MenuBox style={{ marginTop: '77px' }}>
          <MenuTitle>
            사용인원
            <DescriptionBox color="blue">
              최대 6명을 더 추가할 수 있어요.
            </DescriptionBox>
          </MenuTitle>
        </MenuBox>
      </PageContainer>
      {/** TODO: 메이트 추가하기 */}
      <PageContainer>
        <MenuBox style={{ marginTop: '50px' }}>
          <MenuTitle>사용 세미나룸</MenuTitle>
          <RoomNumbersBox>
            {buttonTitles.map((title, index) => (
              <ItemButton
                key={index}
                style={{ marginRight: '8px' }}
                title={title}
                disabled={false}
                checked={checkedButtons[title]}
                onClick={() => handleButtonClick(title)}
              />
            ))}
          </RoomNumbersBox>
          <DescriptionBox color="grey">
            여러 개를 선택할 경우 예약 가능성이 높아져요.
          </DescriptionBox>
        </MenuBox>
        <NextFixedBox>
          <NextWidthBox>
            <Link href={'/template/3'}>
              <RoundButton
                style={{ width: '322px' }}
                title="다음 단계로"
                theme="primary"
              />
            </Link>
          </NextWidthBox>
        </NextFixedBox>
      </PageContainer>
    </>
  );
};

const MenuBox = styled.div`
  margin-top: 30px;
`;

const DescriptionBox = styled.div`
  margin-top: 15px;
  ${TYPO.text2.Md};
  color: ${(props) => (props.color === 'blue' ? COLORS.primary : COLORS.grey3)};
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

const RoomNumbersBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
`;

export default CompanionsRoom;
