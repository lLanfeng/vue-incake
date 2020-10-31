import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'


Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.config.productionTip = false
const bus=new Vue();
export default bus;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
