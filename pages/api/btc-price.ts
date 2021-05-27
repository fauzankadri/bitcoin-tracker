import axios from 'axios';
import moment from 'moment';

import { TIME_FORMAT } from '../../utils/constants';
import priceFormatter from '../../utils/priceFormatter';

const COINBASE_API = 'https://api.coinbase.com/v2/prices/BTC-USD/buy';

export default async (req, res) => {
  try {
    const momentTime = moment.utc();
    // call coinbase api, then stamp the time and format the price
    const coinbaseResponse = await axios.get(COINBASE_API);
    const price = parseFloat(coinbaseResponse.data.data.amount);
    const priceString = priceFormatter(price);

    res.status(200).json({
      price,
      time: momentTime.format(TIME_FORMAT),

      priceString,
    });
  } catch (error) {
    // catch any errors with a message response
    res
      .status(500)
      .json({ message: 'Oops, something went wrong. Please try again later' });
  }
};
