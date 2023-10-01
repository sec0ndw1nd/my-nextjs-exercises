import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
    increaseCount: (state, action) => {
      state.count += action.payload;
    },
    decreaseCount: (state, action) => {
      state.count -= action.payload;
    },
  },
});
export default counterSlice;

export const { increaseCount, decreaseCount } = counterSlice.actions;
