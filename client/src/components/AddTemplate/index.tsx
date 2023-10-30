import styled from '@emotion/styled';
import { atom, useAtomValue } from 'jotai';
import { authInfoState } from '@/atoms/authInfoState';
import { Title } from '../Layouts';
import { SquareButton } from '../Buttons';
import Template from '../TemplateList/TemplatePage/Template';
import Link from 'next/link';
import { useEffect } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';

export const templateAtom = atom<MyTemplate>({
  title: '',
  place: '',
  day: '',
  time: 0,
  usePerson: 0,
  startTime: '',
  finishTime: '',
  people: [],
  semina: 0,
  type: '',
});

const AddTemplate = () => {
  const authInfo = useAtomValue(authInfoState);

  const dummyData = [
    {
      title: '캡스톤',
      place: '세미나 1실',
      day: '2023-12-03',
      usePerson: 3,
      startTime: '14:00',
      finishTime: '15:00',
      people: ['김수진', '이준규'],
    },
    {
      title: '슈도비',
      place: '세미나 1실',
      day: '2023-12-03',
      usePerson: 3,
      startTime: '14:00',
      finishTime: '15:00',
      people: ['정명진', '최상원'],
    },
  ];

  return (
    <Container>
      <TitleBox>
        <Title
          title={`${authInfo?.name}님, \n템플릿을 만들고 선택해 보세요.`}
          subtitle="정기적으로 진행되는 미팅을 빠르게 신청할 수 있어요"
          animated={false}
        />
      </TitleBox>
      <ButtonBox>
        <Link href={'/template/1'}>
          <SquareButton title="템플릿 추가하기" theme="primary" />
        </Link>
      </ButtonBox>
      <ReservationListsBox>
        {dummyData !== undefined
          ? dummyData.map((el, idx) => (
              <ListBox key={idx}>
                <Template
                  title="템플릿 제목"
                  beginTime={el.startTime}
                  endTime={el.finishTime}
                  place={el.place}
                  memo="memo"
                  friends={el.people}
                />
              </ListBox>
            ))
          : '템플릿 없음'}
      </ReservationListsBox>
    </Container>
  );
};

const Container = styled.div``;

const TitleBox = styled.div`
  margin-top: 77px;
  padding: 0 28px;
`;

const ButtonBox = styled.div`
  padding: 30px 28px;
`;

const ReservationListsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 15px;
`;

export default AddTemplate;
