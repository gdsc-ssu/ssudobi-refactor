import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { authInfoState } from '@/atoms/authInfoState';
import { Title } from '../Layouts';
import { SquareButton } from '../Buttons';
import Template from '../TemplateList/TemplatePage/Template';
import Link from 'next/link';
import { flex } from '@/styles/tokens';
import { css } from '@emotion/react';
import { injectAnimation } from '@/styles/animations';
import { useTemplate } from '@/hooks';
import { useEffect } from 'react';

const AddTemplate = () => {
  const authInfo = useAtomValue(authInfoState);
  const { templateList, getMyTemplateList } = useTemplate();

  useEffect(() => {
    getMyTemplateList();
  }, []);

  return (
    <Container>
      <TitleWrapper css={paddingStyle}>
        <Title
          title={`${authInfo?.name}님, \n템플릿을 만들고 선택해 보세요.`}
          subtitle="정기적으로 진행되는 미팅을 빠르게 신청할 수 있어요"
          animated={true}
        />
      </TitleWrapper>
      <UnderWrapper css={paddingStyle}>
        <ButtonBox>
          <Link href={'/template/1'}>
            <SquareButton title="템플릿 추가하기" theme="primary" />
          </Link>
        </ButtonBox>
        <ReservationListsBox>
          {templateList !== undefined
            ? templateList.map((el, idx) => (
                <ListBox key={idx}>
                  <Template
                    selectedTemplate={el}
                    uuid={el.uuid}
                    title={el.title}
                    day={el.day}
                    beginTime={el.startTime}
                    endTime={el.finishTime}
                    friends={el.people}
                    place={el.seminarType + ' ' + el.semina}
                    idx={idx}
                    semina={el.semina}
                    onClick={() => {}}
                  />
                </ListBox>
              ))
            : '템플릿 없음'}
        </ReservationListsBox>
      </UnderWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 3)};
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  position: relative;
  ${injectAnimation('fadeInTopDown', '0.5s', 'ease')};
`;

const ReservationListsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const ListBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto 15px;
`;

const UnderWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1.5)};
`;

const paddingStyle = css`
  padding: 0rem 2.7rem;
`;

export default AddTemplate;
