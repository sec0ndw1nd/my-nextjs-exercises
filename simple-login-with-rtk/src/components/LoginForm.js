import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './LoginForm.module.css';
import { logIn } from '../reducers/user';

function LoginForm() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    dispatch(logIn(formData));
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.label}>
        <label htmlFor="inputId">Username: </label>
        <input
          id="inputId"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={style.label}>
        <label htmlFor="inputPw">Password: </label>
        <input
          id="inputPw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
