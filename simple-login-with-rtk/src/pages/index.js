import Head from 'next/head';
import style from './index.module.css';
import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import UserInfo from '../components/UserInfo';
import Counter from '../components/Counter';
import { useDispatch, useSelector } from 'react-redux';
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const dispatch = useDispatch();
  const { me, meError } = useSelector((state) => state.user);

  useEffect(() => {
    if (meError) {
      alert(meError);
    }
  }, [meError]);

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
        <div className={style.userBox}>{me ? <UserInfo name={me.name} /> : <LoginForm />}</div>
        <div>{me ? <div>여기에 투두리스트 출력</div> : <div>로그인하세요</div>}</div>
      </main>
    </>
  );
}
