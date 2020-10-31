<template>
  <div class="mine">
    <div class="minep">
      <img src="http://wap.incake.net/RedesignINCake/assets/imgs/login/login_header.jpg" alt="">
    </div>

    <ul class="medl">
      <li>
        <input type="text" id="user" placeholder="请输入您的手机号码" v-model.trim="lnum">
        <span id="lnum1"></span>
      </li>
      <li>
        <input type="password" name="" id="pwd" placeholder="请输入密码" v-model.trim="lnum1">
      </li>
      <li class="mepsd">
        <span>忘记密码></span>
      </li>
      <li class="medls" @click="login">
        登录
      </li>
      <li class="mezc">
        <router-link to="/Sign">立即注册</router-link>
      </li>
    </ul>
    <Modal title="警告" v-model="modal9" class-name="vertical-center-modal">
      <p>请输入手机号码</p>
    </Modal>
    <Modal title="警告" v-model="modal8" class-name="vertical-center-modal">
      <p>请输入密码</p>
    </Modal>  
    <Modal title="警告" v-model="modal7" class-name="vertical-center-modal">
      <p>当前账号未注册，请先注册</p>
    </Modal>
    <Modal title="警告" v-model="modal6" class-name="vertical-center-modal">
      <p>密码错误，请重试</p>
    </Modal>   
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      lnum:null,
      lnum1:null,
      modal9:false,
      modal8:false,
      modal7:false,
      modal6:false,
      hnum:null
    }
  },
  methods:{
    login(){
      if(this.lnum==null&& this.lnum1==null){
        this.modal9=true
      }else if(this.lnum1==null){
        this.modal8=true
      }else{                                                       
        axios.get("http://localhost:3000/demand?id=" + this.lnum).then((res) => {
            if(res.data.data.length==0){
              this.modal7=true
            }else{
              if(res.data.data[0].password!=this.lnum1){
                this.modal6=true
              }else{
              this.$router.push({path: 'My/'+this.hnum});
              localStorage.setItem("tel",this.lnum)
              }
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  },
  mounted(){
    this.hnum=this.$route.query.tab
  }
}
</script>

<style scoped>
.lnum{
  position: absolute;
  right: 0;
  top: 0;
  color: red;
}
.medls{
  width: 100%;
  color: #fff;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #e9546b;
}
.mezc a{
  color: #fff;
}
.mezc{
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
  background: #f8cbd2;
}
.mepsd{
  text-align: right;
  color: #3c78c8;
  font-size: 0.24rem;
}
.medl{
  background: #fff;
 padding-bottom: 0.4rem;
}
.medl li{
  width: 80%;
  position: relative;
  margin: 0 10%;
  margin-bottom: 0.4rem;
}
.medl input{
  display: block;
  width:100%;
  border: 0;
  outline: none;
  padding: 0.2rem 0;
  border-bottom: 0.02rem solid #828282;
}
.minep{
  display: block;
  width: 100%;
  height: 1.5rem;
}
.minep img{
  width: 100%;
  height: 100%;
}
.mine{
  width: 100%;
  overflow: hidden;
}
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  height: 0.96rem;
  display: flex;
  border-top: 0.01rem solid #ddd;
  justify-content: space-around;
  align-items: center;
}
.foot li{
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-size: cover !important;
}
.foot li:first-child{
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/home01.png") no-repeat;
}
.foot li:nth-child(2){
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/shopping.png") no-repeat;
}
.foot li:last-child{
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/mine.png") no-repeat;
}
.foot a{
  width: 100%;
  height: 100%;
  display: block;
}
</style>