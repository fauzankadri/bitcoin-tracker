import styled from 'styled-components';
import Logo from './Logo';

const Wrapper = styled.div`
  background-color: #18284c;
  height: 100px;
  padding: 20px;
  color: #fff;
  display: flex;
`;

const LogoTextWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  grid-auto-flow: column;
  margin: auto;
`;

const Title = styled.div`
  font-size: 32px;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 0 rgb(0 0 0 / 25%);
`;

const Header = () => {
  return (
    <Wrapper>
      <LogoTextWrapper>
        <Logo />
        <Title>Bitcoin Live</Title>
      </LogoTextWrapper>
    </Wrapper>
  );
};

export default Header;
