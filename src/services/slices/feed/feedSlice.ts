import { TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

type TFeedState = {
  orders: TOrdersData | null;
  isLoading: boolean;
  error: string | undefined;
};

export const initialState: TFeedState = {
  orders: null,
  isLoading: false,
  error: undefined
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
        state.error = action.error.message;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      );
  }
});

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export default feedSlice.reducer;
export const feedAction = feedSlice.actions;
export const feedSelector = feedSlice.selectors;
