import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.post('/add', postsCtrl.add);
posts.post('/read', postsCtrl.read);
posts.post('/delete', postsCtrl.remove);
posts.post('/update', postsCtrl.update);

export default posts;
