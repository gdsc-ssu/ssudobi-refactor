import * as styles from '../Common.styles';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { TemplateInfo } from 'Template';

const HomeTemplate = ({
  title,
  beginTime,
  endTime,
  place,
  memo,
  friends,
}: TemplateInfo) => {
  return (
    <InfoBox>
      <styles.TitleBox>{title}</styles.TitleBox>
      <styles.DateBox>
        {beginTime} {endTime}
      </styles.DateBox>
      <styles.PlaceBox>{place}</styles.PlaceBox>
      <styles.NoteBox>{memo}</styles.NoteBox>
      <styles.PeopleBox>
        {friends.map((el) => {
          return <styles.PersonInfo key={el}>{el}</styles.PersonInfo>;
        })}
      </styles.PeopleBox>
    </InfoBox>
  );
};

const InfoBox = styled.div`
  width: 100%;
  background-color: ${COLORS.grey7};
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  margin-right: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  cursor: pointer;
`;

export const PlusBox = styled.button`
  width: 5rem;
  background-color: ${COLORS.primary};
  border-radius: 1rem;
  color: white;
  font-size: 3rem;
  border: none;
`;

export default HomeTemplate;
