import AddTemplate from '@/components/AddTemplate';
import { PageContainer } from '@/styles/tokens';
import { css } from '@emotion/react';

const Template = () => {
  return (
    <PageContainer css={pageStyle}>
      <AddTemplate />
    </PageContainer>
  );
};

const pageStyle = css`
  width: 100%;
  padding: 3rem 0rem;
`;

export default Template;
