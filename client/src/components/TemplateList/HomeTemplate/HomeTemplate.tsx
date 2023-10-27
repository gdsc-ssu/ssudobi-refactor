import { TemplateProps } from '../TemplateProps';
import * as styles from '../Common.styles';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';

const HomeTemplate = ({
  title,
  beginTime,
  endTime,
  place,
  memo,
  friends,
}: TemplateProps) => {
  return (
    <styles.Container>
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
      <styles.PlusBox>+</styles.PlusBox>
    </styles.Container>
  );
};

const InfoBox = styled.div`
  width: 250px;
  background-color: ${COLORS.grey7};
  padding: 15px 20px;
  border-radius: 10px;
  margin-right: 12px;
`;

export const PlusBox = styled.button`
  width: 50px;
  background-color: ${COLORS.primary};
  border-radius: 10px;
  color: white;
  font-size: 30px;
  border: none;
`;

export default HomeTemplate;
