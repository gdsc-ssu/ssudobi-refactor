import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import styled from '@emotion/styled';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Empty = () => {
  return (
    <Container>
      <Button>
        <Content>템플릿 제작하기</Content>
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
