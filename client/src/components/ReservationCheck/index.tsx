import styled from '@emotion/styled';
import { Title } from '../Layouts';
import { useAtomValue } from 'jotai';
import { authInfoState } from '@/atoms/authInfoState';
import { useQuery } from '@tanstack/react-query';
import { getReservationData } from '@/apis/ReserveData';
import { ReservationData } from '@/@types/ReservationList';
import { useAuth } from '@/hooks';
import ReservationItem from './ReservationItem';
import { css } from '@emotion/react';
import { PageContainer, flex } from '@/styles/tokens';
import { injectAnimation } from '@/styles/animations';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';

const ReservationCheck = () => {
  const authInfo = useAtomValue(authInfoState);
  const { token } = useAuth();

  const { data: reservationData } = useQuery<ReservationData | undefined>(
    ['reserveData', token],
    () => getReservationData(token),
    { enabled: token !== undefined },
  );

  return (
    <PageContainer css={pageStyle}>
      <TitleWrapper css={paddingStyle}>
        <Title
          title={`${authInfo?.name}님, \n 현재 예약 정보를 확인해 보세요.`}
          subtitle={`슈도비에서 예약한 정보를 확인하고
          아이템 상단 버튼을 눌러 예약을 취소할 수 있어요.`}
          animated={true}
        />
      </TitleWrapper>
      <ReservationListsBox
        css={[paddingStyle, injectAnimation('fadeInTopDown', '0.5s', 'ease')]}
      >
        {reservationData?.data?.totalCount !== undefined ? (
          reservationData?.data?.list.map((el, idx) => (
            <ListBox key={idx}>
              <ReservationItem
                title="예약 완료"
                beginTime={el.beginTime}
                endTime={el.endTime}
                room={el.room.name}
                patrons={el.patrons}
                reserveId={el.id}
              />
            </ListBox>
          ))
        ) : (
          <EmptyBox>
            <span>아직 등록된 예약이 없어요.</span>
          </EmptyBox>
        )}
      </ReservationListsBox>
    </PageContainer>
  );
};

const pageStyle = css`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
  padding: 3rem 0rem;
`;

const paddingStyle = css`
  padding: 0rem 2.7rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
`;

const ReservationListsBox = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1)};
  position: relative;
`;

const ListBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 40vh;
  ${flex('column', 'center', 'center', 0)};
  ${TYPO.text2.Reg};
  color: ${COLORS.grey3};
`;

export default ReservationCheck;
