import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
`;

// export const SideLine = styled.div`
//   background-color: ${COLORS.grey7};
//   border-radius: 0 10px 10px 0;
// `;

export const InfoBox = styled.div`
  width: 250px;
  background-color: ${COLORS.grey7};
  padding: 15px 20px;
  border-radius: 10px;
  margin-right: 12px;
`;

export const TitleBox = styled.div`
  color: ${COLORS.primary};
  font-size: 1.2rem;
`;

export const DateBox = styled.div`
  margin-top: 5px;

  font-size: 1rem;
  font-weight: 400;
`;

export const PlaceBox = styled.div`
  margin-top: 3px;
  font-size: 1rem;
  font-weight: 400;
`;

export const NoteBox = styled.div`
  font-weight: 300;
  font-size: 1rem;
  margin-top: 10px;
`;

export const PeopleBox = styled.div`
  display: flex;
`;

export const PersonInfo = styled.div`
  font-size: 0.8rem;
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
