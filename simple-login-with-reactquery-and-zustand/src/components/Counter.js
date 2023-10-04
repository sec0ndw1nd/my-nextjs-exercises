import { useState } from 'react';
import style from './Counter.module.css';

function Counter() {
  // rootReducer의 counterSlice의 count
  const [count, setCount] = useState(0);

  const handleIncreseCount = () => setCount((prev) => prev + 10);
  const handleDecreseCount = () => setCount((prev) => prev - 10);

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
