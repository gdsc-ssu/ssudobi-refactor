import React from 'react';
import * as styles from './Template.styles';

const Template = () => {
  return (
    <styles.Container>
      <styles.InfoBox>
        <styles.TitleBox>캡스톤 정기 회의</styles.TitleBox>
        <styles.DateBox>목요일 13시 - 15시 30분</styles.DateBox>
        <styles.PlaceBox>세미나룸 102호</styles.PlaceBox>
        <styles.NoteBox>
          캡스톤 정기 회의 잊지말자 제발!! 준비물 챙기기
        </styles.NoteBox>
        <styles.PeopleBox>
          <styles.PersonInfo>최상원 / 20181234</styles.PersonInfo>
          <styles.PersonInfo>정명진 / 20181234</styles.PersonInfo>
        </styles.PeopleBox>
      </styles.InfoBox>
      <styles.SideLine />
    </styles.Container>
  );
};

export default Template;
