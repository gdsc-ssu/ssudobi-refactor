import styled from '@emotion/styled';
import { useTemplate } from '@/hooks';
import { PageContainer, flex } from '@/styles/tokens';
import { useLayoutEffect } from 'react';
import { Title } from '../Layouts';
import { MenuTitle } from './common';
import { TextInput } from '../Field';
import { ItemButton } from '../Buttons';
import RoundButton from '../Buttons/Round';
import { Seminartype, UsageType } from '@/@types/MyTemplate';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import Usage from '../Buttons/Usage';
import { css } from '@emotion/react';
import { injectAnimation } from '@/styles/animations';

const TIMES: number[] = [1, 2, 3];
const USAGES: UsageType[] = ['학습', '회의', '수업', '기타'];
const ROOMS: Seminartype[] = ['세미나실', '개방형 세미나실'];

const NameTimeType = () => {
  const {
    settingHeader,
    template,
    settingTitle,
    settingSeminarType,
    settingTime,
    settingUsage,
    handleNextStage,
  } = useTemplate();

  useLayoutEffect(() => {
    settingHeader();
  }, []);

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
          value={template.title}
          onChange={settingTitle}
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
            {TIMES.map((item) => (
              <ItemButton
                disabled={false}
                title={`${item}시간`}
                checked={template.time === item}
                onClick={() => settingTime(item)}
                key={item}
              />
            ))}
          </TimesBox>
        </MenuBox>
        <MenuBox>
          <SmallTitleBox>사용 용도를 선택해 주세요.</SmallTitleBox>
          <UsageWrapper>
            {USAGES.map((item) => (
              <Usage
                title={item}
                checked={template.type === item}
                onClick={() => settingUsage(item)}
                key={item}
              />
            ))}
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
          {ROOMS.map((item) => (
            <ItemButton
              title={item}
              disabled={false}
              checked={template.seminarType === item}
              onClick={() => settingSeminarType(item)}
              key={item}
            />
          ))}
        </TypeBox>
      </MenuBox>
      <RoundButton
        title="다음 단계로"
        theme="primary"
        onClick={() => handleNextStage('name')}
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
