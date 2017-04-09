import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    component: goods
  }, {
    path: '/goods',
    component: goods
  }, {
    path: '/seller',
    component: seller
  }, {
    path: '/ratings',
    component: ratings
  }]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
