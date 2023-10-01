import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/user';

function UserInfo({ name }) {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logOut());
  };
  return (
    <>
      <h3>{name}님 안녕하세요?</h3>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default UserInfo;
