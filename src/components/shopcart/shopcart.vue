<template>
  <div class="footer-wrap">
    <div class="car-wrap" @click="showdetail">
      <div class="qiu-wrap" :class="{'qiu-wrap-active': totalCount>0}">
        <i class="fa fa-shopping-cart icon" aria-hidden="true" :class="{'active-blue': totalCount>0}"></i>
        <div class="text-wrap" v-show="totalCount>0">{{totalCount}}</div>
      </div>
    </div>
    <div class="price-wrap">
      <span class="current-price">￥{{totalPrice}}</span>
      <span class="divider"></span>
      <span class="transport-price">另需4元的配送费</span>
    </div>
    <div class="buy-wrap" :class="{'buy-wrap-yellow':totalPrice>=10}">
      <span class="buy-text" v-if="totalPrice<10">还差{{10-totalPrice}}元起送</span>
      <span class="buy-text" v-if="totalPrice>=10">立即购买</span>
    </div>
    <transition name="slide-show">
      <div class="detail-list-wrap" v-show="showDetail&&totalCount>0">
        <div class="detail-list-header">
        <span class="header-left">
          购物车
        </span>
          <span class="header-right" @click="clearAll()">
          清空
        </span>
        </div>
        <div class="detail-list-body">
          <ul>
            <li class="item" v-for="selectfood in selectGoods">
              <div class="selectfood-name">{{selectfood.name}}</div>
              <div class="selectfood-price">￥{{selectfood.price}}</div>
              <div class="selectfood-control">
                <v-cartcontrol :food="selectfood" @decree="decree"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="detail-list-background" v-show="showDetail&&totalCount>0" @click="showdetail"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import cartcontrol from '../cartcontrol/cartcontrol.vue';
export default {
  components: {
    'v-cartcontrol': cartcontrol
  },
  data () {
    return {
      showDetail: false
    };
  },
  methods: {
    showdetail () {
      if (this.showDetail === false && this.totalCount > 0) {
        this.showDetail = true;
      } else {
        this.showDetail = false;
      }
    },
    clearAll () {
      this.selectGoods.forEach((selectgood) => {
        selectgood.count = 0;
        this.showDetail = false;
      });
    },
    decree () {
      if (this.totalCount === 0) {
        this.showDetail = false;
      }
    }
  },
  props: {
    selectGoods: {
      type: Array
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectGoods.forEach((item) => {
        total = total + item.count * item.price;
      });
      return total;
    },
    totalCount () {
      let total = 0;
      this.selectGoods.forEach((item) => {
        total = total + item.count;
      });
      return total;
    }
  }
};
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped="">
  .footer-wrap
    position fixed
    bottom 0
    left 0
    height 48px
    width 100%
    background #141d27
    display flex
    align-items center
    font-size 12px
    .car-wrap
      height 100%
      flex 1
      .qiu-wrap
        position relative
        top -12px
        left 15px
        height 60px
        width 60px
        border 6px solid #141d27
        background-color #2b333b
        border-radius 50%
        text-align center
        padding 10px
        .text-wrap
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        .icon
          font-size 28px
          color gainsboro
        .active-blue
          color white
      .qiu-wrap-active
        background-color #00a0dc
    .price-wrap
      height 100%
      display flex
      align-items center
      flex 3
      .current-price
        color white
      .transport-price
        color #787b7f
      .divider
        display inline-block
        width 1px
        height 20px
        background-color: #787b7f
        overflow hidden
        margin 0 5px
    .buy-wrap
      position absolute
      right 0
      bottom 0
      height 100%
      width 105px
      flex 0 0 105px
      text-align center
      background-color #2b333b
      color #979a9c
      .buy-text
        line-height 48px
        font-size 12px
        font-weight 700
        text-align center
    .slide-show-enter-active,.slide-show-leave-active
      transition all 0.5s
    .slide-show-enter,.slide-show-leave-active
      opacity 0
      transform translate(0px, 200px)
    .slide-show-enter-active,.slide-show-leave
      opacity 1
    .detail-list-wrap
      transition all 0.5s
      position absolute
      left 0
      bottom 0
      width 100%
      max-height 300px
      background-color white
      z-index 1000
      .detail-list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        border-top 1px solid rgba(7,17,27,0.1)
        .header-left
          float left
        .header-right
          float right
          font-size: 12px;
          color: #00a0dc;

      .detail-list-body
        padding 0px 18px
        width 100%
        max-height 281px
        overflow-y auto
        .item
          background-color white
          display flex
          align-items center
          width 100%
          padding 12px 0px
          border-bottom 1px solid gainsboro
          font-size 14px
          .selectfood-name
            flex 1
          .selectfood-price
            flex 1
            text-align right
            color #f01414
          .selectfood-control
            flex 1
    .buy-wrap-yellow
      background-color #00b43c
      color white
    .fade-enter-active,.fade-leave-active
      transition all 0.5s
    .fade-enter,.fade-leave-active
      opacity 0
    .detail-list-background
      background-color rgba(0,0,0,0.5);
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      z-index 100
</style>
