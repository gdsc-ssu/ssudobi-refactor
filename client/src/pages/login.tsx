import { useHeader } from '@/hooks';
import { useLayoutEffect } from 'react';

/**
 * 로그인 페이지
 */
const Login = () => {
  const { setHeader } = useHeader();

  useLayoutEffect(() => {
    setHeader('로그인');
  }, []);

  return <></>;
};

export default Login;
