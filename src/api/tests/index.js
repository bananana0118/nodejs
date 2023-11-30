import Router from 'koa-router';
import * as testCtrl from './test.ctrl';

const tests = new Router();

tests.post('/add', testCtrl.add);
tests.post('/delete', testCtrl.remove);
tests.post('/load', testCtrl.loadSnackList);
export default tests;
