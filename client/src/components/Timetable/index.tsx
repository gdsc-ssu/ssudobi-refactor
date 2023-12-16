import styled from '@emotion/styled';
import { useState } from 'react';
import Lottie from 'lottie-react';
import loading from '@/assets/json/magnifying.json';
import { TYPO } from '@/styles/typo';

interface TimeSlot {
  [time: string]: boolean;
}
interface WeeklyData {
  [date: string]: TimeSlot;
}
interface TProps {
  processData: WeeklyData[];
  curProcessDataIdx: number;
  isOpenSeminar: boolean;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSlots: string[];

  setSelectedSlots: React.Dispatch<React.SetStateAction<string[]>>;
  curTime: string;
  dates: string[];
}

//[2-1] 시간표 불러오기 및 출력
const Schedule: React.FC<TProps> = ({
  processData,
  isOpenSeminar,
  isSelected,
  setIsSelected,
  selectedSlots,
  setSelectedSlots,
  curProcessDataIdx,
  curTime,
  dates,
}) => {
  const days = ['', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const [isDataAllFalse, setIsDataAllFalse] = useState(false);

  const SeminarTimes = [
    '10',
    ' ',
    '11',
    ' ',
    '12',
    ' ',
    '13',
    ' ',
    '14',
    ' ',
    '15',
    ' ',
    '16',
    ' ',
    '17',
    ' ',
    '18',
    ' ',
    '19',
    ' ',
    '20',
    ' ',
  ];

  const OpenSeminarTimes = [
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  if (processData.length === 0) {
    return (
      <LoadingContainer>
        <Lottie animationData={loading} autoPlay />
        <div style={{ height: '20px' }}></div>
        <LoadingText>세미나룸 예약 가능 시간을</LoadingText>
        <LoadingText>찾고있어요!</LoadingText>
      </LoadingContainer>
    );
  } else {
    return (
      <Container>
        <Table>
          <Thead>
            <TableTr>
              {days.map((day, idx) => {
                return <TableTh key={idx}>{day}</TableTh>;
              })}
            </TableTr>
            <TableTr>
              {dates.map((day, idx) => {
                return <TableTh key={idx}>{day}</TableTh>;
              })}
            </TableTr>
          </Thead>
          <BodyTable>
            {isOpenSeminar ? (
              OpenSeminarTimes.map((time, idx) => {
                return (
                  <TableTr key={idx}>
                    <TableTh>{time}&nbsp;</TableTh>
                    <TableTd isEmpty={true}>{}</TableTd>
                    <TableTd isEmpty={true}>{}</TableTd>
                    <TableTd isEmpty={false}>{}</TableTd>
                    <TableTd isEmpty={true}>{}</TableTd>
                    <TableTd isEmpty={false}>{}</TableTd>
                  </TableTr>
                );
              })
            ) : (
              <TableTr>
                <TableTh>
                  {SeminarTimes.map((time) => {
                    return <TableTimeBox key={time}>{time}</TableTimeBox>;
                  })}
                </TableTh>
                {isDataAllFalse ? (
                  <>
                    <TableTd
                      key="empty-1"
                      isEmpty={false}
                      style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        border: 'none',
                      }}
                    ></TableTd>
                    <TableTd
                      key="2001"
                      isEmpty={false}
                      style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        border: 'none',
                      }}
                    ></TableTd>
                    <TableTd
                      key="2002"
                      isEmpty={false}
                      style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        border: 'none',
                      }}
                    ></TableTd>
                    <TableTd
                      key="2003"
                      isEmpty={false}
                      style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        border: 'none',
                      }}
                    ></TableTd>
                    <TableTd
                      key="2004"
                      isEmpty={false}
                      style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        border: 'none',
                      }}
                    ></TableTd>

                    <EmptyTimeTableText>예약이 불가능해요</EmptyTimeTableText>
                  </>
                ) : (
                  <>
                    {Object.entries(processData[curProcessDataIdx]).map(
                      ([date, timeSlots], idx) => (
                        <TableTd key={idx} isEmpty={false}>
                          {Object.entries(timeSlots)
                            .sort(([timeA], [timeB]) =>
                              timeA.localeCompare(timeB),
                            )
                            .map(([time, value], idx) => {
                              const slotKey = `${date}-${time}`;
                              const isSlotSelected =
                                selectedSlots.includes(slotKey);
                              const nextSlots = Object.entries(timeSlots)
                                .sort(([timeA], [timeB]) =>
                                  timeA.localeCompare(timeB),
                                )
                                .slice(
                                  idx + 1,
                                  idx + Math.floor(parseInt(curTime) / 30),
                                )
                                .map(([time, nextValue]) => ({
                                  slot: `${date}-${time}`,
                                  value: nextValue,
                                }));

                              const isSelectable = nextSlots.every(
                                (slot) =>
                                  !selectedSlots.includes(slot.slot) &&
                                  slot.value,
                              );

                              return (
                                <DisplayBox
                                  key={slotKey}
                                  value={value}
                                  selected={isSlotSelected}
                                  type={idx}
                                  onClick={() => {
                                    if (!value) return;

                                    if (isSlotSelected) {
                                      setSelectedSlots([]);
                                    } else if (isSelectable) {
                                      if (isSelected) return;
                                      const newSelectedSlots = [
                                        slotKey,
                                        ...nextSlots.map((slot) => slot.slot),
                                      ];
                                      if (
                                        newSelectedSlots.length !==
                                        Math.floor(parseInt(curTime) / 30)
                                      ) {
                                        return;
                                      }
                                      setSelectedSlots(newSelectedSlots);
                                      setIsSelected((res: boolean) => !res);
                                    }
                                  }}
                                >
                                  &nbsp;
                                </DisplayBox>
                              );
                            })}
                        </TableTd>
                      ),
                    )}
                  </>
                )}
              </TableTr>
            )}
          </BodyTable>
        </Table>
        <DetailTextBox>예약할 시간을 선택해주세요</DetailTextBox>
      </Container>
    );
  }
};

export default Schedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTextBox = styled.div`
  color: #1d9bf0;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const Table = styled.table`
  border-spacing: 0;
  max-width: 36rem;
  width: 100%;
`;

const Thead = styled.thead``;

const TableTr = styled.tr``;

const TableTh = styled.th`
  font-size: 1.1rem;
  vertical-align: top;
`;

const DisplayBox = styled.div<{
  value: boolean;
  type: number;
  selected: boolean;
}>`
  height: 24px;
  border-bottom: ${(props) =>
    props.type % 2 === 1
      ? props.type === 23
        ? 'none'
        : '1px solid #b5b5b5 '
      : '1px dotted #b5b5b5'};
  background-color: ${(props) =>
    props.selected ? '#6ABCF5' : props.value ? '#D7EAFC' : 'white'};
`;

const TableTd = styled.div<{
  isEmpty: boolean;
}>`
  display: table-cell;
  background-color: ${(props) => (props.isEmpty ? '#D7EAFC' : 'white')};
  width: 6rem;
  border: 1px solid #b5b5b5;
`;

const TableTimeBox = styled.div`
  height: 24px;
  margin-top: -0.25px;
`;

const BodyTable = styled.tbody``;

const EmptyTimeTableText = styled.div`
  position: absolute;
  bottom: 50%;
  left: 40%;
  color: white;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  ${TYPO.text1.Md};
  margin: 0 auto;
`;
