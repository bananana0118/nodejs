import Router from 'koa-router';
import posts from './posts';
import tests from './tests';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/tests', tests.routes());
export default api;
