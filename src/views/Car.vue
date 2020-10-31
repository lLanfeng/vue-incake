<template>
  <div class="car">
    <div v-if="cmsg1.length" class="car1">
      <ul class="cars">
        <li v-for="(cmsgs,index) in cmsg1" :key="index">
          <span class="carsb" @click="cfn(index)"></span>
          <img :src="cmsgs.img" alt class="carsp" />
          <div class="carms">
            <p>{{cmsgs.title}}</p>
            <p>{{cmsgs.titles}}</p>
            <p>规格：&nbsp;￥{{cmsgs.price}}/{{cmsgs.scale}}</p>
            <span @click="cremove(index)">-</span>
            <input type="text" :value="cmsgs.num" />
            <span @click="cadd(index)">+</span>
          </div>
          <div>￥{{cmsgs.price}}</div>
          <img
            class="carsp1"
            src="http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/delete.png"
            alt
            @click="cdel(cmsgs.id)"
          />
        </li>
      </ul>
      <div class="cwhite"></div>
      <div class="settle">
        <span class="carsb carsb1" @click="cfn"></span>
        <span style="color:#d42237">全选</span>
        <span>已有{{price.length}}件商品</span>
        <span>
          共￥
          <b style="color:#d42237" class="end">0</b>
        </span>
        <span class="cset" @click="over">去结算</span>
      </div>
      <div class="cpic">
        <img
          src="http://wap.incake.net/RedesignINCake/assets/imgs/detail/small-program-code.jpg"
          alt
        />
      </div>
      <ul class="cfoot">
        <li>
          <router-link :to="'/index?tab='+num3"></router-link>
        </li>
        <li>
          <router-link to="/Car"></router-link>
        </li>
        <li>
          <router-link to="/Login"></router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <img
        src="http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/hint.png"
        alt
        class="carpic"
      />
      <router-link to="/">
        <img
          src="http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/stroll.png"
          alt
          class="carpic1"
        />
      </router-link>
    </div>
    <Modal title="警告" v-model="modal" class-name="vertical-center-modal">
      <p>商品已购买，欢迎下次光临。
        3秒后将跳转首页
      </p>
    </Modal>
    <Modal title="警告" v-model="modal1" class-name="vertical-center-modal">
      <p>请先添加商品</p>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cmsg1: [],
      set: [],
      remove: true,
      price: [],
      num: [],
      str:0,
      num3:null,
      modal:false,
      modal1:false
    };
  },
  methods: {
    cremove(i) {
      if (this.cmsg1[i].judge == false) {
        var c=this.num.indexOf(this.cmsg1[i].id)
        this.cmsg1[i].num = --this.cmsg1[i].num;
        this.set[c] = this.cmsg1[i].price * this.cmsg1[i].num;
        var str=0
        for(var b=0;b<this.set.length;b++){
          str+=this.set[b]
        }
        var end = document.getElementsByClassName("end")[0];
        end.innerHTML = str;
      } else {
        this.cmsg1[i].num--;
      }
      if (this.cmsg1[i].num <= 1) {
        this.cmsg1[i].num = 1;
        var c=this.num.indexOf(this.cmsg1[i].id)
        this.set[c] = this.cmsg1[i].price * this.cmsg1[i].num;
        console.log(111,this.set,this.num);
        var str=0
        for(var b=0;b<this.set.length;b++){
          str+=this.set[b]
        }
        var end = document.getElementsByClassName("end")[0];
        end.innerHTML = str;
      }
    },
    cadd(i) {
      if (this.cmsg1[i].judge == false) {
        var c=this.num.indexOf(this.cmsg1[i].id)
        this.cmsg1[i].num = ++this.cmsg1[i].num;
        this.set[c] = this.cmsg1[i].price * this.cmsg1[i].num;
        var str=0
        for(var b=0;b<this.set.length;b++){
          str+=this.set[b]
        }
        var end = document.getElementsByClassName("end")[0];
        end.innerHTML = str;
      } else {
        this.cmsg1[i].num++;

      }
    },
    cfn(i) {
      var carsb = document.getElementsByClassName("carsb")[i];
      this.cmsg1[i].judge = !this.cmsg1[i].judge;
      if (this.cmsg1[i].judge == false) {
        carsb.classList.add("cactive");
        this.price.push(this.cmsg1[i].price);
        this.num.push(this.cmsg1[i].id,);
        this.set.push(this.cmsg1[i].price * 1 * this.cmsg1[i].num);
      } else {
        carsb.classList.remove("cactive");
        this.price.splice(this.price.indexOf(this.cmsg1[i].price), 1);
        this.num.splice(this.num.indexOf(this.cmsg1[i].id), 1);
        this.set.splice(this.set.indexOf(this.cmsg1[i].price * 1 * this.cmsg1[i].num),1);
      }



      // 全选
      if(this.price.length==this.cmsg1.length){
        var carsb1=document.getElementsByClassName("carsb1")[0];
        carsb1.classList.add("cactive");
      }else{
        var carsb1=document.getElementsByClassName("carsb1")[0];
        carsb1.classList.remove("cactive");
      }
    },
    // 删除事件
    cdel(b) {
      axios.get("http://localhost:3000/del?id=" + b).then((res) => {
          for (var i = 0; i < this.cmsg1.length; i++) {
            if (this.cmsg1[i].id == b) {
              this.cmsg1.splice(i, 1);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 结算
    over(){
      if(this.price.length>0){
        this.modal=true        
      }else{
        this.modal1=true
      }
    }
  },
  mounted() {
    this.num3=this.$route.params.id
    axios
      .get("http://localhost:3000/car")
      .then((res) => {
        this.cmsg1 = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch:{
    'set':{
      handler:function(val,oldval){
        var str=0
        for(var i=0;i<val.length;i++){
          str+=val[i]
        }
        var end = document.getElementsByClassName("end")[0];
        end.innerHTML = str;
      },
      deep:true
    }
  }
};
</script>

<style >
.cset {
  width: 2.3rem;
  height: 100%;
  background: #e9546b;
  color: #fff;
  margin: 0;
}
.settle b {
  font-size: 0.3rem;
  font-weight: normal;
}
.settle {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  position: fixed;
  bottom: 0.96rem;
  background: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.settle span {
  margin-left: 0.2rem;
}
.cpic {
  margin-top: 0.4rem;
  width: 100%;
  height: 2.4rem;
  margin-bottom: 4rem;
}
.cpic img {
  width: 100%;
  display: block;
}
.car1 {
  margin-bottom: 2rem;
}
.cwhite {
  width: 100%;
  margin-top: 0.4rem;
  height: 1rem;
  background: #fff;
}
.cactive {
  background: url(http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/like.png)
    no-repeat !important;
  background-size: 100% 100% !important;
}
.carsp1 {
  display: block;
  width: 0.4rem;
  height: 0.5rem;
}
.carms span {
  display: block;
  float: left;
  text-align: center;
  padding: 0 0.1rem;
  height: 0.4rem;
  border: 0.02rem solid #dcdcdc;
}
.carms span:first-child {
  border-right: none;
}
.carms span:last-child {
  border-left: none;
}
.carms input {
  float: left;
  width: 1rem;
  height: 0.4rem;
  outline: none;
  border: none;
  text-align: center;
  border: 0.02rem solid #dcdcdc;
}
.carms p:first-child {
  font-size: 0.24rem;
}
.carms p:nth-child(2) {
  font-size: 0.16rem;
  margin-bottom: 0.2rem;
}
.carms p:nth-child(3) {
  font-size: 0.22rem;
  color: #b4b4b4;
  margin-bottom: 0.2rem;
}
.carms {
  text-align: left;
}
.carsb {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/no-like.png")
    no-repeat;
  background-size: 100% 100%;
}
ul,
li {
  list-style: none;
}
body {
  background: #f5f5f5;
}
.carsp {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
}
.car {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.cars {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/shopping-cart/convention.png")
    no-repeat;
  background-size: 1.2rem 0.3rem;
  background-position: 1.2rem 0;
  margin-bottom: 0.5rem;
}
.cars li {
  display: flex;
  align-items: center;
  height: 2.2rem;
  background: #fff;
  border-bottom: 0.02rem solid #dcdcdc;
  justify-content: space-around;
}
.carpic {
  margin-top: 4rem;
  width: 100%;
  height: 3rem;
  display: block;
}
.carpic1 {
  display: block;
  margin: 0 auto;
  width: 2.5rem;
  height: 1.5rem;
}
.cfoot {
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
.cfoot li {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-size: cover !important;
}
.cfoot li:first-child {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/home01.png")
    no-repeat;
}
.cfoot li:nth-child(2) {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/shopping.png")
    no-repeat;
}
.cfoot li:last-child {
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/mine.png")
    no-repeat;
}
.cfoot a {
  width: 100%;
  height: 100%;
  display: block;
}
</style>