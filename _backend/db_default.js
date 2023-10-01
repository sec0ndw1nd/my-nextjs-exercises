module.exports = {
  users: [
    {
      id: 0,
      username: 'admin',
      password: '1234',
      name: '관리자',
    },
    {
      id: 1,
      username: 'tester',
      password: '1234',
      name: '홍길동',
    },
  ],
  todos: [
    {
      id: 0,
      list: [
        {
          id: Date.now(),
          todo: 'complete this project.',
          isChecked: false,
        },
      ],
    },
    {
      id: 1,
      list: [
        {
          id: Date.now(),
          todo: 'buy a headphone.',
          isChecked: false,
        },
        {
          id: Date.now() + 1,
          todo: 'do homework',
          isChecked: true,
        },
      ],
    },
  ],
};
