import {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from './userSlice';
import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';

describe('userReducer', () => {
  describe('updateUser', () => {
    const userUpdateDataMock = {
      name: 'Updated User',
      email: 'updated@example.com'
    };

    it('Request', () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(updateUser(userUpdateDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              user: userUpdateDataMock
            })
        })
      ) as jest.Mock;

      await store.dispatch(updateUser(userUpdateDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userUpdateDataMock
      });
    });

    it('Failed', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка при обновлении пользователя';

      await store.dispatch(updateUser(userUpdateDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthChecked: true
      });
    });
  });

  describe('registerUser', () => {
    /* Мок для регистрации пользователя */
    const userRegistrationDataMock = {
      email: 'tester01@test.test',
      password: 'test333',
      name: 'Test 01 001'
    };

    it('Request', () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(registerUser(userRegistrationDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              user: userRegistrationDataMock
            })
        })
      ) as jest.Mock;

      await store.dispatch(registerUser(userRegistrationDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userRegistrationDataMock
      });
    });

    it('Failed', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка регистрации нового пользователя';

      await store.dispatch(registerUser(userRegistrationDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthChecked: true
      });
    });
  });

  describe('loginUser', () => {
    const userLoginDataMock = {
      email: 'tester01@test.test',
      password: 'test333'
    };

    it('Request', () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(loginUser(userLoginDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              user: userLoginDataMock
            })
        })
      ) as jest.Mock;

      await store.dispatch(loginUser(userLoginDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userLoginDataMock
      });
    });

    it('Failed', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка аутентификации пользователя';

      await store.dispatch(loginUser(userLoginDataMock));
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthChecked: true
      });
    });
  });

  describe('logoutUser', () => {
    it('Request', () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
      store.dispatch(logoutUser());
      const testState = store.getState();

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              message: 'Successful logout'
            })
        })
      ) as jest.Mock;

      await store.dispatch(logoutUser());
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: false,
        user: null
      });
    });

    it('Failed', async () => {
      const store = configureStore(userSlice);
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      const errorMessage = 'Ошибка выхода';

      await store.dispatch(logoutUser());
      const testState = store.getState();

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthChecked: false
      });
    });
  });
});
