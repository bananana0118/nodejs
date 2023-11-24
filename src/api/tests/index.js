import Router from 'koa-router';
import * as testCtrl from './test.ctrl';

const tests = new Router();

tests.post('/add', testCtrl.add);
tests.post('/delete', testCtrl.remove);

export default tests;
