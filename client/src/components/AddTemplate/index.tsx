import styled from '@emotion/styled';
import { atom, useAtomValue } from 'jotai';
import { authInfoState } from '@/atoms/authInfoState';
import { Title } from '../Layouts';
import { SquareButton } from '../Buttons';
import Template from '../TemplateList/TemplatePage/Template';
import Link from 'next/link';
import { MyTemplate } from '@/@types/MyTemplate';
import { getAccessToken } from '@/utils/lib/tokenHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const templateAtom = atom<MyTemplate>({
  title: '',
  day: '',
  time: 0,
  usePerson: 0,
  startTime: '',
  finishTime: '',
  people: [],
  semina: [],
  type: '회의',
  seminarType: '세미나실',
});

const AddTemplate = () => {
  const authInfo = useAtomValue(authInfoState);
  const [templateArr, setTemplateArr] = useState<MyTemplate[]>([]);

  useEffect(() => {
    // 처음 렌더링 시 로컬 스토리지에서 데이터 가져오기
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []); // 빈 배열을 전달하여 처음 렌더링 시에만 실행되도록 함

  const queryClient = useQueryClient();

  const handleOnClickReserve = (idx: number) => {
    const AccessToken = getAccessToken();

    // const MakeReserve = useMutation(() => postReservation(data, AccessToken), {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(['reserveCancel']);
    //   },
    // });
  };

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
        {templateArr !== undefined
          ? templateArr.map((el, idx) => (
              <ListBox key={idx}>
                <Template
                  title={el.title}
                  day={el.day}
                  beginTime={el.startTime}
                  endTime={el.finishTime}
                  friends={el.people}
                  place={el.seminarType + ' ' + el.semina}
                  idx={idx}
                  type="TEMPLATE"
                  onClick={() => handleOnClickReserve(idx)}
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
  margin-top: 23px;
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
