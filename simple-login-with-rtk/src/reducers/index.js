import { combineReducers } from 'redux';
import axios from 'axios';

import userSlice from './user';
import counterSlice from './counter';

axios.defaults.baseURL = 'http://localhost:3099'; // server url
axios.defaults.withCredentials = true;

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
