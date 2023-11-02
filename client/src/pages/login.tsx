import { RoundButton } from '@/components/Buttons';
import { TextInput } from '@/components/Field';
import { useAuth, useHeader, useInput, useVh } from '@/hooks';
import { COLORS } from '@/styles/colors';
import { HEADER_HEIGHT, flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';

type FormData = {
  id: string;
  password: string;
};

/**
 * 로그인 페이지
 */
const Login = () => {
  const { setHeader } = useHeader();
  const { fullPageStyle } = useVh();
  const { handleLogin, isWarn } = useAuth();
  const { values, handleChange } = useInput<FormData>({ id: '', password: '' });

  useLayoutEffect(() => {
    setHeader('로그인');
  }, []);

  return (
    <Container css={fullPageStyle(HEADER_HEIGHT)}>
      <InputWrapper>
        <InputBox>
          <Caption>학번</Caption>
          <TextInput
            placeholder="ex. 20230000"
            value={values.id}
            name="id"
            onChange={handleChange}
            warning={isWarn}
          />
        </InputBox>
        <InputBox>
          <Caption>비밀번호</Caption>
          <TextInput
            placeholder="도서관 비밀번호를 입력하세요."
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            warning={isWarn}
            warningCaption="학번 또는 비밀번호가 일치하지 않습니다."
          />
        </InputBox>
      </InputWrapper>
      <ButtonWrapper>
        <RoundButton
          title="로그인"
          theme="primary"
          onClick={() => handleLogin(values.id, values.password)}
        />
        <Link>비밀번호를 재설정하고 싶어요.</Link>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 9rem 4.5rem;
  ${flex('column', 'between', 'center', 5)};
`;

const InputWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 5)};
`;

const InputBox = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1)};
`;

const Caption = styled.span`
  ${TYPO.title3.Reg};
  color: ${COLORS.grey0};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'center', 3)};
`;

const Link = styled.span`
  ${TYPO.text2.Reg};
  color: ${COLORS.grey3};
  cursor: pointer;
  text-decoration: underline;
`;

export default Login;
