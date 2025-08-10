import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
  selectors: {
    // ingredients: (state) => state.ingredients,
    // isLoading: (state) => state.isLoading,
    // error: (state) => state.error
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export default ingredientsSlice.reducer;
// export const ingredientsSelectors = ingredientsSlice.selectors;
