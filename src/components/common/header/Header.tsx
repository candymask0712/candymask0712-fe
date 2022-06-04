import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  return (
    <Container>
      <Link href='/'>
        <TitleH1>HAUS</TitleH1>
      </Link>
      <Link href='/login'>
        <TitleH3>login</TitleH3>
      </Link>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TitleH1 = styled.h1`
  font-size: 48px;
`;
const TitleH3 = styled.h3``;
