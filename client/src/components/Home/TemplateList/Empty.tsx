import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

const Empty = () => {
  const router = useRouter();

  return (
    <Container>
      <Button onClick={() => router.push('/template/1')}>
        <Content>템플릿 추가하기</Content>
        <FontAwesomeIcon icon={faMarker} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0rem 2.7rem;
`;

const Button = styled.button`
  width: 100%;
  height: 6rem;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  outline: none;
  border-radius: 1rem;
  cursor: pointer;
  ${flex('row', 'center', 'center', 1)};
`;

const Content = styled.span`
  ${TYPO.text2.Sb};
  color: ${COLORS.white};
`;

export default Empty;
