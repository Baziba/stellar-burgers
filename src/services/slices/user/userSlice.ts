import { TConstructorIngredient, TUser } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { constructorSlice } from '../constructor/constructorSlice';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

type TUserState = {
  error: string | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
};

const initialState: TUserState = {
  error: null,
  isAuthChecked: false,
  isLoading: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuthentication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuthentication.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthentication.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.user = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error?.message || null;
        state.isAuthChecked = true;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error?.message || null;
        state.isAuthChecked = true;
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error?.message || null;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    selectorUser: (state) => state.user,
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorIsLoading: (state) => state.isLoading
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const result = await updateUserApi(data);
    return result.user;
  }
);

export const checkUserAuthentication = createAsyncThunk(
  'user/checkAuthentication',
  async () => {
    console.log('user/checkAuthentication');
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      throw new Error('No access token');
    }

    const result = await getUserApi();

    if (!result.success) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }

    return result.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const result = await registerUserApi(data);
    if (result.success) {
      setCookie('accessToken', result.accessToken, { expires: 3600 });
      localStorage.setItem('refreshToken', result.refreshToken);
    }
    return result.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const result = await loginUserApi(data);
    if (result.success) {
      setCookie('accessToken', result.accessToken, { expires: 3600 });
      localStorage.setItem('refreshToken', result.refreshToken);
    }
    return result.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const result = await logoutApi();
  if (result.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return result;
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
