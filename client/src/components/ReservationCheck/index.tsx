import styled from '@emotion/styled';
import { Title } from '../Layouts';
import Template from '../TemplateList/TemplatePage/Template';
import { useAtomValue } from 'jotai';
import { authInfoState } from '@/atoms/authInfoState';
import { getAccessToken } from '@/utils/lib/tokenHandler';
import { useQuery } from '@tanstack/react-query';
import { getReservationData } from '@/apis/ReserveData';
import { ReservationData } from '@/@types/ReservationList';

const ReservationCheck = () => {
  const authInfo = useAtomValue(authInfoState);
  const AccessToken = getAccessToken();
  const { data: reservationData } = useQuery<ReservationData | undefined>(
    ['reserveData', AccessToken],
    () => getReservationData(AccessToken),
    { enabled: AccessToken !== undefined },
  );

  return (
    <Container>
      <TitleBox>
        <Title
          title={`${authInfo?.name}님, \n 현재 예약 정보를 확인해 보세요.`}
          subtitle=""
          animated={false}
        />
      </TitleBox>
      <ReservationListsBox>
        {reservationData?.data?.totalCount !== undefined
          ? reservationData?.data?.list.map((el, idx) => (
              <ListBox key={idx}>
                <Template
                  title="외부 예약"
                  beginTime={el.beginTime}
                  endTime={el.endTime}
                  place={el.room.name}
                  friends={el.patrons}
                  type="RESERVE"
                  reserveId={el.id}
                  idx={idx}
                  onClick={() => {}}
                />
              </ListBox>
            ))
          : '예약 없음'}
      </ReservationListsBox>
    </Container>
  );
};

const Container = styled.div``;

const TitleBox = styled.div`
  margin-top: 77px;
  padding: 0 28px;
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
  margin: 10px auto;
`;

export default ReservationCheck;
