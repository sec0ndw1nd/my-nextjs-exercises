import Head from 'next/head';
import style from './index.module.css';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import UserInfo from '@/components/UserInfo';
import Counter from '@/components/Counter';

import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function loadMyInfoAPI() {
  return axios.get('/user').then((response) => response.data);
}

export default function Home() {
  const queryClient = useQueryClient();
  const [up, setUp] = useState(0);
  const { data } = useQuery(['user'], loadMyInfoAPI);

  return (
    <>
      <Head>
        <title>To-do list</title>
        <meta name="description" content="simple To-do list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Counter />
        <button onClick={() => setUp((prev) => ++prev)}>update</button>
        <div className={style.userBox}>
          {data ? <UserInfo name={data.user.name} /> : <LoginForm />}
        </div>
        <div>{data ? <div>여기에 투두리스트 출력</div> : <div>로그인하세요</div>}</div>
      </main>
    </>
  );
}
