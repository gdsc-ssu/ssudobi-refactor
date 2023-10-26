import styled from '@emotion/styled';
import { Title } from '../Layouts';
import Template from '../TemplateList/TemplatePage/Template';

const ReservationCheck = () => {
  const name = '김수진';
  return (
    <Container>
      <TitleBox>
        <Title
          title={`${name}님, \n 현재 예약 정보를 확인해 보세요.`}
          subtitle=""
          animated={false}
        />
      </TitleBox>
      <ReservationListsBox>
        <ListBox>
          <Template
            title="1234"
            time="1234"
            place="세미나실"
            memo="memo"
            friends={['2344', '2343']}
          />
        </ListBox>
        <ListBox>
          <Template
            title="1234"
            time="1234"
            place="세미나실"
            memo="memo"
            friends={['2344', '2343']}
          />
        </ListBox>
      </ReservationListsBox>
    </Container>
  );
};

const Container = styled.div``;

const TitleBox = styled.div`
  margin-top: 77px;
  padding: 0 28px;
`;

const ReservationListsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export default ReservationCheck;
