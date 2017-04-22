<template>
  <div>
    <div class="header">
      <div class="content-wrapper container">
        <div class="row">
          <div class="col-xs-3">
            <img :src="seller.avatar" alt="" width="64px" height="64px">
          </div>
          <div class="right-wrapper col-xs-9">
            <div class="title-wrapper">
              <span class="brand"></span>
              <span class="title">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}} / {{seller.deliveryTime}}分钟送达
          </div>
            <div class="youhui" v-if="seller.supports">
              <span class="brand" :class="classmap[seller.supports[0].type]"></span>
              <span>{{seller.supports[0].description}}</span>
            </div>
          </div>
        </div>
        <div class="more" @click="showdetail()">
          <span>{{seller.supports.length}}个</span>
          <span class="glyphicon glyphicon-chevron-right"></span>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showdetail()" >
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-1">
              <span class="gonggao"></span>
            </div>
            <div class="col-xs-10">
              <p class="bulletin-text">{{seller.bulletin}}</p>
            </div>
            <div class="col-xs-1">
              <span class="glyphicon glyphicon-chevron-right"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="background-img">
        <img :src="seller.avatar" alt="">
      </div>
      <transition name="fade">
        <div class="detail-wrapper" v-if="detailisshow">
          <div class="wrapper clearfix">
            <div class="item">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12">
                    <h1>{{seller.name}}</h1>
                    <star-group :score="seller.score" :size=24 ></star-group>
                  </div>
                </div>
                <div class="row">
                  <little-title>优惠信息</little-title>
                </div>
                <div class="row">
                  <div class="col-xs-12 itemContent" v-for='item in seller.supports'>
                    <span class="itemPic" :class="classmap[item.type]"></span>
                    <span>{{item.description}}</span>
                  </div>
                </div>
                <div class="row">
                  <little-title>商家公告</little-title>
                </div>
                <div class="row">
                  <p class="bulletionText">{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="close">
            <span class="glyphicon glyphicon-remove" @click="closedetail()"></span>
          </div>
        </div >
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import starGroup from 'components/star/star.vue';
  import title from 'components/title/title.vue';
  export default{
    data () {
      return {
        detailisshow: false
      };
    },
    methods: {
      showdetail () {
        this.detailisshow = true;
      },
      closedetail () {
        this.detailisshow = false;
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    mounted () {
      this.classmap = ['decrease', 'discount', 'guanrantee', 'invoice', 'special'];
    },
    components: {
      'star-group': starGroup,
      'little-title': title
    }
  };
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
  @import '../../common/stylus/mixin.styl';
.header
  position relative
  .detail-wrapper
    color white
    width 100vw
    background-color rgba(0,0,0,0.8)
    position absolute
    top 0
    left 0
    z-index 100
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
    .wrapper
      min-height 100vh
      width 100%
      .item
        padding 64px 30px
        width 100%
        .container
          .row
            h1
              font-size 20px
              text-align center
      .itemContent
        display flex
        align-items center
        padding 4px
        .itemPic
          display inline-block
          width 16px
          height 16px
          border-radius 2px
          margin-right 4px
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.guanrantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
          &.special
            bg-img('special_1')
      .bulletionText
        line-height 18px
    .close
      position relative
      margin -64px auto 0 auto
      clear both
      width 100%
      text-align center
      color white

  .background-img
    width 100%
    height 100%
    position absolute
    left 0px
    top 0px
    z-index -1
    img
      width 100%
      height 80%
      filter blur(7px)
  .content-wrapper
    padding 24px 24px 24px 18px
    background-color rgba(7,17,27,0.5)
    position relative
    .more
      position absolute
      right 7px
      bottom 24px
      width 48px
      height 24px
      border-radius 20px
      background-color rgba(255,255,255,0.5)
      font-size 12px
      line-height 24px
      color white
      text-align center
      font-weight 100
    .right-wrapper
      .title-wrapper
        vertical-align middle
        .brand
          width 30px
          height 18px
          display inline-block
          bg-img('brand')
          background-size cover
          vertical-align middle
        .title
          display inline-block
          padding 3px
          font-size 16px
          color white
          font-weight bold
      .description
        padding 3px
        color white
        font-size 12px
      .youhui
        padding 3px
        color white
        .brand
          width 12px
          height 12px
          display inline-block
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.guanrantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
          &.special
            bg-img('special_1')

  .bulletin-wrapper
    background-color rgba(7,17,7,0.2)
    .col-xs-1
      padding 8px 6px
  .gonggao
      width 22px
      height 12px
      display inline-block
      bg-img('bulletin')
      background-size contain
    .col-xs-10
      padding 0
      .bulletin-text
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        text-align center
        vertical-align middle
        margin 0
        padding 8px 0px
        font-size 12px
        font-family 'Microsoft YaHei', arial, sans-serif, 'Droid Sans Fallback'

</style>
