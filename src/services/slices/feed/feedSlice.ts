import { TOrder, TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getIngredientsApi } from '@api';

type TFeedState = {
  orders: TOrdersData | null;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: null,
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      );
  },
  selectors: {
    // selectorOrders: (state) => state.orders,
    // selectorTotal: (state) => state.total,
    // selectorTotalToday: (state) => state.totalToday
  }
});

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export default feedSlice.reducer;
export const feedAction = feedSlice.actions;
export const feedSelector = feedSlice.selectors;
