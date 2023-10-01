import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  me: null,
  meStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  meError: null,
};

export const logIn = createAsyncThunk('user/logIn', async (data) => {
  const response = await axios.post('/user/login', data);
  return response.data;
});
export const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await axios.post('/user/logout');
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  // 동기
  reducers: {},
  // 비동기
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.user,
      }))
      .addCase(logIn.pending, (state) => {
        state.meStatus = 'loading';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.meStatus = 'succeeded';
        state.me = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.meStatus = 'failed';
        state.meError = action.error.message;
      })
      .addCase(logOut.pending, (state) => {
        state.meStatus = 'loading';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.meStatus = 'succeeded';
        state.me = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.meStatus = 'failed';
        state.meError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
