import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TYPO } from '@/styles/typo';
import { ComponentProps } from 'react';
import { COLORS } from '@/styles/colors';
import { flex, transition } from '@/styles/tokens';
import CloseButton from '@/assets/svg/x-button.svg';
import { companionIconGetter } from '@/utils/func/companionIconGetter';

interface ModalProps extends ComponentProps<'div'> {
  /**
   * 이름
   */
  name: string;
  /**
   * 학번
   */
  memberNo: string;
  /**
   * 도서관 id
   */
  id: string;
  /**
   * 선택 여부
   */
  isSelected: boolean;
  /**
   * 제거 가능 여부
   */
  isRemovable?: boolean;
  /**
   * 클릭 시 해당 요소 상태 변경 함수
   */
  onClick: () => void;
}

const Companion = ({
  name,
  id,
  memberNo,
  isSelected,
  isRemovable,
  onClick,
  ...props
}: ModalProps) => {
  const ProfileIcon = companionIconGetter();

  const getContainerStyle = () => {
    if (isSelected) return containerStyle.selected;
    else return containerStyle.selectable;
  };

  return (
    <Container
      onClick={onClick}
      isSelected={isSelected}
      css={getContainerStyle}
      {...props}
    >
      <ProfileWrapper>
        <ProfileIcon css={logoStyle} />
        <Profile>
          <span css={TYPO.title3.Md}>{name}</span>
          <span css={TYPO.caption.Reg}>{memberNo}</span>
        </Profile>
      </ProfileWrapper>
      {isRemovable && <CloseButton />}
    </Container>
  );
};

const Container = styled.div<{ isSelected: boolean }>`
  min-width: 25rem;
  padding: 1.5rem 3rem;
  ${flex('row', 'between', 'center', 0)};
  ${transition('0.2s', 'linear')};

  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  flex: 1;
  ${flex('row', 'start', 'center', 0)};
`;

const Profile = styled.div`
  margin-left: 1.5rem;
  ${flex('column', 'start', 'start', 0)};
`;

const logoStyle = css`
  width: 3.5rem;
  height: 3.5rem;
`;

const containerStyle = {
  selectable: css`
    background-color: ${COLORS.grey8};

    &:hover {
      background-color: ${COLORS.grey6};
    }
  `,
  selected: css`
    background-color: ${COLORS.primaryWeak};
  `,
};

export default Companion;
