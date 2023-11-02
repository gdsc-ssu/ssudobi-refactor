import { ReserveButtons } from '@/components/Home';
import { Title } from '@/components/Layouts';
import { useAuth } from '@/hooks';
import { PageContainer, flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Home = () => {
  const { authInfo } = useAuth();
  const configs = {
    reserve: {
      title: `${authInfo?.name || ''}님,\n지금 바로 예약해보세요.`,
      subtitle: '세미나실과 개방형 세미나실을 간편하게 예약해보세요!',
      animated: true,
    },
    template: {
      title: `템플릿으로\n간편하게 예약해요.`,
      subtitle: '미리 템플릿을 만들어두면,\n빠르고 쉽게 다음 예약이 가능해요.',
      animated: true,
    },
    mate: {
      title: '내 슈도비 메이트와 함께!',
      subtitle: '항상 함께 가는 친구를 등록하고,\n빠르게 예약해보세요!',
      animated: true,
    },
  };

  return (
    <PageContainer css={pageStyle}>
      <TitleWrapper css={paddingStyle}>
        <Title {...configs.reserve} />
        <ReserveButtons />
      </TitleWrapper>
      <TitleWrapper>
        <div css={paddingStyle}>
          <Title {...configs.template} />
        </div>
      </TitleWrapper>
      <TitleWrapper css={paddingStyle}>
        <Title {...configs.mate} />
      </TitleWrapper>
    </PageContainer>
  );
};

const pageStyle = css`
  width: 100%;
  ${flex('column', 'start', 'start', 6)};
  padding: 3rem 0rem;
`;

const paddingStyle = css`
  padding: 0rem 2.7rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
`;

export default Home;
