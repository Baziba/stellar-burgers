import {
  ingredientsSlice,
  initialState,
  getIngredients
} from './ingredientsSlice';
import { itemsMock } from '../../../utils/constants';

jest.mock('@api');

describe('ingredientsReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getIngredients->Request', () => {
    const testState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('', undefined)
    );

    expect(testState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      ingredients: []
    });
  });

  it('getIngredients->Success', async () => {
    const testState = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(itemsMock, '', undefined)
    );

    expect(testState).toEqual({
      ingredients: itemsMock,
      isLoading: false,
      error: null
    });
  });

  it('getIngredients->Failed', async () => {
    const errorMessage = 'Ошибка при загрузке списка ингредиентов';
    const testState = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error(errorMessage), '', undefined)
    );

    expect(testState).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
