import { TemplateProps } from '../TemplateProps';
import * as styles from './Template.styles';

const Template = ({ title, time, place, memo, friends }: TemplateProps) => {
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
      <styles.SideLine />
    </styles.Container>
  );
};

export default Template;
