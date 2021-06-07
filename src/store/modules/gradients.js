const state = {
  // linear-gradient(90deg, rgba(65,58,180,1) 0%, rgba(253,29,129,1) 63%, rgba(252,205,69,1) 100%);
  gradients: [

    {
      id: "gradient_01",

      deg: "90deg",

      color1: "#833AB4FF",
      percentage1: "0%",

      color2: "#FD1D1DFF",
      percentage2: "50%",

      color3: "#FCB045FF",
      percentage3: "100%",
    },
    {
      id: "gradient_02",

      deg: "90deg",

      color1: "#413ab4",
      percentage1: "0%",

      color2: "#fd1d81",
      percentage2: "63%",

      color3: "#fccd45",
      percentage3: "100%",
    },
  ],
};

const getters = {
  getGradients: () => {
    return state.gradients;
  },
};

export default {
  name: "gradients",
  namespaced: true,
  state,
  getters,
};
