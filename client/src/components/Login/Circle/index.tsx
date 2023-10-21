import styled from '@emotion/styled';
import { ComponentProps } from 'react';

const Circle = (props: ComponentProps<'div'>) => {
  return <Container {...props} />;
};

const Container = styled.div`
  width: 48rem;
  height: 48rem;
  border-radius: 50rem;
  background: linear-gradient(180deg, rgba(29, 155, 240, 0) 0%, #aeddfd 100%);
`;

export default Circle;
