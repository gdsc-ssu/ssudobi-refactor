import { TemplateProps } from '../TemplateProps';
import * as styles from '../Common.styles';
import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';
import RemoveBtn from '@/assets/svg/x-button.svg';
import EditBtn from '@/assets/svg/Edit.svg';
import { getDayOfWeek } from '@/utils/func/getDayOfWeek';
import { getAccessToken } from '@/utils/lib/tokenHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReservationCancel } from '@/apis/ReserveData';
import { useState } from 'react';
import DecisionModal from '@/components/Modal/Decision';

const Template = ({
  title,
  beginTime,
  endTime,
  place,
  memo,
  friends,
  type,
  reserveId,
}: TemplateProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const AccessToken = getAccessToken();
  const queryClient = useQueryClient();

  const CancelReserve = useMutation(
    () => postReservationCancel(reserveId, AccessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reserveCancel']);
      },
    },
  );

  const handleOnClickRemoveBtn = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleRemove = () => {
    CancelReserve.mutate();
    setIsModalOpen(false);
  };

  return (
    <>
      <styles.Container>
        <InfoBox>
          <styles.TitleBox>
            <div>{title}</div>
            <RemoveBox>
              {type === 'TEMPLATE' ? (
                <ImgBox>
                  <EditBtn />
                </ImgBox>
              ) : (
                ''
              )}
              <ImgBox style={{ marginLeft: '10px' }}>
                <RemoveBtn onClick={handleOnClickRemoveBtn} />
              </ImgBox>
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
                  {el.name} / {el.memberNo}
                </styles.PersonInfo>
              );
            })}
          </styles.PeopleBox>
        </InfoBox>
        <SideLine />
      </styles.Container>
      {isModalOpen ? (
        <DecisionModal
          title={title}
          message="예약을 정말 취소할까요?"
          onCancle={() => setIsModalOpen(!isModalOpen)}
          onClick={handleRemove}
        />
      ) : (
        ''
      )}
    </>
  );
};

const RemoveBox = styled.div`
  margin-left: auto;
  display: flex;
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

const ImgBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Template;
