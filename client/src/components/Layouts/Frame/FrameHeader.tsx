import { useRouter } from 'next/router';
import { NavHeader, TitleHeader } from '../Header';
import { useHeader } from '@/hooks';

const FrameHeader = () => {
  const router = useRouter();
  const { headerTitle } = useHeader();

  switch (router.pathname) {
    case '/landing':
      return <></>;
    case '/':
    case '/template':
    case '/mate':
    case '/schedule':
      return <TitleHeader />;
    default:
      return <NavHeader title={headerTitle} />;
  }
};

export default FrameHeader;
