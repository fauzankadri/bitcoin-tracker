import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useBitcoinFetcher from '../hooks/useBitcoinFetcher';
import CurrentPrice from '../components/CurrentPrice/CurrentPrice';
import Graph from '../components/Graph/Graph';
import InformationBox from '../components/InformationBox/InformationBox';
import Loading from '../components/Loading/Loading';
import ErrorBox from '../components/ErrorBox/ErrorBox';

const Wrapper = styled.div`
  max-width: 768px;
  margin: 32px auto;
  text-align: center;
  padding: 16px 32px;
  background: #fff;
  border-radius: 16px;
  display: grid;
  grid-gap: 30px;

  @media (max-width: 768px) {
    margin: 0 auto;
    border-radius: 0px;
  }
`;

const LoadingWrapper = styled.div`
  min-height: calc(100vh - 120px);
  display: flex;
`;

const Home = () => {
  useBitcoinFetcher();

  const isFirstDataLoading = useSelector(
    (state: { bitcoinSlice }) => state.bitcoinSlice.isFirstDataLoading
  );

  const bitcoinError = useSelector(
    (state: { bitcoinSlice }) => state.bitcoinSlice.bitcoinError
  );

  if (isFirstDataLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  } else if (bitcoinError) {
    return (
      <Wrapper>
        <ErrorBox message={bitcoinError} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <CurrentPrice />
      <Graph />
      <InformationBox />
    </Wrapper>
  );
};

export default Home;
