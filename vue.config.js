module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/condidi/" : "/",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
};
