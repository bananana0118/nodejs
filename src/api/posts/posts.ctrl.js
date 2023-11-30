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

  try {
    const { name, link } = await ctx.request.body;

    console.log(name, link);

    // 데이터의 유효성 검증
    if (!name || !link) {
      ctx.status = 400; // Bad Request
      ctx.body = { error: 'Name and link are required' };
      return;
    }
    const date = new Date().toISOString();
    console.log(date);
    const query = {
      text: 'INSERT INTO snack VALUES ($1, $2, $3) RETURNING *',
      values: [name, link, date],
    };

    //데이터 베이스 연결
    await client.connect();

    const result = await client.query(query);

    ctx.status = 200;
    ctx.body = { message: 'Data added successfully', data: result.rows };
    //데이터 등록
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal ServerError' };
  } finally {
    await client.end();
  }
};

export const read = async (ctx) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  try {
    const query = {
      text: 'SELECT * FROM snack',
    };

    //데이터 베이스 연결
    await client.connect();

    const result = await client.query(query);

    ctx.status = 200;
    ctx.body = { message: 'Data loadded successfully', data: result.rows };
    //데이터 등록
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal ServerError' };
  } finally {
    await client.end();
  }
};

export const remove = async (ctx) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  const { id } = ctx.request.body;

  try {
    const query = {
      text: `DELETE FROM snack WHERE id = $1`,
      values: [id],
    };
    //데이터 베이스 연결
    await client.connect();

    await client.query(query);

    // 데이터의 유효성 검증
    if (!id) {
      ctx.status = 400; // Bad Request
      ctx.body = { error: 'id are required' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Data delete successfully' };
    //데이터 등록
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal ServerError' };
  } finally {
    await client.end();
  }

  //데이터 등록
};

export const update = async (ctx) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  const { id, key, value } = ctx.request.body;

  console.log(id, key, value);
  try {
    const query = {
      text: `UPDATE snack SET ${key} = $2 WHERE id = $1`,
      values: [id, value],
    };
    //데이터 베이스 연결
    await client.connect();

    const res = await client.query(query);

    // 데이터의 유효성 검증
    if (!id) {
      ctx.status = 400; // Bad Request
      ctx.body = { error: 'id are required' };
      return;
    }

    console.log(res);

    ctx.status = 200;
    ctx.body = { message: 'Data update successfully' };
    //데이터 등록
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal ServerError' };
  } finally {
    await client.end();
  }

  //데이터 등록
};
