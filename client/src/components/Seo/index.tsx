import Head from 'next/head';
import { ReactNode } from 'react';

export interface headProps {
  title: string;
  desc: string;
  children?: ReactNode;
}

/**
 * 검색 최적화를 위한 Seo 컴포넌트
 * 페이지 최 상단에 선언하면 됩니다.
 */
const Seo = ({ title, desc, children }: headProps) => {
  return (
    <Head>
      <title>{`${title} | SSUDOBI : 숭실대학교 도서관 비대면 예약 시스템`}</title>
      <meta name="description" content={desc} />
      <meta
        name="keywords"
        content="슈도비,SSUDOBI,숭실대학교,숭실대,도서관,숭실대도서관,예약,도서관예약,세미나실,도서관세미나실,숭실대도서관세미나실,세미나룸,예약,세미나룸예약,도서관세미나룸예약"
      />
      <meta name="og:site_name" content={`SSUDOBI`} />
      <meta
        name="og:title"
        content={`${title} | 숭실대학교 도서관 비대면 예약 시스템`}
      />
      <meta name="og:image" content="/og.jpg" />
      <meta name="og:description" content={desc} />
      <meta name="og:type" content="website" />
      <meta name="twitter:title" content="SSUDOBI" />
      {children}
    </Head>
  );
};

export default Seo;
