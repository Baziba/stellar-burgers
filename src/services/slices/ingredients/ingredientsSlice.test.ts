import {
  ingredientsSlice,
  initialState,
  getIngredients
} from './ingredientsSlice';
import { itemsMock } from '../../../utils/constants';
import { configureStore } from '@reduxjs/toolkit';

describe('ingredientsReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getIngredients->Request', () => {
    const store = configureStore(ingredientsSlice);
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    store.dispatch(getIngredients());
    const testState = store.getState();

    expect(testState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      ingredients: []
    });
  });

  it('getIngredients->Success', async () => {
    const store = configureStore(ingredientsSlice);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: itemsMock
          })
      })
    ) as jest.Mock;

    await store.dispatch(getIngredients());
    const testState = store.getState();

    expect(testState).toEqual({
      ingredients: itemsMock,
      isLoading: false,
      error: null
    });
  });

  it('getIngredients->Failed', async () => {
    const store = configureStore(ingredientsSlice);
    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    const errorMessage = 'Ошибка при загрузке списка ингредиентов';

    await store.dispatch(getIngredients());
    const testState = store.getState();

    expect(testState).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
