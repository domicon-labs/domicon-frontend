import axios from 'axios';

import config from 'configs/app';

const timeout = 60000 * 3;
const baseURL = config.app.baseUrl;
// const contentType = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = contentType;

const service = axios.create({
  baseURL,
  timeout,
});

// let requestHeaders;
service.interceptors.request.use(
  (config) => {
    // requestHeaders = config.headers;
    if (config.method === 'get' && config.params == null) {
      config.params = config.data;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      // 请求成功，但数据处理出错
      // console.log(res.errinfo || res.message);
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    // 请求处理出错处理
    // console.log(error.message);
    return Promise.reject(error);
  },
);

export default service;
