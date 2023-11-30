require('dotenv').config();
import cors from '@koa/cors';
import Router from 'koa-router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import api from './api/index.js';
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = new Koa();
const router = new Router();
router.use('/api', api.routes()); // api라우트를 미들웨어로 적용

//라우터 적용전에 bodyparser설정
//미들웨어 설정해서 폴더형식으로 설정
app.use(bodyParser());

app.use(cors(corsOptions));

app.use(router.routes()).use(router.allowedMethods());

app.listen(90, () => {
  console.log('Listening to port 90');
});
