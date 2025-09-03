import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';
type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  order: TOrder | null;
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  order: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveItem: (
      state,
      action: PayloadAction<{
        moveFrom: number;
        moveTo: number;
      }>
    ) => {
      const { moveFrom, moveTo } = action.payload;
      const items = state.ingredients;
      [items[moveFrom], items[moveTo]] = [items[moveTo], items[moveFrom]];
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    resetOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      });
  }
});

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => await orderBurgerApi(data)
);

export default constructorSlice.reducer;
export const constructorActions = constructorSlice.actions;
