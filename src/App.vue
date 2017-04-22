<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab" >
      <div class="tab-item">
        <router-link to="/goods" class="tab-item-a">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-item-a">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-item-a">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller">></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from 'components/header/header.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': vHeader
    },
    mounted () {
      this.$http.get('/api/seller').then((response) => {
        if (response.body.errno === ERR_OK) {
          this.seller = response.body.data;
        }
      }, (response) => {
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(grey)
    .tab-item
      flex 1
      text-align center
      & > .tab-item-a
        text-decoration none
      & > a
        display block
        font-size 14px
        color: rgb(77,85,93)
        &.active{
          color: red
        }
</style>
