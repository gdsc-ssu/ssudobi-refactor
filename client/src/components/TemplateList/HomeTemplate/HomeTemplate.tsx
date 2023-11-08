import * as styles from '../Common.styles';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { Patron, TemplateInfo } from 'Template';
import { formatSchedule } from '@/utils/func/templateTimeConverter';
import { useEffect, useState } from 'react';

const HomeTemplate = ({
  title,
  day,
  beginTime,
  endTime,
  place,
  memo,
  friends,
}: TemplateInfo) => {
  const [isMax, setIsMax] = useState(false);
  const [patrons, setPatrons] = useState<string[]>([]);

  const organizePatron = (patron: Patron) => {
    return `${patron.sId} ${patron.name}`;
  };

  const calculPatrons = () => {
    if (friends.length > 2) {
      setIsMax(true);
      setPatrons(friends.slice(0, 2).map((el) => organizePatron(el)));
    } else {
      setIsMax(false);
      setPatrons(friends.map((el) => organizePatron(el)));
    }
  };

  const getRestPatrons = (patrons: Patron[]) => {
    return `외 ${patrons.length - 2}명`;
  };

  useEffect(() => {
    calculPatrons();
  }, []);

  return (
    <InfoBox>
      <styles.TitleBox>{title}</styles.TitleBox>
      <styles.DateBox>{formatSchedule(day, beginTime, endTime)}</styles.DateBox>
      <styles.PlaceBox>{`세미나룸 ${place}`}</styles.PlaceBox>
      <styles.NoteBox>{memo}</styles.NoteBox>
      <styles.PeopleBox>
        {patrons.map((el) => {
          return <styles.PersonInfo key={el}>{el}</styles.PersonInfo>;
        })}
        {isMax && (
          <styles.PersonInfo>{getRestPatrons(friends)}</styles.PersonInfo>
        )}
      </styles.PeopleBox>
    </InfoBox>
  );
};

const InfoBox = styled.div`
  width: 100%;
  background-color: ${COLORS.grey7};
  padding: 1.5rem 2rem;
  border-radius: 1rem;
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
