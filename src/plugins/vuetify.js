import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import minifyTheme from "minify-css-string";

Vue.use(Vuetify);

const light = {
  primary: "#3F2772",
  secondary: "#2EB8FF",
  accent: "#EE96B5",
  error: colors.red.accent3,
  anchor: colors.purple,
  background: colors.grey.lighten5,
};

const dark = {
  primary: "#3F2772",
  secondary: "#2EB8FF",
  accent: "#EE96B5",
  error: colors.red.accent3,
  anchor: colors.purple,
  background: colors.shades.dark,
};

export default new Vuetify({
  theme: {
    dark: false,
    themes: { light, dark },
    options: {
      customProperties: true,
      minifyTheme,
      // themeCache: {
      //   get: (key) => localStorage.getItem(key),
      //   set: (key, value) => localStorage.setItem(key, value),
      // },
    },
  },
});
