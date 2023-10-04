import { useState } from 'react';
import style from './LoginForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logInAPI } from '@/api/user';

function LoginForm() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(logInAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (user) => {
      console.log('success');
      queryClient.setQueryData(['user'], (oldData) => {
        return {
          ...oldData,
          user,
        };
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };

    mutation.mutate(formData);
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
      <button type="submit">{loading ? '로그인중..' : '로그인'}</button>
    </form>
  );
}

export default LoginForm;
