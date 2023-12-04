import * as styles from '../Common.styles';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { Patron, TemplateInfo, WeekdayShort } from 'Template';
import { formatSchedule } from '@/utils/func/templateTimeConverter';
import { useEffect, useState } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';
import { MateItemType } from 'Mate';

const HomeTemplate = ({
  title,
  day,
  startTime,
  finishTime,
  seminarType,
  people,
}: MyTemplate) => {
  const [isMax, setIsMax] = useState(false);
  const [patrons, setPatrons] = useState<string[]>([]);

  const organizePatron = (patron: MateItemType) => {
    return `${patron.info.sId} ${patron.info.name}`;
  };

  const calculPatrons = () => {
    if (people.length > 2) {
      setIsMax(true);
      setPatrons(people.slice(0, 2).map((el) => organizePatron(el)));
    } else {
      setIsMax(false);
      setPatrons(people.map((el) => organizePatron(el)));
    }
  };

  const getRestPatrons = (patrons: MateItemType[]) => {
    return `외 ${patrons.length - 2}명`;
  };

  useEffect(() => {
    calculPatrons();
  }, []);

  return (
    <InfoBox>
      <styles.TitleBox>{title}</styles.TitleBox>
      <styles.DateBox>{`${day} ${startTime}-${finishTime}`}</styles.DateBox>
      <styles.PlaceBox>{`${seminarType}`}</styles.PlaceBox>
      <styles.PeopleBox>
        {patrons.map((el) => {
          return <styles.PersonInfo key={el}>{el}</styles.PersonInfo>;
        })}
        {isMax && (
          <styles.PersonInfo>{getRestPatrons(people)}</styles.PersonInfo>
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
