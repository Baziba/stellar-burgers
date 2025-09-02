import {
  orderSlice,
  initialState,
  getOrder,
  getUserOrders
} from './orderSlice';
import { TOrder } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';

describe('orderReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getOrder', () => {
    /* Мок заказа */
    const orderMock: TOrder = {
      _id: '68b591da673086001ba85ce0',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2025-09-01T12:30:18.842Z',
      updatedAt: '2025-09-01T12:30:19.716Z',
      number: 87612
    };

    it('Request', () => {
      const store = configureStore(orderSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(getOrder(87612));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('Success', () => {
      const response = { orders: [orderMock], success: true };
      const action = getOrder.fulfilled(response, '', 87612);
      const testState = orderSlice.reducer(
        { ...initialState, isLoading: true },
        action
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        orderModalData: orderMock,
        error: null
      });
    });

    it('Failed', async () => {
      const store = configureStore(orderSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка при загрузке данных заказа';

      await store.dispatch(getOrder(87612));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('getUserOrders', () => {
    /* Мок списка заказов пользователя */
    const ordersMock: TOrder[] = [
      {
        _id: '68b59011673086001ba85cdb',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный астероидный люминесцентный бессмертный альфа-сахаридный экзо-плантаго био-марсианский бургер',
        createdAt: '2025-09-01T12:22:41.840Z',
        updatedAt: '2025-09-01T12:22:42.870Z',
        number: 87610
      },
      {
        _id: '68b59137673086001ba85cde',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный space астероидный альфа-сахаридный традиционный-галактический био-марсианский метеоритный бургер',
        createdAt: '2025-09-01T12:27:35.804Z',
        updatedAt: '2025-09-01T12:27:36.837Z',
        number: 87611
      },
      {
        _id: '68b591da673086001ba85ce0',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский бургер',
        createdAt: '2025-09-01T12:30:18.842Z',
        updatedAt: '2025-09-01T12:30:19.716Z',
        number: 87612
      }
    ];

    it('Request', () => {
      const store = configureStore(orderSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(getUserOrders());
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: true,
        error: null,
        userOrders: []
      });
    });

    it('Success', async () => {
      const store = configureStore(orderSlice);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              orders: ordersMock
            })
        })
      ) as jest.Mock;

      await store.dispatch(getUserOrders());
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        userOrders: ordersMock
      });
    });

    it('Failed', async () => {
      const store = configureStore(orderSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка при загрузке списка заказов';

      await store.dispatch(getUserOrders());
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        userOrders: []
      });
    });
  });
});
