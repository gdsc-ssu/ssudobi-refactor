import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom } from 'jotai';
import { templateAtom } from '.';
import Schedule from '../Timetable';
import { WeeklyData } from '../Timetable/getTimeTable';
import { RESERVE_TIME } from '@/constants/reserveTime';
import { useRouter } from 'next/router';
import { EmptyDate } from '@/utils/EmptyDate';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { TYPO } from '@/styles/typo';
import ReserveConfirmBottomModal from '../BottomModal/ReserveConfirm';
import { ROOM_USE_SECTION } from '@/constants/roomUseSection';
import { CompanionProps } from '@/utils/types/Companion';
import ConfirmModal from '../Modal/Confrim';

const TemplateTimeTable = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [templateArr, setTemplateArr] = useState<MyTemplate[]>([]);
  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);
  const [companions, setCompanions] = useState<CompanionProps[]>([
    {
      name: '',
      memberNo: '',
      id: '',
      alternativeId: '',
    },
  ]);

  useEffect(() => {
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []);

  useEffect(() => {
    setCompanions(
      template.people.map((item) => {
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
          alternativeId: info.sId,
        };
      }),
    );
  }, [template.people]);

  useEffect(() => {
    // templateArr가 변경될 때마다 로컬 스토리지에 업데이트
    localStorage.setItem('templateArr', JSON.stringify(templateArr));
  }, [templateArr]);

  const isKeyOfReserveTime = (
    key: string,
  ): key is keyof typeof RESERVE_TIME => {
    return key in RESERVE_TIME;
  };
  const route = useRouter();
  const [processData, setProcessData] = useState<WeeklyData[]>(EmptyDate);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<ReserveError>({
    isError: false,
    errorMessage: '',
  });
  const [dates, setDates] = useState<string[]>([]);

  const roomMapping: { [key: number]: string[] } = {
    3: ['1', '2', '3', '4', '5', '6', '7'],
    4: ['1', '2', '3', '4', '5', '6', '7', '9'],
    5: ['1', '3', '4', '5', '6', '7', '9'],
    6: ['1', '3', '5', '6', '7', '9'],
    7: ['1', '7', '9'],
    8: ['1', '7', '9'],
  };
  const handleTemplateError = () => {
    setIsError({ isError: false, errorMessage: '' });
    setIsSelected(false);
  };

  const handleTemplateSuccess = () => {
    setIsSuccess(false);
    route.push('/template');
  };

  return (
    <>
      <PageContainer>
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
          companions={companions}
        />
      )}
      {isSuccess && (
        <ConfirmModal
          onClick={handleTemplateSuccess}
          title="템플릿이 추가되었습니다."
          message="템플릿 정보는 템플릿 탭에서 확인하세요!"
        />
      )}
      {isError.isError && (
        <ConfirmModal
          onClick={handleTemplateError}
          title="예약에 실패하였습니다."
          message={isError.errorMessage}
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
