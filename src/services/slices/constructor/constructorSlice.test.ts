import {
  constructorActions,
  constructorSlice,
  initialState
} from './constructorSlice';
import { nanoid } from '@reduxjs/toolkit';
import { itemsMock } from '../../../utils/constants';

/* Мок nanoid из @reduxjs/toolkit */
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn()
}));

const mockedNanoid = nanoid as jest.Mock;

describe('constructorReducer', () => {
  beforeEach(() => {
    mockedNanoid.mockReturnValue('mocked-test-id');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Добавление булки', () => {
    const testState = constructorSlice.reducer(
      initialState,
      constructorActions.addItem(itemsMock[0])
    );

    expect(testState.bun).toEqual({ ...itemsMock[0], id: 'mocked-test-id' });
  });

  test('Добавление котлеты', () => {
    const testState = constructorSlice.reducer(
      initialState,
      constructorActions.addItem(itemsMock[1])
    );

    expect(testState.ingredients).toEqual([
      { ...itemsMock[1], id: 'mocked-test-id' }
    ]);
  });

  test('Удаление ингредиента ', () => {
    /* Подготавливаю стейт, добавляя ингредиент в него */
    const preparedState = constructorSlice.reducer(
      initialState,
      constructorActions.addItem(itemsMock[2])
    );

    /* Ингредиент добавился */
    expect(preparedState.ingredients).toEqual([
      { ...itemsMock[2], id: 'mocked-test-id' }
    ]);

    /* Удаляю ингредиент из подготовленного стейта */
    const testState = constructorSlice.reducer(
      preparedState,
      constructorActions.removeItem({
        ...itemsMock[2],
        id: 'mocked-test-id'
      })
    );

    expect(testState.ingredients).toEqual([]);
  });

  test('Перемещение ингредиентов', () => {
    /* Подготовлю стейт */
    const stateWithMain = constructorSlice.reducer(
      initialState,
      constructorActions.addItem(itemsMock[1])
    );

    const stateWithSauce = constructorSlice.reducer(
      stateWithMain,
      constructorActions.addItem(itemsMock[2])
    );

    /* Проверил, что добавилось два ингредиента */
    expect(stateWithSauce.ingredients).toHaveLength(2);

    /* Меняю местами ингредиенты */
    const testSate = constructorSlice.reducer(
      stateWithSauce,
      constructorActions.moveItem({ moveFrom: 0, moveTo: 1 })
    );

    /* Не красиво, но я так вижу */
    expect(testSate.ingredients).toEqual([
      { ...itemsMock[2], id: 'mocked-test-id' },
      { ...itemsMock[1], id: 'mocked-test-id' }
    ]);
  });
});
