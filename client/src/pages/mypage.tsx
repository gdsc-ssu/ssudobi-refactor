import { seos } from '@/assets/seos';
import Modal from '@/components/Modal';
import { MenuBox, ProfileBox } from '@/components/Profile';
import Seo from '@/components/Seo';
import { useAuth, useHeader, useTransition } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { PageContainer, flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect, useState } from 'react';

const config = {
  title: '',
  message: '',
  onClick: () => {},
  handleClose: () => {},
};

/**
 * 마이페이지
 */
const Mypage = () => {
  const { setHeader } = useHeader();
  const { authInfo, handleLogout } = useAuth();
  const { handleOpen, handleClose, isTransition, isMount } = useTransition(300);
  const [modalConfig, setModalCofig] = useState(config);

  const policyMenus = [
    {
      title: '서비스 이용 약관',
      onClick: () => {},
    },
    {
      title: '개인정보 처리 방침',
      onClick: () => {},
    },
  ];

  const infoMenus = [
    {
      title: '버전 정보',
      onClick: () => {},
    },
    {
      title: '개발자 정보',
      onClick: () => {},
    },
  ];

  const authMenus = [
    {
      title: '문의하기',
      onClick: () => {},
    },
    {
      title: '로그아웃',
      onClick: () => {
        setModalCofig({
          title: '로그아웃 하시겠습니까?',
          message: '언제든 다시 돌아와주세요!',
          onClick: handleLogout,
          handleClose,
        });
        handleOpen();
      },
    },
  ];

  useLayoutEffect(() => {
    setHeader('마이페이지');
  }, []);

  return (
    <PageContainer css={pageStyle}>
      <Seo {...seos.mypage} />
      <ProfileBox
        name={authInfo?.name || ''}
        memberNo={authInfo?.sId || ''}
        css={paddingStyle}
      />
      <Line />
      {policyMenus.map(MenuBox)}
      <Line />
      {infoMenus.map(MenuBox)}
      <Line />
      {authMenus.map(MenuBox)}
      {isMount && (
        <Modal
          {...modalConfig}
          modalType="decision"
          isTransition={isTransition}
        />
      )}
    </PageContainer>
  );
};

const pageStyle = css`
  width: 100%;
  ${flex('column', 'start', 'start', 0)};
`;

const paddingStyle = css`
  padding: 3rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS.grey65};
`;

export default Mypage;
