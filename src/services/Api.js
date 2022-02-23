import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://hook.zubbsteel.com/line-ci/qt/v1",
  });
};
