// import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import SelectSeminarRoomModal from './SeletSeminarRoomModal';
import { calculateEndTimeWithMinutes } from '@/utils/func/calculateEndTimeWithMinutes';
import ConfirmReservationModal from './ConfirmReservationModal';
import { CompanionProps } from '@/utils/types/Companion';
import { ReserveError } from '@/utils/types/ReserveError';

interface BProps {
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
}: BProps) => {
  const date = selectedSlots[0].slice(0, 10);

  const [isSeminaRoomSelected, setIsSeminaRoomSelected] =
    useState<boolean>(false);

  const [seminaRoom, setSeminaRoom] = useState<string[]>([]);

  const seminaRoomContents = semina.map((res) => {
    return { disabled: false, title: res };
  });

  const handleCloseModal = () => {
    setIsOpen(false);
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
  if (!isSeminaRoomSelected) {
    return (
      <Modal onClick={handleCloseModal}>
        <ModalView
          height="400px"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SelectSeminarRoomModal
            slotDay={slotDay}
            day={day}
            startTime={startTime}
            endTime={endTime}
            seminaRoom={seminaRoom}
            seminaRoomContents={seminaRoomContents}
            setSeminaRoom={setSeminaRoom}
            setIsSeminaRoomSelected={setIsSeminaRoomSelected}
          />
        </ModalView>
      </Modal>
    );
  } else {
    return (
      <Modal onClick={handleCloseModal}>
        <ModalView
          height="500px"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
          />
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
`;

const Modal = styled(Backdrop)`
  display: flex;
  text-align: center;
  flex-direction: column-reverse;
`;

interface ModalViewProps {
  height: string;
}

const ModalView = styled.div<ModalViewProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 15px 15px 0 0;
  max-width: 50rem;
  width: 100%;
  height: ${(props) => props.height};
  transition: height 0.5s ease;
`;
