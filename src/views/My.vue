<template>
  <div class="my">
    <div class="mtop">
      <div class="mtop1">
        <img src="http://wap.incake.net/user/imgs/me/head_default.jpg" alt="" class="mtoppic">
        <ul class="mtop2">
          <li>
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/me.png" alt="">
            <span>{{mess}}</span>
          </li>
          <li>
            <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/me-intergral.png" alt="">
            <span>5</span>
          </li>
        </ul>
      </div>
      <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/right.png" alt="" class="mtoppic1">
    </div>

    <!-- 待支付 -->
    <ul class="pay">
      <li>
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/pay.png" alt="">
        <p>待支付</p>
      </li>
      <li>
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/shipments.png" alt="">
        <p>代发货</p>
      </li>
      <li>
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/packages.png" alt="">
        <p>待收货</p>
      </li>
      <li>
        <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/estimate.png" alt="">
        <p>待评价</p>
      </li>
    </ul>


    <!-- 收藏 -->
    <ul class="collect">
      <li>
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/order.png" alt="">
          <span>全部订单</span>
        </div>
        <p>
          <span>查看全部已购商品</span>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>
      <li>
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/coupon.png" alt="">
          <span>我的优惠券</span>
        </div>
        <p>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>
      <li>
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/like.png" alt="">
          <span>我的喜欢</span>
        </div>
        <p>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>
      <li style="margin: 0.4rem 0 0">
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/integral.png" alt="">
          <span>我的积分</span>
        </div>
        <p>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>

      <li>
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/gift.png" alt="">
          <span>兑换专区</span>
        </div>
        <p>
          <span>积分商城</span>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>

      <li style="margin:0.4rem 0">
        <div>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/me/setting.png" alt="">
          <span>设置</span>
        </div>
        <p>
          <span>修改密码、设置发货地址和发票</span>
          <img src="http://wap.incake.net/RedesignINCake/assets/imgs/icons/center-right.png" alt="">
        </p>
      </li>
    </ul>



    <ul class="foot">
      <li>
        <router-link :to="'/index?tab='+del"></router-link>
      </li>
      <li>
        <router-link :to="'/Car/'+del"></router-link>
      </li>
      <li>
        <router-link to="/Login"></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mess:null,
      del:null
    }
  },
  mounted(){
    this.del=this.$route.params.id
    this.mess=localStorage.getItem("tel")
  }
}
</script>

<style>
.collect li{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.24rem;
  box-sizing: border-box;
  background: #fff;
}
.collect li>div{
  display: flex;
  align-items: center;
  padding-left: 0.4rem;
}
.collect li>div>img{
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  float: left;
  margin-right: 0.2rem;
}
.collect li>p{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d7d7d7;
}
.collect li>p>img{
  width: 1.1rem;
  height: 0.98rem;
  display: block;
}
.pay{
  margin:0.4rem 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 0.2rem 0;
  font-size: 0.24rem;
}
.pay img{
  display: block;
  width: 0.78rem;
  height: 0.6rem;
  margin: 0 auto;
  margin-bottom: 0.2rem;
}
.pay li{
  width: 25%;
  text-align: center;
  border-right: 0.01rem solid #dcdcdc;
}
.pay li:last-child{
  border-right: none;
}
body{
  background: #f5f5f5 !important;
}
.mtoppic1{
  width: 1rem;
  height: 1.4rem;
}
.mtop1{
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
}
.mtoppic{
  width: 1.2rem;
  height: 1.2rem;
  float: left;
  margin: 0 0.3rem;
}
.mtop2{
  float: left;
  width: 50%;
}
.mtop2 li{
  display: block;
  width: 100%;
  height: 0.8rem;
  font-size: 0.24rem;
  color: #000;
  display: flex;
  align-items: center;
  line-height: 0.8rem;
}
.mtop2 li>img{
  float: left;
  width: 0.3rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}
.mtop{
    width: 100%;
    height: 1.72rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.mtop img{
  display: block;
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
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/shopping-basket.png") no-repeat;
}
.foot li:last-child{
  background: url("http://wap.incake.net/RedesignINCake/assets/imgs/icons/mine01.png") no-repeat;
}
.foot a{
  width: 100%;
  height: 100%;
  display: block;
}
</style>