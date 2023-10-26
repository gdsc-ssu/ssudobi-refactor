import { TemplateProps } from '../TemplateProps';
import * as styles from './HomeTemplate.styles';

const HomeTemplate = ({ title, time, place, memo, friends }: TemplateProps) => {
  return (
    <styles.Container>
      <styles.InfoBox>
        <styles.TitleBox>{title}</styles.TitleBox>
        <styles.DateBox>{time}</styles.DateBox>
        <styles.PlaceBox>{place}</styles.PlaceBox>
        <styles.NoteBox>{memo}</styles.NoteBox>
        <styles.PeopleBox>
          {friends.map((el) => {
            return <styles.PersonInfo key={el}>{el}</styles.PersonInfo>;
          })}
        </styles.PeopleBox>
      </styles.InfoBox>
      <styles.PlusBox>+</styles.PlusBox>
    </styles.Container>
  );
};

export default HomeTemplate;
