import * as styles from '../Common.styles';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { Patron, TemplateInfo, WeekdayShort } from 'Template';
import {
  formatNextOccurrence,
  formatOnlyDate,
  formatSchedule,
} from '@/utils/func/templateTimeConverter';
import { useEffect, useState } from 'react';
import { useTransition } from '@/hooks';

import { MyTemplate } from '@/@types/MyTemplate';
import { MateItemType } from 'Mate';
import { CompanionProps } from '@/utils/types/Companion';
import ConfirmReservationModal from '@/components/BottomModal/ConfirmReservationModal';
import * as bottomStyles from '@/components/BottomModal/ReserveConfirm';
import { injectAnimation } from '@/styles/animations';
import { ReserveError } from '@/utils/types/ReserveError';
import ConfirmModal from '@/components/Modal/Confrim';
import { useRouter } from 'next/router';
import ReactPortal from '@/components/Modal/Portal';

type ModalType = 'remove' | 'bottom' | 'confirm';

const HomeTemplate = ({
  title,
  day,
  startTime,
  finishTime,
  seminarType,
  semina,
  people,
}: MyTemplate) => {
  const { pathname } = useRouter();
  const [isMax, setIsMax] = useState(false);
  const [patrons, setPatrons] = useState<string[]>([]);
  const [companions, setCompanions] = useState<CompanionProps[]>([
    {
      name: '',
      memberNo: '',
      id: '',
      alternativeId: '',
    },
  ]);
  const [modalType, setModalType] = useState<ModalType>('bottom');
  const { isTransition, isMount, handleOpen, handleClose } = useTransition(400);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<ReserveError>({
    isError: false,
    errorMessage: '',
  });

  const handleModalOpen = (e: React.MouseEvent, type: ModalType) => {
    e.stopPropagation();
    setModalType(type);
    handleOpen();
  };

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

  const [date, setDate] = useState<string>('');
  const korDay = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const engDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const typeNumber = ['학습', '회의', '수업', '기타'];

  const route = useRouter();
  const handleReserveSuccess = () => {
    route.replace('/schedule');
    setIsSuccess(false);
  };

  useEffect(() => {
    calculPatrons();
    setCompanions(
      people.map((item) => {
        const { id, info } = item;
        if (!info || !id) {
          return {
            name: '',
            memberNo: '',
            id: '',
            alternativeId: '',
          };
        }

        return {
          name: info.name,
          memberNo: info.sId,
          id: id.toString(),
          alternativeId: info.alternativeId,
        };
      }),
    );
  }, []);

  const handleOnClickBottomModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('isMoutnsaf', isMount, modalType);
    const { beginTime, endTime } = formatNextOccurrence(
      engDay[korDay.indexOf(day)] as WeekdayShort,
      startTime,
      finishTime,
    );
    setDate(beginTime);
  };

  function convertNumberArrayToStringArray(numbers: number[]): string[] {
    return numbers.map(String);
  }

  return (
    <>
      <InfoBox
        onClick={(e) => {
          handleModalOpen(e, 'bottom');
          handleOnClickBottomModalOpen(e);
        }}
      >
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
      {isMount && modalType === 'bottom' && (
        <ReactPortal wrapperId="modal-bottom-sheet">
          <bottomStyles.Modal
            css={
              isTransition &&
              injectAnimation('modalBackgroundDisappear', '0.4s', 'ease')
            }
            onClick={handleClose}
          >
            <bottomStyles.ModalView
              height="500px"
              style={{ marginBottom: pathname === '/' ? '0px' : '63px' }}
              css={
                isTransition &&
                injectAnimation('modalDisappear', '0.4s', 'ease')
              }
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ConfirmReservationModal
                slotDay={formatOnlyDate(date)}
                day={day}
                date={date.slice(0, 10)}
                startTime={startTime}
                endTime={finishTime}
                companions={companions}
                seminaRoom={convertNumberArrayToStringArray(semina)}
                type={typeNumber.indexOf(seminarType)}
                setIsSuccess={setIsSuccess}
                setIsError={setIsError}
                createType="reserve"
              />
            </bottomStyles.ModalView>
          </bottomStyles.Modal>
          {isSuccess && (
            <ConfirmModal
              onClick={handleReserveSuccess}
              title="예약이 완료되었습니다."
              message="예약 정보는 스케줄 탭에서 확인하세요!"
            />
          )}
        </ReactPortal>
      )}
    </>
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
