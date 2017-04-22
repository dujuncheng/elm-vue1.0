<template>
  <div class="foodshow-wrapper">
    <div class="header-img-wraper">
      <img :src="selectfood.image" alt="食物的照片" class="header-img">
      <span class="close-btn" @click="hide">
        <i class="glyphicon glyphicon-chevron-left icon" ></i>
      </span>
    </div>
    <div class="content-wraper">
      <div class="content-title">
        <span class="content-title-text">{{selectfood.name}}</span>
      </div>
      <div class="content-discription">
        <span class="discription-left">月售{{selectfood.sellCount}}份</span>
        <span class="discription-right">好评率{{selectfood.rating}}%</span>
      </div>
      <div class="content-buy">
        <div class="content-price">
          <span class="now-price">￥{{selectfood.price}}</span>
          <span class="old-price" v-show="selectfood.oldPrice">￥{{selectfood.oldPrice}}</span>
        </div>
        <div class="content-cartcontrol">
          <v-cartcontrol :food="selectfood" v-if="selectfood.count>0"></v-cartcontrol>
            <div class="btn-wrapper" v-if="!selectfood.count||selectfood.count===0" @click="buyone()">
              <span>立即购买</span>
            </div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="rating-wraper">
      <div class="rating-title">
        商品评价
      </div>
      <div class="rating-btn-wraper">
        <v-rating-btn-group :ratingtext="selectfood.ratings" @select="selectRatingType" @onlyContent="onlyContent"></v-rating-btn-group>
      </div>
      <div class="rating-content">
        <ul>
          <li v-for="rating in ratingToShow" class="rating-li">
            <div class="rating-description">
              <div class="rating-date">
                {{rating.rateTime}}
              </div>
              <div class="rating-avatar">
                <span class="rating-username">{{rating.username}}</span>
                <img :src="rating.avatar" alt="" class="rating-img">
              </div>
            </div>
            <div class="rating-content">
              <span class="rating-icon" :class="{'glyphicon glyphicon-thumbs-up': rating.rateType===0, 'glyphicon glyphicon-thumbs-down': rating.rateType===1 }"></span>
              <span class="rating-text">{{rating.text}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import split from '../split/split.vue';
import ratingbtngroup from '../ratingbtngroup/ratingbtngroup.vue';
import Vue from 'vue';

const LIKE = 0;
const DISLIKE = 1;
export default {
  data () {
    return {
      selectType: 0,
      contentOnly: false
    };
  },
  computed: {
    ratingToShow () {
      if (this.contentOnly === false) {
        if (this.selectType === 0) {
          return this.selectfood.ratings;
        } else if (this.selectType === 1) {
          let arr = this.selectfood.ratings.filter((o) => {
            return o.rateType === LIKE;
          });
          return arr;
        } else if (this.selectType === 2) {
          let arr1 = this.selectfood.ratings.filter((o) => {
            return o.rateType === DISLIKE;
          });
          return arr1;
        }
      } else {
        if (this.selectType === 0) {
          let arr = this.selectfood.ratings.filter((o) => {
            return o.text.length > 0;
          });
          return arr;
        } else if (this.selectType === 1) {
          let arr = this.selectfood.ratings.filter((o) => {
            return o.rateType === LIKE && o.text.length > 0;
          });
          return arr;
        } else if (this.selectType === 2) {
          let arr1 = this.selectfood.ratings.filter((o) => {
            return o.rateType === DISLIKE && o.text.length > 0;
          });
          return arr1;
        }
      }
    },
    show () {
      if (this.contentOnly === true) {
        return 0;
      }
    }
  },
  props: {
    selectfood: Object
  },
  components: {
    'v-cartcontrol': cartcontrol,
    'v-split': split,
    'v-rating-btn-group': ratingbtngroup
  },
  methods: {
    buyone () {
      Vue.set(this.selectfood, 'count', 1);
    },
    selectRatingType (type) {
      this.selectType = type;
    },
    onlyContent (contentOnly) {
      this.contentOnly = contentOnly;
    },
    hide () {
      this.$emit('close');
    }
  }
};
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixin.styl';
 .foodshow-wrapper
   width 102vw
   height 100vh
   overflow-y auto
  .header-img-wraper
    width 100%
    .header-img
      width 100%
    .close-btn
      position absolute
      left 10px
      top 20px
      .icon
        color: white
        font-size 24px
  .content-wraper
    width 100%
    padding 18px
    .content-title
      .content-title-text
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
    .content-discription
      font-size: 10px;
      color: #93999f;
      padding-top 10px
      .discription-left
        margin-right 20px
    .content-buy
      padding-top 20px
      display flex
      align-items center
      height 24px
      .content-price
        flex 1
        .now-price
          text-align left
          margin-right: 8px;
          font-size: 14px;
          color: #f01414;
        .old-price
          text-align right
          text-decoration: line-through;
          font-size: 10px;
          color: #93999f;
      .content-cartcontrol
        flex 1
        .fade-enter,.fade-leave-active
          opacity 0
        .fade-enter-active,.fade-leave-active
          transition all 0.5s
        .btn-wrapper
          transition all 0.5
          text-align center
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: #00a0dc;
  .rating-wraper
    padding 18px
    .rating-title
      line-height: 14px;
      font-size: 14px;
      color: #07111b;
    .rating-btn-wraper
      padding 18px 0px
    .rating-content
      .rating-li
        padding 16px 0px
        border-bottom 0.5px solid gainsboro
        .rating-description
          display flex
          .rating-date
            flex 1
            line-height: 12px;
            font-size: 10px;
            color: #93999f;
            text-align left
          .rating-avatar
            flex 1
            text-align right
            .rating-username
              display: inline-block;
              margin-right: 6px;
              vertical-align: center;
              font-size: 10px;
              color: #93999f;
            .rating-img
              width 12px
              height 12px
              border-radius 50%


        .rating-content
          padding 5px
          .rating-icon
            color #00a0dc
            font-size 12px
          .rating-text
            font-size 12px
</style>
