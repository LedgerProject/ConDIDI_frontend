module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
};
