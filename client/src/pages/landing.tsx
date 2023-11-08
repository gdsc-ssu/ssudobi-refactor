import { RoundButton } from '@/components/Buttons';
import { Circle } from '@/components/Login';
import { useVh } from '@/hooks';
import { injectAnimation } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { flex, transform } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

/**
 * 시작 페이지
 */
const Landing = () => {
  const { fullPageStyle } = useVh();
  const route = useRouter();

  const handleRouteLogin = () => {
    route.push('login');
  };

  return (
    <Container css={fullPageStyle()}>
      <TitleWrapper>
        <span css={TYPO.title1.Eb}>SSUDOBI</span>
        <span css={TYPO.title2.Reg}>숭실대학교 도서관 비대면 예약 시스템</span>
      </TitleWrapper>
      <ButtonWrapper>
        <RoundButton
          title="시작하기"
          theme="white"
          onClick={handleRouteLogin}
        />
        <Caption>{`로그인 시, 개인 정보 처리 방침 및\n서비스 이용 약관에 동의하게 됩니다.`}</Caption>
      </ButtonWrapper>
      <Circle css={[circleStyles.common, circleStyles.top]} />
      <Circle css={[circleStyles.common, circleStyles.bottom]} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${COLORS.primary};
  position: relative;
`;

const TitleWrapper = styled.div`
  ${flex('column', 'center', 'center', 1.4)};
  cursor: default;

  color: white;
  text-align: center;
  white-space: nowrap;

  position: absolute;
  top: 50%;
  left: 50%;
  ${transform('translate(-50%, -50%)')};

  ${injectAnimation('loginTitlePopup', '3s', 'ease', '0s')}
`;

const ButtonWrapper = styled.div`
  width: 80%;
  max-width: 40rem;
  ${flex('column', 'center', 'center', 2.1)};

  position: absolute;
  left: 50%;

  ${transform('translate(-50%, -50%)')};
  ${injectAnimation('loginButtonPopup', '3.3s', 'ease', '0s')};
`;

const Caption = styled.span`
  ${TYPO.text2.Reg};
  white-space: pre-line;
  text-align: center;
  line-height: 150%;
  color: white;
`;

const circleStyles = {
  common: css`
    position: absolute;
  `,
  top: css`
    top: -30%;
    right: -40%;
    ${injectAnimation('circleMovingTop', '3s', 'ease', '0s')}
  `,
  bottom: css`
    bottom: -30%;
    left: -40%;
    ${injectAnimation('circleMovingBottom', '3s', 'ease', '0s')}
  `,
};

export default Landing;
