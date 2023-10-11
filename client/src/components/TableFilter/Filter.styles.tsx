import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';

interface FilterBoxProps {
  expanded: boolean;
}

export const FilterBox = styled.div<FilterBoxProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: ${(props) => (props.expanded ? '342px' : '46px')};
  width: 100vw;
  transition: height 0.5s ease;
  border-bottom: ${(props) => (props.expanded ? 'solid 1px #ececec' : 'none')};
`;

export const FilterFlexBox = styled.div`
  display: flex;
  margin: auto;
`;

export const FilterButton = styled.div<FilterBoxProps>`
  margin: 0 auto;
  margin-top: ${(props) => (props.expanded ? '290px' : '-12px')};
  transition: margin 0.5s ease;
  cursor: pointer;
`;

export const FilterHeaderHalf = styled.div`
  display: flex;
`;

export const FilterHeaderDiv = styled.div<FilterBoxProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 12px 50px;
  border-bottom: solid 1px #ececec;
`;

export const FilterDiv = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`;

export const FilterHeaderText = styled.div`
  // text1/Lg
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.07rem;
  display: flex;
  align-items: center;
`;

export const FilterText = styled.div`
  color: ${COLORS.grey4};
  margin-left: 15px;
  // text1/Lg
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.07rem;
  display: flex;
  align-items: center;
`;
