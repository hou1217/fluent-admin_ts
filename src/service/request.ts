import axios from 'axios'
const APP_HOST = process.env.VUE_APP_APP_HOST;
const instance = axios.create({
  baseURL: APP_HOST,
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request.use( (config)=> {
  const ticket = localStorage.getItem('ticket');
  config.headers['WALLAN-TOKEN'] = ticket?JSON.parse(ticket)["WALLAN-TOKEN"]:'';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((res) => {
  console.log(res);
  if (res.data.state === '000000' ) {
    return res.data.data
  }else {
    return Promise.reject(res.data);
  }
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})

export default instance;
