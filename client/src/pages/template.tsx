import { seos } from '@/assets/seos';
import AddTemplate from '@/components/AddTemplate';
import Seo from '@/components/Seo';
import { PageContainer } from '@/styles/tokens';
import { css } from '@emotion/react';

const Template = () => {
  return (
    <PageContainer css={pageStyle}>
      <Seo {...seos.template} />
      <AddTemplate />
    </PageContainer>
  );
};

const pageStyle = css`
  width: 100%;
  padding: 3rem 0rem;
`;

export default Template;
