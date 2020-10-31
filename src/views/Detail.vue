<template>
  <div class="Detail">
    <div class="navs">
      <!-- 轮播部分 -->
      <div class="nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="msg.img" alt />
            </div>
            <div class="swiper-slide">
              <img :src="msg.img1" alt />
            </div>
            <div class="swiper-slide">
              <img :src="msg.img2" alt />
            </div>
            <div class="swiper-slide">
              <img :src="msg.img3" alt />
            </div>
            <div class="swiper-slide">
              <img :src="msg.img4" alt />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- 价格 -->
      <div class="cont">
        <div class="cont-ft">
          <p>{{msg.title}}</p>
          <p>{{msg.label}}</p>
          <p>{{msg.titles}}</p>
        </div>
        <div class="cont-rt">
          <span v-if="msg3[del]!=null" class="cont-rt1">￥{{msg3[del]}}</span>
          <span>
            <b>￥</b>
            {{msg2[del]}}
          </span>
        </div>
      </div>

      <!-- 规格 -->
      <div class="cont-top">
        <p>请选择规格：</p>
        <p
          class="cont-set"
          v-if="msg.scale!=null"
          :class="{contsets:0==del}"
          @click="fn(0,msg.scale)"
        >{{msg.scale}}</p>
        <p
          class="cont-set"
          v-if="msg.scale1!=null"
          :class="{contsets:1==del}"
          @click="fn(1,msg.scale1)"
        >{{msg.scale1}}</p>
        <p
          class="cont-set"
          v-if="msg.scale2!=null"
          :class="{contsets:2==del}"
          @click="fn(2,msg.scale2)"
        >{{msg.scale2}}</p>
        <p
          class="cont-set"
          v-if="msg.scale3!=null"
          :class="{contsets:3==del}"
          @click="fn(3,msg.scale3)"
        >{{msg.scale3}}</p>
      </div>

      <!-- 数量 -->
      <div class="cont-num">
        <div class="cont-num1">数量：</div>
        <div class="cont-count">
          <i class="icn icn1" @click="fn2()"></i>
          <input type="text" :value="del1" />
          <Icon type="ios-add-circle" @click="fn1()" class="icn" />
        </div>
      </div>

      <!-- 加价购 -->
      <div class="cont-suggest">加价购</div>

      <!-- 描述 -->
      <div class="describe">
        <ul v-html="msg4[del]" class="cont-ms"></ul>
      </div>
    </div>

    <div class="dfoot" style="margin-bottom: 2rem">
      <div class="dfoot-top">
        <p>甜度:</p>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p v-if="msg.add!=null">
        <span class="kw">口味:</span>
        <span>{{msg.add}}</span>
      </p>
      <p v-if="msg.add1!=null">
        主要原料:
        <span>{{msg.add1}}</span>
      </p>
      <p v-if="msg.add2!=null">
        包装清单:
        <span>{{msg.add2}}</span>
      </p>
      <p v-if="msg.add3!=null">
        储存条件:
        <span>{{msg.add3}}</span>
      </p>

      <div class="d-show" v-if="msg.img5!=null">
        <img :src="msg.img5" alt />
      </div>
      <div class="d-show1" v-if="msg.img6!=null">
        <img :src="msg.img6" alt />
        <span>{{msg.add1}}</span>
      </div>
      <div class="d-show2" v-if="msg.img7!=null">
        <img :src="msg.img7" alt />
        <span>{{msg.add4}}</span>
      </div>
      <div class="d-show3" v-if="msg.img8!=null">
        <img :src="msg.img8" alt />
      </div>
      <div class="d-show4" v-if="msg.img9!=null">
        <img :src="msg.img9" alt />
      </div>
      <ul>
        <li>
          <img :src="msg.detailpic" alt />
          <div v-html="msg.suggest" class="del"></div>
        </li>
        <li>
          <img :src="msg.detailpic1" alt />
          <div v-html="msg.suggest1" class="del"></div>
        </li>
        <li>
          <img :src="msg.detailpic2" alt />
          <img :src="msg.suggest2" alt class="dels" />
        </li>
      </ul>
    </div>
    <ul class="pot">
      <li class="pot1"></li>
      <li class="pot2">
        <router-link to="/Car"></router-link>
      </li>
      <li class="pot3" @click="fn3()">加入购物车</li>
      <li class="pot4" @click="send()">立即购买</li>
    </ul>

    <!-- 遮罩层 -->
    <div class="delcover cer5">
      <div class="delcover1">
        <div class="cer">
          <span class="cer1"></span>
          <span>已成功加入购物篮，是否去结算？</span>
        </div>
        <div class="cer2">
          <p @click="fn4()">再逛逛</p>
          <p class="cer3" @click="send()">
        是
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swiper from "swiper";
export default {
  data() {
    return {
      msg: [],
      msg1: [],
      msg2: [],
      msg3: [],
      msg4: [],
      del: 0,
      del1: 1,
      car: null,
      car1: null,
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: 2000,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination",
      loop: true,
    });
    axios
      .get("http://localhost:3000/detail?id=" + this.$route.params.id)
      .then((res) => {
        this.car = res.data.data[0].scale;
        this.car1 = res.data.data[0].newprice;
        this.msg = res.data.data[0];
        this.msg2.push(
          this.msg.newprice,
          this.msg.newprice1,
          this.msg.newprice2,
          this.msg.newprice3
        );
        this.msg3.push(
          this.msg.oldprice,
          this.msg.oldprice1,
          this.msg.oldprice2,
          this.msg.oldprice3
        );
        this.msg4.push(
          this.msg.describe,
          this.msg.describe1,
          this.msg.describe2,
          this.msg.describe3
        );
        var a = document.querySelectorAll(".dfoot-top span");
        for (var i = 0; i < this.msg.bbt; i++) {
          a[i].classList.add("active1");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    fn(i, t) {
      this.del = i;
      this.car = t;
      this.car1 = this.msg2[i];
    },
    fn1() {
      this.del1++;
    },
    fn2() {
      this.del1--;
      if (this.del1 < 1) {
        this.del1 = 1;
      }
    },
    fn3() {
      var delcover = document.getElementsByClassName("delcover")[0];
      delcover.classList.remove("cer5");
      delcover.classList.add("cer6");
    },
    fn4() {
      var delcover = document.getElementsByClassName("delcover")[0];
      delcover.classList.remove("cer6");
      delcover.classList.add("cer5");
    },
    send() {
      axios
        .get(
          "http://localhost:3000/cars?title=" +
            this.msg.title +
            "&titles=" +
            this.msg.label +
            "&pic=" +
            this.msg.img +
            "&price=" +
            this.car1 +
            "&scale=" +
            this.car +
            "&num=" +
            this.del1 +
            "&judge=" +
            true
        )
        .then((res) => {
          this.$router.push({path:'/Car'})
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.cer5 {
  display: none;
}
.cer6 {
  display: block;
}
.cer3 a {
  color: #fff;
}
.cer2 {
  width: 100%;
  height: 0.76rem;
  line-height: 0.76rem;
}
.cer2 p {
  width: 50%;
  float: left;
  text-align: center;
  color: #fff;
}
.cer2 p:first-child {
  background: #f1b4be;
}
.cer2 p:last-child {
  background: #e7566d;
}
.cer {
  width: 100%;
  font-size: 0.24rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cer1 {
  width: 0.7rem;
  height: 0.7rem;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/detail/face.png")
    no-repeat;
  background-size: 100% 100%;
}
.delcover1 {
  margin-left: 20%;
  margin-top: 60%;
  width: 4.5rem;
  height: 2.56rem;
  overflow: hidden;
  background: #fff;
  border-radius: 0.1rem;
  border: 0.04rem solid #e7566d;
}
.delcover {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.7);
}
.icn1 {
  width: 0.45rem;
  height: 0.45rem;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/index/subtract-gay.png")
    no-repeat;
  background-size: 0.45rem 0.45rem;
}
.d-show4 {
  width: 100%;
  margin-bottom: 0.4rem;
}
.d-show3 {
  width: 100%;
  margin: 0.4rem 0;
  overflow: hidden;
}
.d-show3 img {
  display: block;
  width: 2.66rem !important;
  height: 1.22rem !important;
  margin: auto;
}
.d-show2 {
  width: 100%;
  margin: 0.3rem;
  overflow: hidden;
}
.d-show2 img {
  width: 1rem !important;
  height: 1.5rem !important;
  float: left;
}
.d-show1 {
  width: 100%;
  margin: 0.3rem;
  overflow: hidden;
}
.d-show1 img {
  width: 0.72rem !important;
  height: 0.5rem !important;
  float: left;
}
.d-show1 span,
.d-show2 span {
  float: left;
  color: #828282;
  font-size: 0.2rem !important;
}
.d-show {
  width: 100%;
}
.d-show img {
  display: block !important;
  height: 100% !important;
  padding: 0.4rem 10%;
  box-sizing: border-box;
}
.Detail {
  position: relative;
  text-align: left;
  color: #000;
  font-size: 0.28rem;
  background: #eee !important;
}
.navs,
.dfoot {
  background: #fff;
}
/* 轮播 */
.swiper-container {
  width: 100%;
  height: 7.5rem;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper-slide img {
  width: 100%;
  height: 7.5rem;
  display: block;
}

/* 标题 */
.cont {
  width: 100%;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #000;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  border-bottom: 0.01rem solid #ddd;
}
.cont-ft {
  text-align: left;
}
.cont-ft p:first-child {
  font-size: 0.36rem;
  font-weight: bold;
}
.cont-ft p:last-child {
  margin-top: 0.3rem;
}
.cont-rt {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.cont-rt1 {
  color: #b3b3b3;
  font-size: 0.24rem;
  font-weight: bold;
  text-decoration: line-through;
}
.cont-rt span:last-child {
  display: inline-block;
  font-size: 0.3rem;
  font-weight: bolder;
  margin-top: 0.6rem;
  margin-left: 0.2rem;
  color: #e9546b;
}
.cont-rt b {
  font-size: 0.28rem;
  color: #e9546b;
}

/* 规格 */
.cont-top {
  padding: 0.3rem;
  border-bottom: 0.01rem solid #ddd;
}
.cont-top p:first-child {
  font-weight: bolder;
  font-size: 0.25rem;
  margin-bottom: 0.3rem;
}
.cont-set {
  display: inline-block;
  padding: 0.15rem 0.3rem;
  margin-right: 0.4rem;
  position: relative;
  color: #828282;
  border: 0.01rem solid #828282;
}
.contsets {
  color: #e9546b;
  border: 0.01rem solid #e9546b;
}
.cont-set:first-child {
  margin-right: 0;
}
.cont-set::after {
  display: block;
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  background-image: url(http://wap.incake.net/RedesignINCake/assets/imgs/detail/icon_special.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}

/* 数量 */
.cont-num {
  width: 100%;
  padding: 0.3rem;
  position: relative;
  border-bottom: 0.01rem solid #ddd;
  padding-bottom: 0.5rem;
}
.cont-num1 {
  font-weight: bold;
}
.cont-count {
  width: 70%;
  position: absolute;
  right: 0.4rem;
  top: 0.4rem;
  display: flex;
  align-items: center;
}
.icn {
  margin: 0 0.1rem;
  font-size: 0.5rem;
}
.cont-count input {
  outline: none;
  border: none;
  text-align: center;
  background: #e5e5e5;
}

/* 加价 */
.cont-suggest {
  width: 100%;
  padding: 0.3rem;
  border-bottom: 0.01rem solid #ddd;
}
/* 描述 */
.describe {
  width: 100%;
  overflow: hidden;
}
.cont-ms {
  width: 100%;
  padding: 0.2rem 0;
  margin-left: 30px;
  font-size: 0.24rem;
  color: #898989;
}

/* 底部 */
.dfoot {
  margin-top: 0.4rem;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.kw {
  display: block;
  width: 0.56rem;
  text-align: right;
  float: left;
  color: #000;
  font-weight: bold !important;
  margin-left: 0.5rem !important;
}
.dfoot p {
  font-size: 0.24rem;
  margin-left: 0.3rem;
  padding: 0.2rem 0;
  color: #000;
  font-weight: bold;
}
.dfoot span {
  font-size: 0.24rem;
  margin-left: 0.2rem;
  font-weight: normal;
}
.dfoot-top {
  width: 100%;
  overflow: hidden;
  margin-left: 0.5rem;
}
.dfoot-top p:first-child {
  float: left;
  margin-right: 0.2rem;
}
.dfoot-top span {
  margin-top: 0.15rem;
  margin-left: 0 !important;
  display: block;
  float: left;
  width: 0.4rem;
  height: 0.5rem;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/icon_sweet.png")
    no-repeat;
  background-size: 100% 100%;
}
.active1 {
  background: url(http://wap.incake.net/RedesignINCake/assets/imgs/icons/icon_sweet_active.png)
    no-repeat !important;
  background-size: 100% 100% !important;
}
.dfoot img {
  width: 100%;
  display: block;
  height: 4.4444rem;
}
.del {
  width: 100%;
  padding: 0.3rem;
  font-size: 0.24rem;
  color: #828282;
  line-height: 2.5;
}
.dels {
  width: 100%;
  margin-top: 0.6rem;
  height: 2.4rem !important;
}

.pot {
  position: fixed;
  width: 100%;
  height: 0.95rem;
  line-height: 0.95rem;
  text-align: center;
  bottom: 0;
  background: #fff;
}
.pot li {
  list-style: none;
  float: left;
}
.pot1,
.pot2 {
  display: block;
  width: 14%;
  height: 0.95rem;
}
.pot1 {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/detail/heart.png")
    no-repeat;
  background-size: 100% 100%;
}
.pot2 {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/detail/shop.png")
    no-repeat;
  background-size: 100% 100%;
}
.pot3,
.pot4 {
  width: 36%;
  color: #fff;
}
.pot3 {
  background: #e9546b;
  font-size: 0.24rem;
}
.pot4 {
  background: #f2b4be;
  font-size: 0.28rem;
}
.pot2 a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

