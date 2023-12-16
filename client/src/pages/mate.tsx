import { seos } from '@/assets/seos';
import { Title } from '@/components/Layouts';
import { MateManageKit } from '@/components/Mate';
import Seo from '@/components/Seo';
import { useAuth } from '@/hooks';
import { injectAnimation } from '@/styles/animations';
import { PageContainer, flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Mate = () => {
  const { authInfo } = useAuth();
  const config = {
    title: `${authInfo?.name || ''}님,\n슈도비 메이트를 추가해보세요.`,
    subtitle: '함께 공부하는 친구를 등록하고, 편하게 예약해요.',
    animated: true,
  };

  return (
    <PageContainer css={pageStyle}>
      <Seo {...seos.mate} />
      <TitleWrapper css={paddingStyle}>
        <Title {...config} />
      </TitleWrapper>
      <MateManageKit
        kitType="removable"
        css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}
      />
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

export default Mate;
