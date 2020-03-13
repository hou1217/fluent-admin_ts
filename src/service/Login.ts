import axios from 'axios'
let instance = axios.create();
const APP_HOST = process.env.VUE_APP_APP_HOST;
export default{
  loginPhone(params){
    console.log('调用登录接口');
    console.log(params);
    localStorage.setItem('USER_NAME', params.appUid || params.phoneNum);
    
    let url = APP_HOST + '/security-app/authenticate/login/phone';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      }).then((res) => {
        console.log(res);
     
        if(res.data.state === '000000'){
          this.setSession(
            {
              "WALLAN-TOKEN": res.data.data.authToken,
              "ROLE-LIST": res.data.data.roleList?res.data.data.roleList:[]
            }
          );
          resolve(res.data);
         
        }else{
          reject(res)
        }
      }).catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  setSession(params) {
    if (typeof params === 'object') {
      localStorage.setItem('ticket', JSON.stringify(params));
    }
  },
}
