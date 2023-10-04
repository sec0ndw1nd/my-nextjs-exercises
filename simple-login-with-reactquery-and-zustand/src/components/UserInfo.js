function UserInfo({ name }) {
  const handleLogout = (e) => {
    // do logout
    console.log('define handleLogout first');
  };

  return (
    <>
      <h3>{name}님 안녕하세요?</h3>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default UserInfo;
