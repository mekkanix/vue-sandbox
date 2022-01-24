module.exports = class App {

  static getInfos (ctx) {
    console.log(ctx);
    const assetsPrefix = ctx.process.args.assetsprefix || null
    return {
      options: {
        assetsPrefix,
      },
      publicAssetsUri: ctx.conf.public.assetsPublicPath,
    }
  }

}
