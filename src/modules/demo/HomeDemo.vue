<template>
  <div>
    <h3 class="title">ts实例应用演示</h3>
    <div class="list">
      <router-link to="/table" tag="li">table实例</router-link>
      <router-link to="/form" tag="li">form实例</router-link>
      <router-link to="/modal" tag="li">modal实例</router-link>
    </div>
  </div>
  
</template>
<script lang="ts">
  import LoginApi from '@/service/Login'
  import md5 from "md5";
  import Vue from 'vue';
  export default Vue.extend({
    created() {
      this.login();
    },
    methods:{
      login(){
        //调用登陆接口
        let params = {
          phone: '15068833279',
          passwordMd5: md5('111111')
        };
        
        LoginApi.loginPhone(params).then((res) => {
          console.log('登陆成功');
        }).catch((err)=>{
          console.error('数据异常：', err);
        });
      }
    }
  })
</script>
<style scoped>
  .title{
    text-align: center;
    margin:20px 0;
  }
  .list{
    margin-top:100px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .list li{
    cursor: pointer;
    border:1px solid #ccc;
    text-align: center;
    width:100px;
    height:100px;
    line-height:100px;
  }
</style>