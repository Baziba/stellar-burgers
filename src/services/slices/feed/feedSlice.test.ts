import { feedSlice, initialState, getFeeds } from './feedSlice';

jest.mock('@api');

describe('feedReducer', () => {
  const ordersMock = [
    {
      _id: '68b7083b673086001ba8614b',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2025-09-02T15:07:39.306Z',
      updatedAt: '2025-09-02T15:07:40.606Z',
      number: 87692
    },
    {
      _id: '68b70230673086001ba86139',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Традиционный-галактический флюоресцентный бургер',
      createdAt: '2025-09-02T14:41:52.888Z',
      updatedAt: '2025-09-02T14:41:53.821Z',
      number: 87691
    },
    {
      _id: '68b6ffbf673086001ba86114',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный метеоритный бургер',
      createdAt: '2025-09-02T14:31:27.736Z',
      updatedAt: '2025-09-02T14:31:29.614Z',
      number: 87690
    }
  ];

  const feedResponseMock = {
    success: true,
    orders: ordersMock,
    total: 8888,
    totalToday: 77
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getFeeds->Request', async () => {
    const testState = feedSlice.reducer(
      initialState,
      getFeeds.pending('', undefined)
    );

    expect(testState).toEqual({
      ...initialState,
      isLoading: true,
      error: undefined,
      orders: null
    });
  });

  it('getFeeds->Success', async () => {
    const testState = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled(feedResponseMock, '', undefined)
    );

    expect(testState).toEqual({
      orders: feedResponseMock,
      isLoading: false,
      error: undefined
    });
  });

  it('getFeeds->Failed', async () => {
    const errorMessage = 'Ошибка при загрузке ленты заказов';
    const testState = feedSlice.reducer(
      initialState,
      getFeeds.rejected(new Error(errorMessage), '', undefined)
    );

    expect(testState).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
