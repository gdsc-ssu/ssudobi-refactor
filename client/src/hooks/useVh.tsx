import { useEffect, useState } from 'react';

/** 리사이징 이벤트에 따라 변하는 vh 가져오는 훅 (불필요한 스크롤 생기는 이슈 방지) */
const useVh = () => {
  const [vh, setVh] = useState(0);

  const mobileScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    setVh(vh);
  };

  useEffect(() => {
    mobileScreenSize();
    window.addEventListener('resize', () => mobileScreenSize());
    return () => {
      window.removeEventListener('resize', mobileScreenSize);
    };
  }, []);

  return { vh };
};

export default useVh;
