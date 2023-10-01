import { useState } from 'react';
import style from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount } from '../reducers/counter';

function Counter() {
  // rootReducer의 counterSlice의 count
  const { count } = useSelector((state) => state.counter);

  // rtk 전역 state의 dispatch
  const dispatch = useDispatch();
  const handleIncreseCount = () => dispatch(increaseCount(10));
  const handleDecreseCount = () => dispatch(decreaseCount(10));

  return (
    <div className={style.counterBox}>
      <h3>count: {count}</h3>
      <div>
        <button onClick={handleIncreseCount}>increase +10</button>
        <button onClick={handleDecreseCount}>decrease -10</button>
      </div>
    </div>
  );
}

export default Counter;
