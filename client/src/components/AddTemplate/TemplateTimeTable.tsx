import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom } from 'jotai';
import { templateAtom } from '.';
import Schedule from '../Timetable';
import { RoomData, WeeklyData } from '../Timetable/getTimeTable';
import { RESERVE_TIME } from '@/constants/reserveTime';
import { useRouter } from 'next/router';
import { EmptyDate } from '@/utils/EmptyDate';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import ReserveConfirmBottomModal from '../BottomModal/ReserveConfirm';
import { ROOM_USE_SECTION } from '@/constants/roomUseSection';
import { CompanionProps } from '@/utils/types/Companion';

const TemplateTimeTable = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [templateArr, setTemplateArr] = useState<MyTemplate[]>([]);
  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const Companions: CompanionProps[] = template.people.map((item) => {
    const { sId, info } = item;

    if (!info || !sId) {
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
      id: sId.toString(),
      alternativeId: info.sId,
    };
  });

  useEffect(() => {
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []);

  useEffect(() => {
    // templateArr가 변경될 때마다 로컬 스토리지에 업데이트
    localStorage.setItem('templateArr', JSON.stringify(templateArr));
    console.log(templateArr);
  }, [templateArr]);

  const handleSaveTemplate = () => {
    const newTemplate = {
      title: template.title,
      seminarType: template.seminarType,
      day: '목요일', // template.day,
      startTime: '13:00',
      finishTime: '14:00',
      people: template.people,
      semina: [1, 3, 4],
      usePerson: template.usePerson,
      type: template.type,
      time: template.time,
    };
    console.log(newTemplate);
    setTemplateArr((res) => [...res, newTemplate]);
    console.log('temparr', templateArr);
  };
  const isKeyOfReserveTime = (
    key: string,
  ): key is keyof typeof RESERVE_TIME => {
    return key in RESERVE_TIME;
  };
  const route = useRouter();

  const timeQuery = route.query.time as string;

  const [processData, setProcessData] = useState<WeeklyData[]>(EmptyDate);
  const [curProcessDataIdx, setCurProcessDataIdx] = useState<number>(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomData>();
  const [seminaRoom, setSeminaRoom] = useState<string[]>([]);

  const [isError, setIsError] = useState<ReserveError>({
    isError: false,
    errorMessage: '',
  });

  const time = isKeyOfReserveTime(timeQuery)
    ? RESERVE_TIME[timeQuery]
    : undefined;
  const [dates, setDates] = useState<string[]>([]);

  const roomMapping: { [key: number]: string[] } = {
    3: ['1', '2', '3', '4', '5', '6', '7'],
    4: ['1', '2', '3', '4', '5', '6', '7', '9'],
    5: ['1', '3', '4', '5', '6', '7', '9'],
    6: ['1', '3', '5', '6', '7', '9'],
    7: ['1', '7', '9'],
    8: ['1', '7', '9'],
  };

  return (
    <>
      <PageContainer>
        {/* TODO: 시간표 + 바텀모달 추가하기 */}
        <HeaderDiv>
          <HeaderEachDiv>
            <HeaderDivBoldText>사용시간</HeaderDivBoldText>
            <HeaderDivText>{template.time * 60}분</HeaderDivText>
          </HeaderEachDiv>
          <HeaderEachDiv>
            <HeaderDivBoldText>인원</HeaderDivBoldText>
            <HeaderDivText>{template.usePerson + 1}명</HeaderDivText>
          </HeaderEachDiv>
          <HeaderEachDiv>
            <HeaderDivBoldText>장소종류</HeaderDivBoldText>
            <HeaderDivText>{template.seminarType}</HeaderDivText>
          </HeaderEachDiv>
        </HeaderDiv>

        <CenterBox>
          <TableContainBox>
            <Schedule
              processData={processData}
              isOpenSeminar={template.seminarType === '개방형 세미나실'}
              curProcessDataIdx={0}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              curTime={String(template.time * 60)}
              dates={dates}
            />
          </TableContainBox>
        </CenterBox>
      </PageContainer>
      {isSelected && (
        <ReserveConfirmBottomModal
          type={ROOM_USE_SECTION[template.type]}
          setIsSuccess={setIsSuccess}
          setIsError={setIsError}
          semina={roomMapping[template.usePerson + 1]}
          setIsOpen={setIsSelected}
          selectedSlots={selectedSlots}
          companions={Companions}
        />
      )}
    </>
  );
};

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

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.7rem;
`;

const TableContainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 36rem;
`;

export default TemplateTimeTable;
