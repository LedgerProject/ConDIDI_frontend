import a from "axios";

export const axios = createInstance(process.env.VUE_APP_API_BASE_URL);

function createInstance(baseURL) {
  return a.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
