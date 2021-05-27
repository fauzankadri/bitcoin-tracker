import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  background-color: #d50201;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
`;

const ErrorBox = ({ message }) => {
  return <Wrapper>{message}</Wrapper>;
};

export default ErrorBox;
