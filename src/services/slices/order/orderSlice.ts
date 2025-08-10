import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export type TOrderState = {
  error: string | null;
  isLoading: boolean;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  userOrders: TOrder[];
};

const initialState: TOrderState = {
  error: null,
  isLoading: false,
  orderModalData: null,
  orderRequest: false,
  userOrders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetModalOrder: (state) => {
      state.orderModalData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload?.orders?.[0];
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.orderModalData = null;
      });
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userOrders = [];
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.userOrders = [];
      });
  },
  selectors: {
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData,
    userOrders: (state) => state.userOrders
  }
});

export const getOrder = createAsyncThunk(
  'order/get',
  async (id: number) => await getOrderByNumberApi(id)
);

export const getUserOrders = createAsyncThunk('order/getAll', getOrdersApi);

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
