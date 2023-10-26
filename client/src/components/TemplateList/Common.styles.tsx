import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
`;

export const TitleBox = styled.div`
  color: ${COLORS.primary};
  ${TYPO.text2.Sb};
`;

export const DateBox = styled.div`
  margin-top: 5px;
  ${TYPO.text3.Reg};
`;

export const PlaceBox = styled.div`
  margin-top: 3px;
  ${TYPO.text3.Reg};
`;

export const NoteBox = styled.div`
  ${TYPO.text3.Lg};
  margin-top: 10px;
`;

export const PeopleBox = styled.div`
  display: flex;
`;

export const PersonInfo = styled.div`
  ${TYPO.label.Md};
  border-radius: 3px;
  color: ${COLORS.grey3};
  background-color: #ececec;
  padding: 2px 5px;
  margin-right: 5px;
  margin-top: 10px;
`;

export const PlusBox = styled.button`
  width: 50px;
  background-color: ${COLORS.primary};
  border-radius: 10px;
  color: white;
  font-size: 30px;
  border: none;
`;
