<template>
  <div class="sign">
    <ul class="register">
      <li @click="sn(0)" :class="{sactive:0==sg}">
        <input type="text" id="tel" placeholder="请输入您的手机号码" v-model.trim="sum" />
        <span id="tels"></span>
      </li>
      <li @click="sn(1)" :class="{sactive:1==sg}" class="sign1">
        <input type="text" id="code" placeholder="请输入图形验证码" v-model.trim="sg2" />
        <span id="sgs"></span>
        <div class="signcode">
          <span class="signcode1"></span>
          <span class="signcode2"></span>
          <span class="signcode3"></span>
          <span class="signcode4"></span>
        </div>
      </li>
      <li @click="sn(2)" :class="{sactive:2==sg}">
        <input type="password" id="password" placeholder="请输入密码" v-model.trim="sum1" />
        <span id="psw"></span>
      </li>
      <li @click="sn(3)" :class="{sactive:3==sg}">
        <input type="password" id="passwordTwo" placeholder="请再次输入密码" v-model.trim="sum2" />
        <span id="psw1"></span>
      </li>
      <li class="signz" @click="ensure()">注册</li>
      <li class="signr">
        已有账号，
        <router-link to="/Login">登录></router-link>
      </li>
      <Modal title="警告" v-model="modal9" class-name="vertical-center-modal">
        <p>请输入手机号码</p>
      </Modal>
      <Modal title="警告" v-model="modal8" class-name="vertical-center-modal">
        <p>请输入验证码</p>
      </Modal>
      <Modal title="警告" v-model="modal7" class-name="vertical-center-modal">
        <p>请输入密码</p>
      </Modal>
      <Modal title="警告" v-model="modal6" class-name="vertical-center-modal">
        <p>请确认密码</p>
      </Modal>
      <Modal title="警告" v-model="modal5" class-name="vertical-center-modal">
        <p>该账号已经被注册了，请重新输入账号</p>
      </Modal>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      sg:null,
      sg1:null,
      modal10: false,
      modal9: false,
      modal8: false,
      modal7: false,
      modal6: false,
      modal5: false,
      sum:null,
      sum1:null,
      sum2:null,
      sg2:null
    }
  },
  watch:{
      // 手机号
    sum(newName,oldName){
      var reg=/^[1][\d]{10}$/;
      var tels=document.getElementById("tels")
      if(reg.test(this.sum)){
        tels.innerHTML="手机号码正确！"
        tels.style.color="green"
      }else if(this.sum==""||this.sum==null){
        tels.innerHTML="手机号不能为空"
      }else{
        tels.innerHTML="号码格式不对，必须是数字"
        tels.style.color="red"
      }
    },
    sg2(newName,oldName){
      var sgs=document.getElementById("sgs")
      if(this.sg1==this.sg2){
        sgs.innerHTML="正确!"
        sgs.style.color="green"
      }else{
        sgs.innerHTML="错误"
        sgs.style.color="red"
      }
    },
    sum1(newName,oldName){
      var psw=document.getElementById("psw")
      var reg1 = /^[\W\da-zA-Z_]{6,15}$/;//密码 6--20位数字,字母,任意字符
      // 密码
      if(reg1.test(this.sum1)){  
        psw.innerHTML = "正确!";  
        psw.style.color="green"
      }  
      else if(this.sum1 =="" ){  
        psw.innerHTML = "密码不能为空!";  
      }  
      else{  
        psw.innerHTML = "密码长度在6-15位之间！";  
        psw.style.color="red"
      }  
    },
    sum2(newName,oldName){
      var psw1=document.getElementById("psw1")
      //确认密码
      if(this.sum2 == ''||this.sum1==null){
        psw1.innerHTML = '确认密码不能为空！';
        psw1.style.color = 'red';
        } else if(this.sum1 != this.sum2){
        psw1.innerHTML = '两次密码不相同';
        psw1.style.color = 'red';
        } else {
        psw1.innerHTML = '确认密码正确!';
        psw1.style.color = 'green';
      }
    }
  },
  methods:{
    sn(i){
      this.sg=i
    },
    ensure(){
      var tels=document.getElementById("tels")
      var psw=document.getElementById("psw")
      var psw1=document.getElementById("psw1")
      var sgs=document.getElementById("sgs")

      if(this.sum==null&& this.sg==null&& this.sum1==null && this.sum==null){
        this.modal9=true
      }else if(this.sum==null){
      this.modal9=true
      }else if(this.sg==null){
      this.modal8=true
      }else if(this.sum1==null){
      this.modal7=true
      }else if(this.sum2==null){
      this.modal6=true
      }else if(tels.innerHTML=="号码格式不对，必须是数字"){
        this.modal9=true
      }else if(psw.innerHTML=="密码长度在6-15位之间！"){
        this.modal7=true
      }else if(psw1.innerHTML=="两次密码不相同"){
        this.modal6=true
      }else if(sgs.innerHTML=="错误"){
        this.modal8=true
      }else{
        axios.get("http://localhost:3000/demand?id=" + this.sum).then((res) => {
            if(res.data.data.length>0){
              this.modal5=true
            }else{
              axios.get("http://localhost:3000/sign?id=" + this.sum +'&psd='+this.sum2).then((res) => {
              this.$router.push({path: 'My'});
              }).catch((err) => {
                console.log(err);
              });
          }
        }).catch((err) => {
          console.log(err);
        });
       
      }


    }
  },
  mounted(){
    var signcode1=document.getElementsByClassName("signcode1")[0]
    var signcode2=document.getElementsByClassName("signcode2")[0]
    var signcode3=document.getElementsByClassName("signcode3")[0]
    var signcode4=document.getElementsByClassName("signcode4")[0]
    signcode1.innerHTML=Math.floor(Math.random()*10)
    signcode2.innerHTML=Math.floor(Math.random()*10)
    signcode3.innerHTML=Math.floor(Math.random()*10)
    signcode4.innerHTML=Math.floor(Math.random()*10)
    this.sg1=(signcode1.innerHTML+signcode2.innerHTML+signcode3.innerHTML+signcode4.innerHTML)
  }
}
</script>

<style >
#sgs{
  position: absolute;
  right: 2rem;
  top: 0.2rem;
  color: red;
}
#tels,
#psw,
#psw1 {
  position: absolute;
  right: 0;
  top: 0.2rem;
  color: red;
  font-size: 0.24rem;
}
.sign1 {
  position: relative;
}
.signcode span {
  margin-left: 0.1rem;
}
.signcode {
  position: absolute;
  padding: 0.15rem 0.4rem;
  right: 0;
  bottom: 0px;
  font-size: 0.3rem;
  border: 0.02rem solid #ccc;
}
.signr {
  text-align: right;
  font-size: 0.24rem;
  border-bottom: none !important;
}
.signz {
  background: #e9546b;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: none;
  color: #fff;
}
.sactive {
  border-bottom: 0.01rem solid #e9546b !important;
}
.sign {
  width: 100%;
  background: #fff;
}
.register {
  width: 100%;
  padding-top: 0.6rem;
  padding-bottom: 0.4rem;
}
.register li {
  position: relative;
  overflow: hidden;
  width: 80%;
  margin: 0.3rem 10% 0;
  border-bottom: 0.02rem solid #dcdcdc;
}
.register input {
  width: 100%;
  outline: none;
  border: none;
  padding: 0.2rem;
}
</style>