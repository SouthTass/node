let singFn = async (ctx, next) => {
  let data = ctx.request.body;
  ctx.response.type = 'application/json';
  ctx.response.body = {
    name: data.name,
    pwd: data.pwd,
    is: data.is
  }
};

module.exports = {
  "POST  /sign": singFn
}