import {
  orderSlice,
  initialState,
  getOrder,
  getUserOrders
} from './orderSlice';
import { TOrder } from '@utils-types';

jest.mock('@api');

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

    const orderResponseMock = {
      orders: [orderMock],
      success: true
    };

    it('Request', () => {
      const testState = orderSlice.reducer(
        initialState,
        getOrder.pending('', 0)
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('Success', () => {
      const testState = orderSlice.reducer(
        initialState,
        getOrder.fulfilled(orderResponseMock, '', 87612)
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        orderModalData: orderMock,
        error: null
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка при загрузке данных заказа';
      const testState = orderSlice.reducer(
        initialState,
        getOrder.rejected(new Error(errorMessage), '', 87612)
      );

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
      const testState = orderSlice.reducer(
        initialState,
        getUserOrders.pending('')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: true,
        error: null,
        userOrders: []
      });
    });

    it('Success', async () => {
      const testState = orderSlice.reducer(
        initialState,
        getUserOrders.fulfilled(ordersMock, '', undefined)
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        userOrders: ordersMock
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка при загрузке списка заказов';
      const testState = orderSlice.reducer(
        initialState,
        getUserOrders.rejected(new Error(errorMessage), '')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        userOrders: []
      });
    });
  });
});
