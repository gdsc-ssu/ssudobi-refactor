import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Picker from '@/components/Layouts/Picker';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import { calculateEndTimeWithMinutes } from '@/utils/func/calculateEndTimeWithMinutes';

interface SelectSeminarRoomModalProps {
  /**
   * 선택된 시간들 (30분 단위)
   */
  slotDay: string;
  /**
   * 요일
   */
  day: string;
  /**
   * 시작시간
   */
  startTime: string;
  /**
   * 종료시간
   */
  endTime: string;
  /**
   * 예약가능한 세미나실
   */
  seminaRoomContents: { disabled: boolean; title: string }[];
  /**
   * 선택한 세미나실
   */
  seminaRoom: string[];
  /**
   * 세미나실 변경
   */
  setSeminaRoom: Dispatch<SetStateAction<string[]>>;
  /**
   * 다음 페이지로 넘어가기 위한 플래그 함수
   */
  setIsSeminaRoomSelected: Dispatch<SetStateAction<boolean>>;
  // 템플릿용인지 예약용인지
  type: 'template' | 'reserve';
}
const SelectSeminarRoomModal = ({
  slotDay,
  day,
  startTime,
  endTime,
  seminaRoomContents,
  seminaRoom,
  setSeminaRoom,
  setIsSeminaRoomSelected,
  type,
}: SelectSeminarRoomModalProps) => {
  return (
    <>
      <ModalMainStyle>
        <ModalHeader>
          아래 시간으로
          {type === 'reserve' ? ' 예약을 ' : ' 템플릿 저장을 '}
          진행할게요
        </ModalHeader>
        <ReservationBox>
          <ReservationDay>
            {slotDay} {type === 'reserve' && day}
            <div
              style={{
                width: '80%',
                height: '2px',
                backgroundColor: '#1D9BF0',
                marginTop: '10px',
              }}
            ></div>
          </ReservationDay>
          <ReservationRightText>
            {calculateEndTimeWithMinutes(
              startTime.slice(0, 2) + startTime.slice(3),
              30,
            )}{' '}
            입실 마감
          </ReservationRightText>
          <ReservationTime>
            {startTime} ~ {endTime}
          </ReservationTime>
          <ReservationRightText>
            {calculateEndTimeWithMinutes(
              endTime.slice(0, 2) + endTime.slice(3),
              -30,
            )}{' '}
            퇴실 권장
          </ReservationRightText>
        </ReservationBox>
        <div style={{ height: '30px' }}></div>
        <Picker
          itemType="Info"
          title="사용할 세미나실 고르기"
          isMultiple={false}
          contents={seminaRoomContents}
          itemSetter={setSeminaRoom}
        />
        <div style={{ height: '15px' }}></div>
        <Text2Reg>
          인원 수와 시간에 따라 사용 가능한 세미나실이 다를 수 있어요.
        </Text2Reg>
      </ModalMainStyle>

      <ReservationButton
        isChecked={!(seminaRoom.length === 0)}
        onClick={() => {
          if (seminaRoom.length === 0) {
            return;
          }
          setIsSeminaRoomSelected(true);
        }}
      >
        세미나실 선택완료
      </ReservationButton>
    </>
  );
};

export default SelectSeminarRoomModal;

const ModalMainStyle = styled.div`
  padding: 3rem;
`;

const ModalHeader = styled.div`
  text-align: left;
  margin-bottom: 10px;
  ${TYPO.title1.Sb};
`;

const ReservationBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  margin-top: 20px;
`;

const ReservationDay = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  /* padding-bottom: 10px; */
  border-right: 1px solid #cccccc;
`;

const ReservationTime = styled.div`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  ${TYPO.caption.Md}
  border-right: 1px solid #cccccc;
`;

const ReservationRightText = styled.div`
  color: #999;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 20px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  border-left: 1px solid #cccccc;
`;

interface ReservationButtonProps {
  isChecked?: boolean;
  curScreen?: string;
}

const ReservationButton = styled.div<ReservationButtonProps>`
  bottom: 0;
  height: 53px;
  background-color: ${(props) =>
    props.curScreen === 'confirm'
      ? COLORS.primary
      : props.isChecked
        ? COLORS.primary
        : COLORS.grey3};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  ${TYPO.title3.Sb};
`;

const Text2Reg = styled.div`
  ${TYPO.text2.Reg};
  color: ${COLORS.grey3};
  text-align: start;
`;
