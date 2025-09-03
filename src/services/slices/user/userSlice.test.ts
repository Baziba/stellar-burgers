import {
  checkUserAuthentication,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from './userSlice';
import { describe } from '@jest/globals';
import { TLoginData } from '@api';
import {
  userDataMock,
  userLoginDataMock,
  userRegistrationDataMock
} from '../../../utils/constants';

jest.mock('@api');

describe('userReducer', () => {
  describe('updateUser', () => {
    it('Request', () => {
      const testState = userSlice.reducer(
        initialState,
        updateUser.pending('', {})
      );

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const testState = userSlice.reducer(
        initialState,
        updateUser.fulfilled(userDataMock, '', {})
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userDataMock
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка при обновлении пользователя';
      const testState = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(errorMessage), '', {})
      );

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
    it('Request', () => {
      const testState = userSlice.reducer(
        initialState,
        registerUser.pending('', userRegistrationDataMock)
      );
      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const testState = userSlice.reducer(
        initialState,
        registerUser.fulfilled(userDataMock, '', userRegistrationDataMock)
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userDataMock
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка регистрации нового пользователя';
      const testState = userSlice.reducer(
        initialState,
        registerUser.rejected(
          new Error(errorMessage),
          '',
          userRegistrationDataMock
        )
      );

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
    it('Request', () => {
      const testState = userSlice.reducer(
        initialState,
        loginUser.pending('', userLoginDataMock)
      );

      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const testState = userSlice.reducer(
        initialState,
        loginUser.fulfilled(userDataMock, '', userLoginDataMock)
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: true,
        user: userDataMock
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка аутентификации пользователя';
      const testState = userSlice.reducer(
        initialState,
        loginUser.rejected(new Error(errorMessage), '', userLoginDataMock)
      );

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
      const testState = userSlice.reducer(initialState, logoutUser.pending(''));
      expect(testState).toEqual({
        isLoading: true,
        isAuthChecked: false,
        error: null,
        user: null
      });
    });

    it('Success', async () => {
      const testState = userSlice.reducer(
        initialState,
        logoutUser.fulfilled({ success: true }, '')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        isAuthChecked: false,
        user: null
      });
    });

    it('Failed', async () => {
      const errorMessage = 'Ошибка выхода';
      const testState = userSlice.reducer(
        initialState,
        logoutUser.rejected(new Error(errorMessage), '')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthChecked: false
      });
    });
  });

  describe('checkUserAuthentication', () => {
    test('Request', () => {
      const testState = userSlice.reducer(
        initialState,
        checkUserAuthentication.pending('')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('Success', () => {
      const testState = userSlice.reducer(
        initialState,
        checkUserAuthentication.fulfilled(userDataMock, '')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: true,
        user: userDataMock
      });
    });

    test('Failed', () => {
      const errorMessage = 'Ошибка проверки пользователя';
      const testState = userSlice.reducer(
        initialState,
        checkUserAuthentication.rejected(new Error(errorMessage), '')
      );

      expect(testState).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: true,
        error: errorMessage
      });
    });
  });
});
