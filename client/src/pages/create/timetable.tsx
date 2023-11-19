import { NavHeader } from '@/components/Layouts/Header';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  processAvailabilityData,
  getTimeTable,
  WeeklyData,
  RoomData,
} from '@/components/Timetable/getTimeTable';
import Schedule from '@/components/Timetable';
import ReserveConfirmBottomModal from '@/components/BottomModal/ReserveConfirm';
import LeftArrow from '@/assets/svg/leftArrow.svg';
import RightArrow from '@/assets/svg/rightArrow.svg';

import { RESERVE_TIME } from '@/constants/reserveTime';
import { ROOM_USE_SECTION } from '@/constants/roomUseSection';
import { SEMINA_AVAILABLE_PEOPLE } from '@/constants/seminaAvailablePeople';
import { CompanionProps } from '@/utils/types/Companion';
import { ReserveError } from '@/utils/types/ReserveError';
import ConfirmModal from '@/components/Modal/Confrim';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';

const Timetable = () => {
  const isKeyOfReserveTime = (
    key: string,
  ): key is keyof typeof RESERVE_TIME => {
    return key in RESERVE_TIME;
  };

  const route = useRouter();
  const timeQuery = route.query.time as string;
  const useCaseQuery = route.query.useCase as string;
  const { companions } = route.query;
  const [curCompanions, setCurCompanions] = useState<CompanionProps[]>([]);
  const [personCount, setPersonCount] = useState<number>(0);
  // URI 디코딩 후 JSON 파싱

  const time = isKeyOfReserveTime(timeQuery)
    ? RESERVE_TIME[timeQuery]
    : undefined;

  const [isOpenSeminar, setIsOpenSeminar] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomData>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<ReserveError>({
    isError: false,
    errorMessage: '',
  });

  const [curProcessDataIdx, setCurProcessDataIdx] = useState<number>(0);

  const [processData, setProcessData] = useState<WeeklyData[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const [seminaRoom, setSeminaRoom] = useState<string[]>([]);

  async function getScheduleData(curSemina: string[]) {
    const roomdata = await getTimeTable();
    if (roomdata === undefined) return;
    setRoomData(roomdata as RoomData);
    const pr = processAvailabilityData(roomdata, curSemina);
    console.log(pr);
    setProcessData(pr);
  }

  const getDays = () => {
    if (
      processData === null ||
      processData === undefined ||
      processData.length <= curProcessDataIdx
    )
      return;
    if (processData && processData[curProcessDataIdx]) {
      const curDataKeys = Object.keys(processData[curProcessDataIdx]);
      const newDates = curDataKeys.map((res) => {
        const curdates = new Date(res);
        return `${curdates.getDate()}`;
      });
      newDates.unshift('');
      setDates(newDates);
    }
  };
  function getAvailableSeminarRooms(
    data: RoomData,
    date: string,
    startTime: number,
    endTime: number,
    numberOfPeople: number,
    isOpenSeminaRoom: boolean,
  ): string[] {
    const availableRooms = [];
    console.log('data', data);
    for (const [room, timeRanges] of Object.entries(data[date])) {
      console.log('aaa', room, timeRanges);
      // 세미나실이 예약되어 있지 않은 경우
      if (isOpenSeminaRoom && parseInt(room) < 10) {
        continue;
      }
      if (!isOpenSeminaRoom && parseInt(room) > 10) {
        continue;
      }

      // 해당 세미나실의 사용 가능 인원 확인
      const availablePeople = SEMINA_AVAILABLE_PEOPLE[parseInt(room)];
      if (!availablePeople || !availablePeople.includes(numberOfPeople)) {
        continue;
      }

      if (timeRanges === null) {
        availableRooms.push(room + '번');
      } else {
        // 예약된 시간대와 겹치지 않는지 확인
        let isAvailable = true;
        for (const [reservedStartTime, reservedEndTime] of timeRanges) {
          console.log(timeRanges);
          console.log(startTime, reservedStartTime, endTime, reservedEndTime);
          if (
            (startTime >= reservedStartTime && startTime < reservedEndTime) ||
            (endTime > reservedStartTime && endTime <= reservedEndTime) ||
            (startTime <= reservedStartTime && endTime >= reservedEndTime)
          ) {
            isAvailable = false;
            break;
          }
        }
        if (isAvailable) {
          availableRooms.push(room + '번');
        }
      }
    }
    return availableRooms;
  }

  useEffect(() => {
    getDays();
  }, [processData, curProcessDataIdx]);

  useEffect(() => {
    if (!curCompanions) return;
    setPersonCount(curCompanions.length);
  }, [curCompanions]);

  useEffect(() => {
    getScheduleData([]);
  }, [selectedSlots]);

  const handleReserveError = () => {
    setIsError({ isError: false, errorMessage: '' });
    setIsSelected(false);
  };

  const handleReserveSuccess = () => {
    setIsSuccess(false);
  };

  useEffect(() => {
    if (roomData === undefined) return;
    if (selectedSlots.length === 0) return;
    console.log(
      selectedSlots[selectedSlots.length - 1].split('-')[3].slice(0, 2),
    );
    const availableRooms = getAvailableSeminarRooms(
      roomData,
      selectedSlots[0].slice(0, 10),
      parseInt(selectedSlots[0].split('-')[3].slice(0, 2)),
      parseInt(
        selectedSlots[selectedSlots.length - 1].split('-')[3].slice(0, 2),
      ),
      personCount + 1,
      false,
    );
    setSeminaRoom(availableRooms);
    console.log(availableRooms);
  }, [roomData]);

  useEffect(() => {
    if (companions) {
      const decodedCompanions = decodeURIComponent(companions as string);
      const parseCompanions = JSON.parse(decodedCompanions);
      setCurCompanions(parseCompanions);
    }
  }, []);

  const clickRightArrowBtn = () => {
    if (processData.length - 1 === curProcessDataIdx) return;
    setCurProcessDataIdx((res) => res + 1);
  };
  const clickLeftArrowBtn = () => {
    if (processData.length === 0) return;
    setCurProcessDataIdx((res) => res - 1);
  };

  return (
    <Container>
      <NavHeader title="예약하기" />
      <HeaderDiv>
        <HeaderEachDiv>
          <HeaderDivBoldText>사용시간</HeaderDivBoldText>
          <HeaderDivText>{time}분</HeaderDivText>
        </HeaderEachDiv>
        <HeaderEachDiv>
          <HeaderDivBoldText>인원</HeaderDivBoldText>
          <HeaderDivText>{personCount}명</HeaderDivText>
        </HeaderEachDiv>
        <HeaderEachDiv>
          <HeaderDivBoldText>장소종류</HeaderDivBoldText>
          <HeaderDivText>세미나실</HeaderDivText>
        </HeaderEachDiv>
      </HeaderDiv>
      <Main>
        <CenterBox>
          <LeftBox>
            {curProcessDataIdx === 0 ? (
              <div style={{ width: '30px' }}></div>
            ) : (
              <ArrowBox>
                <LeftArrow onClick={clickLeftArrowBtn} />
              </ArrowBox>
            )}
          </LeftBox>
          <TableContainBox>
            <Schedule
              processData={processData}
              isOpenSeminar={isOpenSeminar}
              curProcessDataIdx={curProcessDataIdx}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              curTime={time as string}
              dates={dates}
            />
          </TableContainBox>
          <RightBox>
            {processData.length === 0 ||
            curProcessDataIdx === processData.length - 1 ? (
              <div style={{ width: '30px' }}></div>
            ) : (
              <ArrowBox>
                <RightArrow onClick={clickRightArrowBtn} />
              </ArrowBox>
            )}
          </RightBox>
        </CenterBox>
      </Main>
      {isSelected && !isSuccess && !isError.isError && (
        <ReserveConfirmBottomModal
          type={ROOM_USE_SECTION[useCaseQuery]}
          setIsSuccess={setIsSuccess}
          setIsError={setIsError}
          semina={seminaRoom}
          setIsOpen={setIsSelected}
          selectedSlots={selectedSlots}
          companions={curCompanions}
        />
      )}
      {isSuccess && (
        <ConfirmModal
          onClick={handleReserveSuccess}
          title="예약이 완료되었습니다."
          message="예약 정보는 스케줄 탭에서 확인하세요!"
        />
      )}
      {isError.isError && (
        <ConfirmModal
          onClick={handleReserveError}
          title="예약에 실패하였습니다."
          message={isError.errorMessage}
        />
      )}
    </Container>
  );
};

export default Timetable;

const Container = styled.div`
  position: relative;
  margin: 6rem auto;
`;

const Main = styled.main`
  width: 100%;
  padding: 1rem 0 0 0;
  height: 100%;
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.7rem;
`;

const LeftBox = styled.div`
  display: flex;
  margin: auto 0.5rem auto 0;
`;

const RightBox = styled.div`
  display: flex;
  margin: auto 0 auto 0.5rem;
`;

const TableContainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 36rem;
`;

// const FilterChild = styled.div`
//   margin-top: 24px;
//   margin-bottom: 20px;
// `;
const ArrowBox = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderDiv = styled.div`
  width: 100%;
  padding: 15px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
  background: #feffff;
`;

const HeaderEachDiv = styled.div`
  display: flex;
  /* justify-content: ; */
  align-items: center;
`;

const HeaderDivBoldText = styled.div`
  ${TYPO.text1.Lg}
  ${COLORS.grey0}
`;

const HeaderDivText = styled.div`
  ${TYPO.text1.Lg}
  color:#ccc;
  margin-left: 10px;
`;
