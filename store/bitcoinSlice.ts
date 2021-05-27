import { createSlice } from '@reduxjs/toolkit';
import calculateDomain from '../utils/calculateDomain';
import calculateInitialBitcoinData from '../utils/calculateInitialBitcoinData';

export const bitcoinSlice = createSlice({
  name: 'bitcoinData',
  initialState: {
    bitcoinData: [], // storing all bitcoin data
    currentBitcoinData: null, // most recent bitcoin data
    bitcoinError: '', // any errors with bitcoin api
    isFirstDataLoading: true, // for checking if first data is loaded
    domain: [0, 100000], // will be dynamic, for graph components
  },
  reducers: {
    addInitialBitcoinData: (state, { payload }) => {
      // new bitcoin data is received
      // difference will be 0 because can't compare
      const newBitcoinData = {
        ...payload,
        difference: 0,
        isPlaceholder: false,
      };
      // state.domain = [newBitcoinData.price * 0.9, newBitcoinData.price * 1.1];
      state.domain = calculateDomain(newBitcoinData.price);
      // get the placeholders so they are displayed on chart
      state.bitcoinData = calculateInitialBitcoinData(newBitcoinData.time);
      // very first bitcoin data will be inserted in beginning of list
      state.bitcoinData[0] = newBitcoinData;
      state.currentBitcoinData = newBitcoinData;
      state.isFirstDataLoading = false;
    },
    addBitcoinData: (state, { payload }) => {
      // difference is calculated with previous most recent data
      // if difference is 0, then there has been no change, so leave difference as it was before
      const newBitcoinData = {
        ...payload,
        difference:
          payload.price - state.currentBitcoinData.price ||
          state.currentBitcoinData.difference,
        isPlaceholder: false,
      };
      // if no placeholder, insert data into end of list, and remove oldest data
      if (state.bitcoinData.every((data) => !data.isPlaceholder)) {
        state.bitcoinData.shift();
        state.bitcoinData.push(newBitcoinData);
      } else {
        // find the first placeholder and replace it with new data
        const firstIncompleteIndex = state.bitcoinData.findIndex(
          (data) => data.isPlaceholder
        );
        state.bitcoinData[firstIncompleteIndex] = newBitcoinData;
      }
      // see if new domain calculation is needed
      if (
        state.domain[0] > newBitcoinData.price ||
        state.domain[1] < newBitcoinData.price
      ) {
        state.domain = calculateDomain(newBitcoinData.price);
      }
      state.currentBitcoinData = newBitcoinData;
    },
    updateBitcoinError: (state, { payload }) => {
      state.bitcoinError = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInitialBitcoinData, addBitcoinData, updateBitcoinError } =
  bitcoinSlice.actions;

export default bitcoinSlice.reducer;
