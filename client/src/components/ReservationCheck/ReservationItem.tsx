import { postReservationCancel } from '@/apis/ReserveData';
import { useToast, useTransition } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { getAccessToken } from '@/utils/lib/tokenHandler';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../Modal';
import { PatronInfo, ReservationData } from '@/@types/ReservationList';
import { formatDateRange } from '@/utils/func/templateTimeConverter';

interface Props {
  title: string;
  beginTime: string;
  endTime: string;
  room: string;
  patrons: PatronInfo[];
  patron: string;
  authName: string;
  reserveId: number;
}

const ReservationItem = ({
  title = '외부 예약',
  beginTime,
  endTime,
  room,
  patrons,
  patron,
  authName,
  reserveId,
}: Props) => {
  const { isMount, handleOpen, handleClose, isTransition } = useTransition();
  const { showToast } = useToast();
  const AccessToken = getAccessToken();
  const queryClient = useQueryClient();

  const CancelReserve = useMutation(
    () => postReservationCancel(reserveId, AccessToken),
    {
      onSuccess: () => {
        showToast('positive', '예약이 취소되었습니다.');
        queryClient.setQueryData(
          ['reserveData', AccessToken],
          (prevData: ReservationData | undefined) => {
            if (!prevData) return prevData;
            return {
              ...prevData,
              reservations: prevData.data.list.filter(
                (reservation) => reservation.id !== reserveId,
              ),
            };
          },
        );

        queryClient.invalidateQueries(['reserveData']);
      },
    },
  );

  const handleRemove = () => {
    CancelReserve.mutate();
    handleClose();
  };

  return (
    <Container>
      <InfoBox>
        <TitleBox>
          <div>{title}</div>
          <RemoveBox>
            <FontAwesomeIcon
              onClick={handleOpen}
              icon={faXmark}
              css={css`
                cursor: pointer;
              `}
            />
          </RemoveBox>
        </TitleBox>
        <div>
          <DateBox>{formatDateRange(beginTime, endTime)}</DateBox>
          <PlaceBox>
            {room}
            {patron !== authName && (
              <PersonInfo style={{ backgroundColor: 'transparent' }}>
                {' 예약자: ' + patron}
              </PersonInfo>
            )}
          </PlaceBox>
          <PeopleBox>
            {patrons.map((el, idx) => {
              return (
                <PersonInfo key={idx}>
                  {el.name} / {el.memberNo}
                </PersonInfo>
              );
            })}
          </PeopleBox>
        </div>
      </InfoBox>
      <SideLine />
      {isMount && (
        <Modal
          isTransition={isTransition}
          modalType="decision"
          title="예약을 정말 삭제할까요?"
          message="삭제한 예약은 복구할 수 없어요."
          handleClose={handleClose}
          onClick={handleRemove}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const InfoBox = styled.div`
  width: 100%;
  background-color: ${COLORS.grey7};
  padding: 1.8rem 1.8rem 1.8rem 2.2rem;
  border-radius: 10px 0 0 10px;
`;

const TitleBox = styled.div`
  display: flex;
  color: ${COLORS.primary};
  ${TYPO.text2.Sb};
`;

const RemoveBox = styled.div`
  margin-left: auto;
  ${flex('row', 'end', 'center', 1)}
  font-size: 2rem;
  gap: 0.6rem;
`;

const DateBox = styled.div`
  margin-top: 5px;
  ${TYPO.text3.Reg};
  white-space: pre-line;
  line-height: 155%;
`;

const PlaceBox = styled.div`
  margin-top: 5px;
  ${TYPO.text3.Reg};
  display: flex;
  align-items: center;
`;

const PeopleBox = styled.div`
  display: flex;
  ${flex('row', 'start', 'end', 0.5)};
  flex-wrap: wrap;
  margin-top: 1.3rem;
`;

const PersonInfo = styled.div`
  ${TYPO.label.Md};
  border-radius: 3px;
  color: ${COLORS.grey3};
  background-color: #ececec;
  padding: 2px 5px;
`;

const SideLine = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 0 10px 10px 0;
  width: 5px;
`;

export default ReservationItem;
