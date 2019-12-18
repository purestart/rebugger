import { Context } from 'koa';
const main = (ctx:Context) => {
  ctx.response.body = 'rebugger';
};

export default main;