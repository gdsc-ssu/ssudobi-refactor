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
import { CompanionProps } from '@/utils/types/Companion';
import ConfirmReservationModal from '@/components/BottomModal/ConfirmReservationModal';
import { MyTemplate } from '@/@types/MyTemplate';
import {
  formatNextOccurrence,
  formatOnlyDate,
} from '@/utils/func/templateTimeConverter';
import { WeekdayShort } from 'Template';
import ConfirmModal from '@/components/Modal/Confrim';
import { useRouter } from 'next/router';
import * as bottomStyles from '@/components/BottomModal/ReserveConfirm';
import ReactPortal from '@/components/Modal/Portal';

type ModalType = 'remove' | 'bottom' | 'confirm';

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
  const [modalType, setModalType] = useState<ModalType>('bottom');
  const [date, setDate] = useState<string>('');

  const handleModalOpen = (e: React.MouseEvent, type: ModalType) => {
    e.stopPropagation();
    setModalType(type);
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
  const [companions, setCompanions] = useState<CompanionProps[]>([
    {
      name: '',
      memberNo: '',
      id: '',
      alternativeId: '',
    },
  ]);
  const typeNumber = ['학습', '회의', '수업', '기타'];

  useEffect(() => {
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []);
  const [selectTemplate, setSelectTemplate] = useState<MyTemplate[]>();

  const handleOnClickBottomModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const ReserveArr: MyTemplate[] = templateArr.filter(
      (e) => e.title == title,
    );
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

    setDate(beginTime);
    setSelectTemplate(ReserveArr);
  };

  const route = useRouter();
  const handleReserveSuccess = () => {
    route.replace('/schedule');
    setIsSuccess(false);
  };
  const handleReserveError = () => {
    setIsError({ isError: false, errorMessage: '' });
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
            alternativeId: info.alternativeId,
          };
        }),
      );
  }, [friends]);

  return (
    <>
      <styles.Container css={injectAnimation('fadeInTopDown', '0.5s', 'ease')}>
        <InfoBox>
          <styles.TitleBox>
            <div
              onClick={(e) => {
                handleModalOpen(e, 'bottom');
                handleOnClickBottomModalOpen(e);
              }}
            >
              {title}
            </div>
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
          <div
            onClick={(e) => {
              handleModalOpen(e, 'bottom');
              handleOnClickBottomModalOpen(e);
            }}
          >
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
      {isMount && modalType === 'remove' && (
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
                day={selectedTemplate.day}
                date={date.slice(0, 10)}
                startTime={beginTime}
                endTime={endTime}
                companions={companions}
                seminaRoom={selectedTemplate.semina.map((item) => `${item}`)}
                type={typeNumber.indexOf(selectTemplate![0].type)}
                setIsSuccess={setIsSuccess}
                setIsError={setIsError}
                createType="reserve"
                handleClose={handleClose}
              />
            </bottomStyles.ModalView>
          </bottomStyles.Modal>
        </ReactPortal>
      )}
      {isSuccess && (
        <ReactPortal wrapperId="confirm-success-modal">
          <ConfirmModal
            onClick={handleReserveSuccess}
            title="예약이 완료되었습니다."
            message="예약 정보는 스케줄 탭에서 확인하세요!"
          />
        </ReactPortal>
      )}
      {isError.isError && (
        <ConfirmModal
          onClick={handleReserveError}
          title="예약에 실패하였습니다."
          message={isError.errorMessage}
        />
      )}
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
