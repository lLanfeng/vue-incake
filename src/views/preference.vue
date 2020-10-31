<template>
  <div class="preference">
    <div class="pnav">
      <img src="http://wap.incake.net/redactivity/image/logo.png" alt="">
      <router-link to="/">返回首页</router-link>
    </div>
    <div class="ptop">
      <img src="http://wap.incake.net/RedesignINCake/assets/imgs/szone/banner.png?ver=20000018" alt="">
    </div>

    <div class="pcont">
      <div class="ptitle">
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/szone/category_title_cake.png" alt="">
      </div>
      <div class="ptitles">
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/szone/category_title_tea.png" alt="">
      </div>
      <ul class="pconts">
        <li v-for="(pmsgs,index) in pmsg" :key="index">
          <router-link :to="'/Detail/'+pmsgs.id">
            <img :src="pmsgs.img" alt="">
          </router-link>
          <h2>{{pmsgs.title}}</h2>
          <p class="label">{{pmsgs.label}}</p>
          <p class="newprice">￥{{pmsgs.newprice}}/<span style="font-size:0.18rem">{{pmsgs.scale}}</span></p>
          <p class="oldprice">￥{{pmsgs.oldprice}}/{{pmsgs.scale}}</p>
          <p class="newprice" v-if="pmsgs.newprice1!=null">￥{{pmsgs.newprice1}}/<span>{{pmsgs.scale1}}</span></p>
          <p class="oldprice" v-if="pmsgs.oldprice1!=null">￥{{pmsgs.oldprice1}}/{{pmsgs.scale1}}</p>
          <p class="newprice" v-if="pmsgs.newprice2!=null">￥{{pmsgs.newprice2}}/<span>{{pmsgs.scale2}}</span></p>
          <p class="oldprice" v-if="pmsgs.oldprice2!=null">￥{{pmsgs.oldprice2}}/{{pmsgs.scale2}}</p>

          <p class="pfoot">
            <router-link :to="'/Detail/'+pmsgs.id" style="color:#fff">立即够买</router-link>
          </p>
        </li>
    </ul>
    </div>


  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      pmsg:[]
    }
  },
  mounted() {
    axios.get("http://localhost:3000/cheap").then((res)=>{
      console.log(res.data.data);
      this.pmsg=res.data.data
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>

<style>
.pfoot{
  position: absolute;
  width: 2rem;
  bottom: 0;
  left: 50%;
  padding: 0.1rem 0.2rem;
  background: #4fcce1;
  font-size: 0.24rem;
  border-radius: 0.4rem;
  color: #fff;
  margin-left: -1rem;
}
.newprice{
  color: #f8756a;
  font-size: 0.28rem;
}
.oldprice{
  color: #fff;
  font-size: 0.2rem;
  text-decoration: line-through;

}
.label{
  font-size: 0.18rem;
  color: #bfbebe;
}
.pconts li{
  width: 50%;
  float: left;
  position: relative;
  text-align: center;
  height: 7.5rem;
  padding-bottom: 1rem;
  margin-bottom: 0.6rem;
}
.pconts h2{
  font-size: 0.28rem;
  color: #f8756a;
}
.pconts li img{
  width: 2.68rem;
  height: 2.68rem;
  display: block;
  border-radius: 0.4rem;
  margin: 0 auto;
}
.ptitles{
  margin: 0.4rem 0;
  width: 100%;
  height: 0.45rem;
}
.ptitles img{
  display: block;
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.ptitle{
  width: 100%;
  height: 0.4rem;
}
.ptitle img{
  width: 80%;
  height: 100%;
  display: block;
  margin: 0 auto;
}
.pcont{
  width: 100%;
  height: 100%;
  max-width: 7.5rem;
  overflow: hidden;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/szone/bg.png");
}
.pnav{
  display: flex;
  justify-content: space-between;
  background: #e9546b;
  padding: 0.2rem ;
}
.pnav img{
  display: block;
  width: 1.4rem;
  height: 0.5rem;
}
.pnav a{
  color: #fff;
}
.ptop{
  width: 100%;
  height: 4.8226rem;
}
.ptop img{
  width: 100%;
  height: 100%;
}
</style>