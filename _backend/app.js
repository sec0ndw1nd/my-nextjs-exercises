const express = require('express');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3099);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.send('hello express!');
});

app.post('/user/login', (req, res) => {
  // POST -> req.body is the data from front
  console.log(req.body);

  if (req.body.username === 'admin' && req.body.password === '1234') {
    const userInfo = {
      name: '관리자',
    };
    res.send(userInfo);
  } else {
    res.status(401).send('you are not an admin.');
  }
});
app.post('/user/logout', (req, res) => {
  // POST -> req.body is the data from front
  console.log(req.body);

  res.send(true);
});

// listen의 첫번째 인자 = 포트번호
app.listen(app.get('port'), () => {
  console.log('express server has been running now..');
});
