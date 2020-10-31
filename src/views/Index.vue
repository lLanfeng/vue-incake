<template>
  <div class="hello">
    <div class="cake">
      <!-- 遮罩层 -->
      <transition name="slide-fade">
        <div class="cover" v-if="show" @click="show=!show"></div>
      </transition>

      <transition name="slide-fade1">
        <div class="cover1" v-if="show">
          <div class="cover-tp">
            <p class="cover-lt">请选择配送的城市</p>
            <p class="cover-rt">
              您当前所在城市:
              <span>郑州市</span>
            </p>
          </div>
          <ul class="cover-ft">
            <li v-for="(navs,index) in nav" :key="index" @click="fn(navs.title,navs.tabs)"  v-on:click="show=!show">
              <router-link :to="'/index?tab='+navs.tabs" :class="{active:navs.title==item}">{{navs.title}}</router-link>
            </li>
          </ul>
        </div>
      </transition>

      <transition name="slide-fade">
        <div class="cover" v-if="num1" v-on:click="num1=!num1"></div>
      </transition>
      <transition name="slide-fade1">
        <div class="cover2" v-if="num1">
          <div class="type">
            <p>商品</p>
            <span >全部</span>
          </div>
          <div class="type-ft">
            <p>口味</p>
            <ul>
              <li v-for="(types,index) in type" :key="index" @click="fn1(types.title,types.tabs)" :class="{active:types.title==num}" v-on:click="num1=!num1" >{{types.title}}</li>
            </ul>
          </div>
        </div>
      </transition>

      <!-- 头部 -->
      <div class="top">
        <div class="top-one">
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/location_bg.png" alt />
          <span @click="show=!show">{{item}}</span>
          <i></i>
        </div>
        <div class="top-two">
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/logo_bg.png" alt />
        </div>
      </div>
      <!-- 轮播部分 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="overflow:hidden">
            <img src="http://img.incake.net/UpImages/img1/202069/wx2020060916071710313.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="http://img.incake.net/UpImages/img1/2020319/wx2020031917583152412.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="http://img.incake.net/UpImages/img1/20191115/wx2019111515133988751.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="http://img.incake.net/UpImages/img1/20191227/wx2019122711204934654.jpg" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>

      <!-- 分类 -->
      <ul class="sort">
        <li>
          <router-link to="/preference">
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/entries/icon1.png" alt />
          </router-link>
          <p>特惠商城</p>
        </li>
        <li>
          <a href>
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/entries/icon3.png" alt />
          </a>
          <p>人气排行</p>
        </li>
        <li>
          <a href>
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/entries/icon4.png" alt />
          </a>
          <p>下午茶</p>
        </li>
        <li>
          <a href>
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/entries/icon5.png" alt />
          </a>
          <p>卡券兑换</p>
        </li>
      </ul>

      <!-- 商品列表头部 -->
      <div class="list">
        <div class="list-top">
          <div class="top-left">
            <span>全部</span>
          </div>
          <div class="top-right" @click="num1=!num1" v-if="item!='全国'">
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/index/screen.png" alt />
            <span>筛选</span>
          </div>
        </div>
      </div>

      <!-- 内容部分 -->
      <div class="content">
        <ul class="cont-list" v-if="msg.length">
          <li v-for="(msgs,index) in msg" :key="index">
            <span class="cont-dw"></span>
            <router-link :to="'/Detail/'+msgs.id">
              <img :src="msgs.imgurl" alt />
            </router-link>
            <div>
              <h2>{{msgs.title}}</h2>
              <p>{{msgs.label}}</p>
              <div>
                <span class="cont-cl">￥{{msgs.price}}</span>
                <span class="cont-ft">{{msgs.scale}}</span>
                <a href class="cont-bt">
                  <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/car.png" alt />
                </a>
              </div>
            </div>
          </li>
        </ul>
        <h2 v-else>抱歉，商品已售空</h2>
      </div>

      <!-- 底部 -->
      <ul class="foot">
        <li>
          <router-link :to="'/index?tab='+num3"></router-link>
        </li>
        <li>
          <router-link :to="'/Car/'+num3"></router-link>
        </li>
        <li @click="isend()">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: [],
      show: false,
      nav: [
        {
          title: "上海市",
          tabs: "sh",
        },
        {
          title: "福州市",
          tabs: "fz",
        },
        {
          title: "厦门市",
          tabs: "xm",
        },
        {
          title: "青岛市",
          tabs: "qd",
        },
        {
          title: "全国",
          tabs: "all",
        },
      ],
      navs:null,
      item: "全国",
      type: [
        {
          title: "芝士系列",
          tabs: "1",
        },
        {
          title: "巧克力系列",
          tabs: "2",
        },
        {
          title: "拿破仑系列",
          tabs: "3",
        },
        {
          title: "慕斯系列",
          tabs: "4",
        },
        {
          title: "乳脂系列",
          tabs: "5",
        },
        {
          title: "选拼系列",
          tabs: "6",
        },
      ],
      num: "",
      num1: false,
      num2:[],
      num3:"all"
    };
  },
  methods: {
    fn(n,t) {
      this.item = n;
      this.navs=t
      this.num3=t
      this.getData(t);
    },
    fn1(t, s) {
      this.num = t;
      // var one=i+1
      this.msg=[]
      for(var i=0;i<this.num2.length;i++){
        if(s==this.num2[i].tabs){
          this.msg.push(this.num2[i])
        }
      }
      console.log(this.msg);
    },
    // 判断是否登录
    isend(){
      console.log(localStorage.getItem("tel"));
      if(localStorage.getItem("tel")==null){
        this.$router.push({path: 'Login?tab='+this.num3});
      }else{
        this.$router.push({path: 'My/'+this.num3});
      }
    },
    getData(i) {
      axios.get("http://localhost:3000/index?id=" + i).then((res) => {
          this.msg = res.data.data;
          this.num2=res.data.data

        }).catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var b=this.$route.query.tab
    this.item=(b=="qd"?"青岛":b=="sh"?"上海":b=="fz"?"福州":b=="xm"?"厦门":"全国")
    new Swiper(".swiper-container", {
      autoplay: 2000,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination",
      loop: true,
    });
    this.getData(this.$route.query.tab);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide{
  width: 100%;
  overflow: hidden;
}
.swiper-slide img{
  width: 100%;
  overflow: hidden;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.sort li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.swiper-container {
  width: 100%;
  height: 4.26rem;
  overflow: hidden;
  position: relative;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper-slide img {
  width: 100%;
  height: 4.26rem;
  display: block;
}

/* 头部 */
.top {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  background: #e9546b;
}
.top-one {
  width: 3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #fff;
  float: left;
  padding-top: 0.15rem;
  display: flex;
  align-items: center;
  font-size: 0.28rem;
  position: relative;
  left: 0.4rem;
}
.top-one img {
  display: inline-block;
  width: 0.2rem;
  height: 0.3rem;
  align-self: center;
}
.top-one span {
  width: 30%;
}
.top-one i {
  width: 0;
  height: 0;
  display: inline-block;
  margin-top: 0.2rem;
  border: 0.2rem solid transparent;
  border-top-color: #fff;
}
.top-two {
  float: left;
  width: 1.92rem;
  height: 0.62rem;
  padding-top: 0.14rem;
  line-height: 0.62rem;
}
.top-two img {
  width: 1.92rem;
}

/* 分类 */
.sort {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0;
  box-shadow: 0 0 0.133333rem 0.066667rem #ffe0e5;
}

.sort a img {
  width: 0.8198rem;
  height: 0.8198rem;
}

/* 商品列表 */
.list {
  width: 100%;
  height: 0.75rem;
  line-height: 0.75rem;
  box-sizing: border-box;
  padding: 0.2rem 0;
  margin-top: 0.2rem;
  border-top: 0.01rem solid #eee;
}
.list-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.top-left {
  text-align: left;
  width: 70%;
}
.top-left span {
  width: 1.42rem;
  height: 0.56rem;
  padding: 0.1rem 0.4rem;
  margin-left: 0.4rem;
  border-radius: 0.3rem;
  border: 1px solid #e9546b;
  color: #e9546b;
  font-size: 0.24rem;
}
.top-right {
  margin-right: 0.1rem;
  width: 20%;
  text-align: center;
  height: 0.75rem;
  line-height: 0;
  overflow: hidden;
  font-size: 0.24rem;
  border-left: 0.01rem solid #ddd;
  border-right: 0.01rem solid #ddd;
}
.top-right img {
  width: 0.36rem;
  height: 0.38rem;
}
.top-right span {
  display: block;
  margin-top: 0.2rem;
}

/* 内容 */
.content {
  width: 100%;
  overflow: hidden;
  margin: 0.4rem 0;
  padding-bottom: 2rem;
}
.cont-list {
  width: 100%;
}
.cont-list li {
  position: relative;
  width: 3.5rem;
  float: left;
  text-align: left;
  margin: 0.1rem 0 0.1rem 0.15rem;
  border: 0.01rem solid #ddd;
}
.cont-list div {
  overflow: hidden;
}
.cont-list img {
  display: block;
  width: 100%;
  height: 3.5rem;
}
.cont-list h2 {
  font-size: 0.26rem;
  margin-top: 0.1rem;
}
.cont-list p {
  font-size: 0.18rem;
  margin-top: 0.1rem;
}
.cont-cl {
  color: #e9546b !important;
  margin-right: 0.2rem;
}
.cont-ft{
  margin-top: 0.34rem !important;
}
.cont-list span {
  float: left;
  display: block;
  font-size: 0.24rem;
  margin-top: 0.3rem;
  color: #000;
}
.cont-bt {
  width: 100%;
}
.cont-bt img {
  display: block;
  float: right;
  margin-right: 0.1rem;
  width: 0.6998rem;
  height: 0.6998rem;
}
.cont-dw {
  position: absolute;
  float: none !important;
  width: 0.5rem;
  height: 0.5rem;
  left: 0.1rem;
  border-radius: 50%;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/index/live.png")
    no-repeat;
  background-size: cover;
}

/* 底部 */
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
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/home.png") no-repeat;
}
.foot li:nth-child(2){
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/shopping-basket.png") no-repeat;
}
.foot li:last-child{
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/mine.png") no-repeat;
}
.foot a{
  width: 100%;
  height: 100%;
  display: block;
}
/* 遮罩层 */
.cover {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2222;
}
.cover1 {
  position: fixed;
  left: 30%;
  top: 0;
  bottom: 0;
  right: 0;
  width: 70%;
  height: 100%;
  background: #f2f2f2;
  z-index: 3333;
}
.cover-tp {
  width: 90%;
  padding: 1.6rem 0 0.4rem 0.4rem;
  text-align: left;
  font-size: 0.24rem;
  border-bottom: 0.01rem solid #ddd;
}
.cover-lt {
  font-size: 0.28rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.cover-rt span {
  border-color: #e9546b;
  background-color: #e9546b;
  color: #fff;
  padding: 0.16rem 0.26rem;
  border-radius: 0.2rem;
}
.cover-ft {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
}
.cover-ft li {
  width: 23%;
  margin: 0.2rem 2%;
  font-size: 0.24rem;
  border-radius: 0.2rem;
}
.cover-ft>li>a{
  padding: 0.2rem;
  border-radius: 0.2rem;
  border: 0.02rem solid #4f4f4f;
  color: #4f4f4f;
  width: 100%;
  height: 100%;
  display: block;
}
.active {
  color: white !important;
  border-color: #e9546b !important;
  background-color: #e9546b !important;
}
.cover2 {
  position: fixed;
  left: 25%;
  top: 0;
  bottom: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background: #f2f2f2;
  z-index: 3333;
  text-align: left;
  padding-top: 0.8rem;
  font-size: 0.24rem;
  padding-left: 0.2rem;
}
.type {
  border-bottom: 0.01rem solid #ddd;
}
.type span {
  display: inline-block;
  margin-top: 0.3rem;
  border-radius: 0.2rem;
  color: #4f4f4f;
  padding: 0.1rem 0.4rem;
  border: 0.02rem solid #4f4f4f;
  margin-bottom: 0.2rem;
}
.type-ft p {
  margin-top: 0.4rem;
  font-weight: bold;
}
.type-ft ul {
  margin-top: 0.3rem;
}
.type-ft li {
  text-align: center;
  display: inline-block;
  width: 29%;
  padding: 0.1rem 0.2rem;
  margin: 0.2rem 0.1rem;
  font-size: 0.22rem;
  border: 0.02rem solid #4f4f4f;
  border-radius: 0.2rem;
}
/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.8s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade1-enter-active {
  transition: all 0.5s;
}
.slide-fade1-leave-active {
  transition: all 0.5s;
}
.slide-fade1-enter {
  transform: translateX(70%);
  opacity: 0;
}
.slide-fade1-leave-to {
  transform: translateX(70%);
  opacity: 0;
}
</style>
