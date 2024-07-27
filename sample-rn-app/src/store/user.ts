import { createSlice } from '@reduxjs/toolkit';
import { User } from "../utils/common";

const cacheUserToken = User.getUserToken();

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: cacheUserToken.length !== 0,
    sessionToken: cacheUserToken,
    testValue: '测试数据 - 初始状态',
  },
  reducers: {
    setToken: (state, action) => {
      state.sessionToken = action.payload.token;
    },
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.sessionToken = '';
      state.isLogin = false;
      User.clearLoginCache();
    },
  }
})

export const { setToken, login, logout } = userSlice.actions

export default userSlice.reducer
