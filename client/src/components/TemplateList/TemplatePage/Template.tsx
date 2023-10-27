import { TemplateProps } from '../TemplateProps';
import * as styles from '../Common.styles';
import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';
import RemoveBtn from '@/assets/svg/x-button.svg';

const Template = ({
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
        <styles.TitleBox>
          <div>{title}</div>
          <RemoveBox>
            <RemoveBtn />
          </RemoveBox>
        </styles.TitleBox>
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
      <SideLine />
    </styles.Container>
  );
};

const RemoveBox = styled.div`
  margin-left: auto;
`;

const InfoBox = styled.div`
  width: 329px;
  background-color: ${COLORS.grey7};
  padding: 15px 15px 15px 20px;
  border-radius: 10px 0 0 10px;
`;

const SideLine = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 0 10px 10px 0;
  width: 5px;
`;

export default Template;
