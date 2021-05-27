import moment from 'moment';
import {
  TIME_FORMAT,
  MAX_DATA_LENGTH,
  INTERVAL_TIME_SECONDS,
} from './constants';

const calculateInitialBitcoinData = (initialTime) => {
  // time is a string in format HH:mm:ss
  // break it down so we can keep adding seconds for placeholder data
  const timeBreakdown = initialTime.split(':');
  const initialDate = moment.utc().set({
    hour: timeBreakdown[0],
    minute: timeBreakdown[1],
    second: timeBreakdown[2],
  });
  // return a new array with specified length of placeholders, with time intervals
  return new Array(MAX_DATA_LENGTH).fill(null).map((data, i) => {
    return {
      time: initialDate
        .add(i > 0 ? INTERVAL_TIME_SECONDS : 0, 's')
        .format(TIME_FORMAT),
      isPlaceholder: true,
      price: null,
      priceString: null,
      difference: 0,
    };
  });
};

export default calculateInitialBitcoinData;
