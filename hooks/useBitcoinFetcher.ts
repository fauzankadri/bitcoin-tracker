import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addInitialBitcoinData,
  addBitcoinData,
  updateBitcoinError,
} from '../store/bitcoinSlice';
import { INTERVAL_TIME_SECONDS } from '../utils/constants';

const useBitcoinFetcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    const fetchData = async (callToAction) => {
      try {
        const response = await axios('/api/btc-price');

        dispatch(callToAction(response.data));
      } catch (error) {
        clearInterval(interval);
        // check if response contains message or use the frontend one
        const errorMessage =
          error.response?.data?.message ||
          "Oops! We're unable to get Bitcoin's Data";
        dispatch(updateBitcoinError(errorMessage));
      }
    };
    // first initial api call will prep the reducer
    fetchData(addInitialBitcoinData);
    interval = setInterval(
      () => fetchData(addBitcoinData),
      INTERVAL_TIME_SECONDS * 1000
    ); // continuously call api at defined interval time

    return () => {
      clearInterval(interval); // remove interval on unmount
    };
  }, []);
};

export default useBitcoinFetcher;
