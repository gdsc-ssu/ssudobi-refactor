import { MateItemType } from 'Mate';
import { ComponentProps, useMemo } from 'react';
import { MateBox, boxStyle, lineStyles, logoStyle } from './common';
import { companionIconGetter } from '@/utils/func/companionIconGetter';
import styled from '@emotion/styled';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { KitType } from '.';
import { useTransition } from '@/hooks';
import Modal from '@/components/Modal';

interface Props extends ComponentProps<'div'> {
  info: MateItemType;
  kitType: KitType;
  removeMate: (info: MateItemType) => void;
  selected?: boolean;
}

const MateLine = ({ info, kitType, removeMate, selected, ...props }: Props) => {
  const ProfileIcon = useMemo(() => {
    return companionIconGetter();
  }, []);
  const { isMount, isTransition, handleOpen, handleClose } = useTransition();

  const modalConfig = {
    title: '메이트를 정말 삭제하시겠습니까?',
    message: '삭제한 메이트는 복구할 수 없습니다.',
    onClick: () => removeMate(info),
    handleClose,
  };

  return (
    <MateBox
      css={[
        lineStyles.both,
        boxStyle.mate,
        boxStyle[kitType],
        selected && boxStyle.selected,
      ]}
      {...props}
    >
      <ProfileIcon css={logoStyle} />
      <InfoWrapper>
        <span css={textStyles.name}>{info.info.name}</span>
        <span css={textStyles.id}>{info.info.sId}</span>
      </InfoWrapper>
      {kitType === 'removable' && (
        <FontAwesomeIcon icon={faX} css={textStyles.x} onClick={handleOpen} />
      )}
      {isMount && (
        <Modal
          {...modalConfig}
          modalType="decision"
          isTransition={isTransition}
        />
      )}
    </MateBox>
  );
};

const InfoWrapper = styled.div`
  flex: 1;
  ${flex('column', 'center', 'start', 0.2)};
`;

const textStyles = {
  name: css`
    ${TYPO.caption.Reg};
    color: ${COLORS.grey0};
  `,
  id: css`
    ${TYPO.text2.Reg};
    color: ${COLORS.grey1};
  `,
  x: css`
    color: ${COLORS.grey3};
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
  `,
};

export default MateLine;
