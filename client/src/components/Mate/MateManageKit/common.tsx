import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MateBox = styled.div`
  width: 100%;
  padding: 1.5rem 3rem;
  ${flex('row', 'start', 'center', 1.5)};
  cursor: pointer;
`;

export const boxStyle = {
  mate: css`
    background-color: ${COLORS.grey8};
  `,
  selectable: css`
    cursor: pointer;
  `,
  removable: css`
    cursor: default;
  `,
};

export const lineStyles = {
  bottom: css`
    border-bottom: 1px solid ${COLORS.grey45};
  `,
  both: css`
    border-top: 1px solid ${COLORS.grey45};
    border-bottom: 1px solid ${COLORS.grey45};
  `,
};

export const logoStyle = css`
  width: 4rem;
  height: 4rem;
`;
