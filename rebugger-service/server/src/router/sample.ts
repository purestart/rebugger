import { Context } from 'koa';
const main = (ctx:Context) => {
  ctx.response.body = 'front-logger';
};

export default main;