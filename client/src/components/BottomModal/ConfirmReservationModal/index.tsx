import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import { calculateEndTimeWithMinutes } from '@/utils/func/calculateEndTimeWithMinutes';
import Companion from '@/components/CompanionsList/Companion';
import AuthApi from '@/apis/auth';
import { CompanionProps } from '@/utils/types/Companion';
import { ReserveError } from '@/utils/types/ReserveError';
import { useTemplate } from '@/hooks';
import { makeTemplateState } from '@/atoms/templateState';
import { useAtom } from 'jotai';
import { editingState } from '@/atoms/editingState';

interface ConfirmReservationModalProps {
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
   * 동반이용자들
   */
  companions: CompanionProps[];
  /**
   * 세미나실
   */
  seminaRoom: string[];
  /**
   * 사용 용도
   */
  type: number;
  /**
   * 날짜
   */
  date: string;
  /**
   * 성공 시 플래그 상태변환 함수
   */
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  /**
   * 실패 시 플래그 상태변환 함수
   */
  setIsError: Dispatch<SetStateAction<ReserveError>>;
  // 템플릿용인지 예약용인지
  createType: 'template' | 'reserve';
  handleClose?: () => void;
}

const ConfirmReservationModal = ({
  slotDay,
  day,
  startTime,
  endTime,
  companions,
  seminaRoom,
  type,
  date,
  setIsSuccess,
  setIsError,
  createType,
  handleClose,
}: ConfirmReservationModalProps) => {
  const { template, settingReservationInfo } = useTemplate();
  const [checkbox, setCheckBox] = useAtom(makeTemplateState);
  function getDayOfWeek(inputDate: string): string {
    const currentDate = new Date();
    const inputYear = currentDate.getFullYear();
    const formattedDate = `${inputYear}-${inputDate}`;

    const daysOfWeek = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const dateObject = new Date(formattedDate);

    if (isNaN(dateObject.getTime())) {
      return '유효하지 않은 날짜';
    }

    const dayIndex = dateObject.getDay();
    const dayOfWeek = daysOfWeek[dayIndex];

    return dayOfWeek;
  }

  useEffect(() => {
    if (createType === 'template')
      settingReservationInfo(
        slotDay,
        startTime,
        endTime,
        seminaRoom.map(Number),
      );
    if (checkbox) {
      settingReservationInfo(getDayOfWeek(slotDay), startTime, endTime, [
        Number(seminaRoom[0].slice(0, 1)),
      ]);
    }
  }, [seminaRoom]);

  return (
    <>
      <ModalMainStyle>
        <ModalHeader>
          세미나룸 {createType === 'reserve' ? ' 예약을 ' : ' 템플릿 저장을 '}
          확정하시겠어요?
        </ModalHeader>
        {createType === 'reserve' && (
          <>
            <BodyText>슈도비에서 언제든지 예약을 취소할 수 있어요.</BodyText>
            <BodyText>만약 방문이 어렵다면, 꼭 예약을 취소해주세요!</BodyText>
          </>
        )}
        <ReservationBox>
          <ReservationDay>
            {slotDay} {createType === 'reserve' && day}
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
            )}
            퇴실 권장
          </ReservationRightText>
        </ReservationBox>
      </ModalMainStyle>
      <CompanionsListContainer>
        {companions.map((res) => {
          return (
            <Companion
              key={res.id}
              id={res.id}
              name={res.name}
              isSelected={false}
              memberNo={res.memberNo}
              onClick={() => {}}
            />
          );
        })}
      </CompanionsListContainer>
      <ReservationButton
        curScreen="confirm"
        onClick={() => {
          if (createType === 'reserve') {
            const authApi = new AuthApi();
            authApi
              .reservation(
                seminaRoom[0].replace(/[^0-9]/g, ''),
                type,
                `${date} ${startTime}`,
                `${date} ${endTime}`,
                companions.map((res) => res.alternativeId),
              )
              .then((res) => {
                if (res.success) {
                  setIsSuccess(true);
                  if (handleClose) handleClose();
                } else {
                  if (handleClose) handleClose();
                  setIsError({ isError: true, errorMessage: res.message });
                }
              });
            setCheckBox(false);
          } else {
            setIsSuccess(true);
            if (handleClose) handleClose();
          }
        }}
      >
        {createType === 'reserve' ? '예약하기' : ' 템플릿 저장하기'}
      </ReservationButton>
    </>
  );
};

export default ConfirmReservationModal;

const ModalMainStyle = styled.div`
  padding: 3rem;
`;

const ModalHeader = styled.div`
  text-align: left;
  margin-bottom: 10px;
  ${TYPO.title1.Sb};
`;

interface BodyTextProps {
  color?: string;
}

const BodyText = styled.div<BodyTextProps>`
  color: ${(props) =>
    props.color === 'red'
      ? COLORS.negative
      : props.color === 'blue'
      ? COLORS.primary
      : '#444'};
  text-align: left;
  ${TYPO.text1.Reg};
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
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  padding-top: 10px;
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

const CompanionsListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${COLORS.grey8};
`;
