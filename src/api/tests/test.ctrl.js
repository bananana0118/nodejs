require('dotenv').config();
const { Client } = require('pg');

export const add = async (ctx) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  console.log(Number.parseInt(Math.random() * 100));
  const query = {
    text: 'INSERT INTO member VALUES ($1, $2)',
    values: [Number.parseInt(Math.random() * 100), '강예정'],
  };

  await client.connect();
  //데이터 등록
  await client
    .query(query)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((e) => console.error(e.stack));
};

export const remove = async (ctx) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  const deleteQuery = {
    text: `DELETE FROM member WHERE id = $1`,
    values: [11],
  };

  client.connect();
  //데이터 등록
  client
    .query(deleteQuery)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((e) => console.error(e.stack));
};
