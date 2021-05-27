import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Price = styled.div`
  padding: 0 40px;
  font-weight: 700;
  color: #161f36;
  font-size: 36px;
`;

const Arrow = styled.i`
  font-size: 28px;
  color: ${(props) => (props.isIncreasing ? '#7DED00' : '#FF0200')};
  transform: ${(props) =>
    props.isIncreasing ? 'rotateX(0deg)' : 'rotateX(180deg)'};
  transition: transform 600ms linear;
`;

const CurrentPrice = ({}) => {
  // get most recent bitcoin data from reducer
  const priceString = useSelector(
    (state: { bitcoinSlice }) =>
      state.bitcoinSlice.currentBitcoinData.priceString
  );

  const difference = useSelector(
    (state: { bitcoinSlice }) =>
      state.bitcoinSlice.currentBitcoinData.difference
  );
  if (!priceString) {
    return null;
  }

  return (
    <Wrapper>
      <Price>{priceString}</Price>
      <Arrow className="fas fa-arrow-up" isIncreasing={difference >= 0} />
    </Wrapper>
  );
};

export default CurrentPrice;
