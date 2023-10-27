import { TemplateProps } from '../TemplateProps';
import * as styles from '../Common.styles';
import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';
import RemoveBtn from '@/assets/svg/x-button.svg';
import { getDayOfWeek } from '@/utils/func/getDayOfWeek';

const Template = ({
  title,
  beginTime,
  endTime,
  place,
  memo,
  friends,
  type,
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
          {type === 'RESERVE'
            ? getDayOfWeek(beginTime) +
              beginTime.slice(10, 13) +
              '시 -' +
              endTime.slice(10, 13) +
              '시'
            : endTime}
        </styles.DateBox>
        <styles.PlaceBox>{place}</styles.PlaceBox>
        <styles.NoteBox>{memo}</styles.NoteBox>
        <styles.PeopleBox>
          {friends.map((el, idx) => {
            return (
              <styles.PersonInfo key={idx}>
                {Object.values(el.name)} / {Object.values(el.memberNo)}
              </styles.PersonInfo>
            );
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
