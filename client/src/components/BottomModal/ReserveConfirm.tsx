// import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import SelectSeminarRoomModal from './SeletSeminarRoomModal';
import { calculateEndTimeWithMinutes } from '@/utils/func/calculateEndTimeWithMinutes';
import ConfirmReservationModal from './ConfirmReservationModal';
import { CompanionProps } from '@/utils/types/Companion';
import { ReserveError } from '@/utils/types/ReserveError';
import { injectAnimation } from '@/styles/animations';

interface BProps extends ComponentProps<'div'> {
  setIsOpen: (isOpen: boolean) => void;
  selectedSlots: string[];
  semina: string[];
  type: number;
  companions: CompanionProps[];
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<ReserveError>>;
}

const ReserveConfirmBottomModal = ({
  setIsOpen,
  selectedSlots,
  semina,
  type,
  companions,
  setIsSuccess,
  setIsError,
  ...props
}: BProps) => {
  let timeoutId: NodeJS.Timeout | null = null;
  const date = selectedSlots[0].slice(0, 10);

  const [isSeminaRoomSelected, setIsSeminaRoomSelected] =
    useState<boolean>(false);

  const [seminaRoom, setSeminaRoom] = useState<string[]>([]);
  const [isTransition, setIsTransition] = useState<boolean>(false);

  const seminaRoomContents = useCallback(() => {
    if (semina)
      return semina.map((res) => {
        return { disabled: false, title: res };
      });
    else return [];
  }, [semina]);

  const handleClose = () => {
    if (isTransition) return;

    setIsTransition(true);
    timeoutId = setTimeout(() => {
      setIsTransition(false);
      setIsOpen(false);
    }, 400);
  };

  const day = getDayOfWeek(
    selectedSlots[0].split('-')[0] +
      '-' +
      selectedSlots[0].split('-')[1] +
      '-' +
      selectedSlots[0].split('-')[2],
  );

  const slotDay =
    selectedSlots[0].split('-')[1] + '-' + selectedSlots[0].split('-')[2];

  const startTime =
    selectedSlots[0].split('-')[3].slice(0, 2) +
    ':' +
    selectedSlots[0].split('-')[3].slice(2);
  const endTime = calculateEndTimeWithMinutes(
    selectedSlots[selectedSlots.length - 1].split('-')[3],
    30,
  );
  function getDayOfWeek(dateString: string) {
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const date = new Date(dateString);
    return days[date.getUTCDay()];
  }
  const getTemplateDayOfWeek = (number: string): string => {
    switch (number) {
      case '1':
        return '월요일';
      case '2':
        return '화요일';
      case '3':
        return '수요일';
      case '4':
        return '목요일';
      case '5':
        return '금요일';
      case '6':
        return '토요일';
      default:
        throw new Error('Invalid day number.');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!isSeminaRoomSelected) {
    return (
      <Modal
        css={
          isTransition &&
          injectAnimation('modalBackgroundDisappear', '0.4s', 'ease')
        }
        onClick={handleClose}
      >
        <ModalView
          height="400px"
          onClick={(e) => {
            e.stopPropagation();
          }}
          css={
            isTransition && injectAnimation('modalDisappear', '0.4s', 'ease')
          }
          {...props}
        >
          {date.slice(8, 10) === '00' ? (
            <SelectSeminarRoomModal
              slotDay={getTemplateDayOfWeek(date.slice(6, 7))}
              day={day}
              startTime={startTime}
              endTime={endTime}
              seminaRoom={seminaRoom}
              seminaRoomContents={seminaRoomContents()}
              setSeminaRoom={setSeminaRoom}
              setIsSeminaRoomSelected={setIsSeminaRoomSelected}
              type="template"
            />
          ) : (
            <SelectSeminarRoomModal
              slotDay={slotDay}
              day={day}
              startTime={startTime}
              endTime={endTime}
              seminaRoom={seminaRoom}
              seminaRoomContents={seminaRoomContents()}
              setSeminaRoom={setSeminaRoom}
              setIsSeminaRoomSelected={setIsSeminaRoomSelected}
              type="reserve"
            />
          )}
        </ModalView>
      </Modal>
    );
  } else {
    return (
      <Modal
        css={
          isTransition &&
          injectAnimation('modalBackgroundDisappear', '0.4s', 'ease')
        }
        onClick={handleClose}
      >
        <ModalView
          height="500px"
          css={
            isTransition && injectAnimation('modalDisappear', '0.4s', 'ease')
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {date.slice(8, 10) === '00' ? (
            <ConfirmReservationModal
              slotDay={getTemplateDayOfWeek(date.slice(6, 7))}
              day={day}
              startTime={startTime}
              endTime={endTime}
              seminaRoom={seminaRoom}
              companions={companions}
              type={type}
              date={date}
              setIsSuccess={setIsSuccess}
              setIsError={setIsError}
              createType="template"
            />
          ) : (
            <ConfirmReservationModal
              slotDay={slotDay}
              day={day}
              startTime={startTime}
              endTime={endTime}
              seminaRoom={seminaRoom}
              companions={companions}
              type={type}
              date={date}
              setIsSuccess={setIsSuccess}
              setIsError={setIsError}
              createType="reserve"
            />
          )}
        </ModalView>
      </Modal>
    );
  }
};

export default ReserveConfirmBottomModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  ${injectAnimation('modalBackgroundAppear', '0.4s', 'ease')};
`;

export const Modal = styled(Backdrop)`
  display: flex;
  text-align: center;
  flex-direction: column-reverse;
`;

interface ModalViewProps {
  height: string;
}

export const ModalView = styled.div<ModalViewProps>`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 15px 15px 0 0;
  max-width: 50rem;
  width: 100%;
  height: ${(props) => props.height};
  transition: height 0.5s ease;
  ${injectAnimation('modalAppear', '0.5s', 'ease')};
`;
