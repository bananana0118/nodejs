require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

const deleteQuery = {
  text: `DELETE FROM member WHERE id = $1`,
  values: [11],
};

//데이터 등록
client
  .query(deleteQuery)
  .then((res) => {
    console.log(res);
    client.end();
  })
  .catch((e) => console.error(e.stack));

//데이터 검색

//데이터 삭제
