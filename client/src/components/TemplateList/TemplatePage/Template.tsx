import { TemplateProps } from '../TemplateProps';
import * as styles from '../Common.styles';
import { COLORS } from '@/styles/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ReserveError } from '@/utils/types/ReserveError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';
import { flex } from '@/styles/tokens';
import { injectAnimation } from '@/styles/animations';
import { useTemplate, useTransition } from '@/hooks';
import Modal from '@/components/Modal';
import ReserveConfirmBottomModal from '@/components/BottomModal/ReserveConfirm';
import { ROOM_USE_SECTION } from '@/constants/roomUseSection';
import { CompanionProps } from '@/utils/types/Companion';
import ConfirmReservationModal from '@/components/BottomModal/ConfirmReservationModal';
import AuthApi from '@/apis/auth';
import { MyTemplate } from '@/@types/MyTemplate';
import { formatNextOccurrence } from '@/utils/func/templateTimeConverter';
import { WeekdayShort } from 'Template';

type ModalType = 'remove' | 'bottom' | 'confirm';

const initModalType = {
  remove: false,
  bottom: false,
  confirm: false,
};

const Template = ({
  selectedTemplate,
  uuid,
  title,
  day,
  beginTime,
  endTime,
  place,
  friends,
}: TemplateProps) => {
  const [templateArr, setTemplateArr] = useState<MyTemplate[]>([]);
  const { removeTemplate, handleRouteTemplate, handleReserveTemplate } =
    useTemplate();
  const { isTransition, isMount, handleOpen, handleClose } = useTransition(400);
  const [modalType, setModalType] = useState(initModalType);

  const handleModalOpen = (e: React.MouseEvent, type: ModalType) => {
    e.stopPropagation();
    setModalType((prev) => {
      return { ...prev, [type]: true };
    });
    handleOpen();
  };

  const handleOpenRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeTemplate(uuid);
    handleClose();
  };

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<ReserveError>({
    isError: false,
    errorMessage: '',
  });
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [companions, setCompanions] = useState<CompanionProps[]>([
    {
      name: '',
      memberNo: '',
      id: '',
      alternativeId: '',
    },
  ]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []);

  // 템플릿으로 예약하기
  const handleOnClickReserve = (e: React.MouseEvent) => {
    e.stopPropagation();
    const ReserveArr: MyTemplate[] = templateArr.filter(
      (e) => e.title == title,
    );
    const typeNumber = ['학습', '회의', '수업', '기타'];
    const authApi = new AuthApi();
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
    const { beginTime, endTime } = formatNextOccurrence(
      engDay[korDay.indexOf(ReserveArr[0].day)] as WeekdayShort,
      ReserveArr[0].startTime,
      ReserveArr[0].finishTime,
    );

    if (ReserveArr[0]?.people[0]?.id !== undefined) {
      console.log(
        'comp',
        ReserveArr[0].people.map((res) => res.id!),
      );
      authApi
        .reservation(
          String(ReserveArr[0].semina[0]),
          typeNumber.indexOf(ReserveArr[0].type),
          beginTime,
          endTime,
          ReserveArr[0].people.map((res) => res.info.alternativeId),
        )
        .then((res) => {
          if (res.success) {
            setIsSuccess(true);
          } else {
            setIsError({ isError: true, errorMessage: res.message });
          }
        });
    }
  };

  const roomMapping: { [key: number]: string[] } = {
    3: ['1', '2', '3', '4', '5', '6', '7'],
    4: ['1', '2', '3', '4', '5', '6', '7', '9'],
    5: ['1', '3', '4', '5', '6', '7', '9'],
    6: ['1', '3', '5', '6', '7', '9'],
    7: ['1', '7', '9'],
    8: ['1', '7', '9'],
  };

  useEffect(() => {
    if (selectedTemplate)
      setCompanions(
        selectedTemplate.people.map((item) => {
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
  }, [friends]);

  return (
    <>
      <styles.Container css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}>
        <InfoBox
          onClick={(e) => {
            handleModalOpen(e, 'bottom');
          }}
        >
          <styles.TitleBox onClick={handleOnClickReserve}>
            <div>{title}</div>
            <RemoveBox>
              <FontAwesomeIcon
                onClick={() => handleRouteTemplate('edit', selectedTemplate)}
                icon={faGear}
                css={css`
                  font-size: 1.6rem;
                  cursor: pointer;
                `}
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={(e) => handleModalOpen(e, 'remove')}
                css={css`
                  cursor: pointer;
                `}
              />
            </RemoveBox>
          </styles.TitleBox>
          <div>
            <styles.DateBox>
              {day + ' ' + beginTime + ' ~ ' + endTime}
            </styles.DateBox>
            <styles.PlaceBox>{place}</styles.PlaceBox>
            <styles.PeopleBox>
              {friends.map((el, idx) => {
                return (
                  <styles.PersonInfo key={idx}>
                    {el.info?.name} / {el.info?.sId}
                  </styles.PersonInfo>
                );
              })}
            </styles.PeopleBox>
          </div>
        </InfoBox>
        <SideLine />
      </styles.Container>
      {isMount && modalType.remove && (
        <Modal
          isTransition={isTransition}
          modalType="decision"
          title={title}
          message="템플릿을 정말 삭제할까요?"
          handleClose={handleClose}
          onClick={(e) => {
            handleOpenRemoveModal(e);
          }}
        />
      )}
      {/* {isMount && modalType.bottom && (
        <ConfirmReservationModal
          slotDay={selectedTemplate.day}
          day={selectedTemplate.day}
          startTime={selectedTemplate.startTime}
          endTime={selectedTemplate.finishTime}
          companions={companions}
          seminaRoom={selectedTemplate.semina.map(item => `${item}`)}
          type={}
          setIsSuccess={setIsSuccess}
          setIsError={setIsError}
          createType='reserve'
        />
      )} */}
    </>
  );
};

const RemoveBox = styled.div`
  margin-left: auto;
  ${flex('row', 'end', 'center', 1)}
  font-size: 2rem;
  gap: 0.6rem;
`;

const InfoBox = styled.div`
  width: 100%;
  background-color: ${COLORS.grey7};
  padding: 1.8rem 1.8rem 1.8rem 2.2rem;
  border-radius: 10px 0 0 10px;
`;

const SideLine = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 0 10px 10px 0;
  width: 5px;
`;

export default Template;
