<template>
  <div class="cartcontrol-wrap">
    <div class="cartcontrol-decrees" >
      <transition name="move">
        <i class="glyphicon glyphicon-minus-sign icon" @click.stop.prevent="decree" v-show="food.count>0"></i>
      </transition>
    </div>
    <div class="cartcontrol-count">
      <span v-show="food.count>0">{{food.count}}</span>
    </div>
    <div class="cartcontrol-add">
      <i class="glyphicon glyphicon-plus-sign icon" @click.stop.prevent="add"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add (event) {
//      if (event._constructed) {
//        return;
//      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add');
    },
    decree (event) {
//      if (event._constructed) {
//        return false;
//      }
      if (this.food.count > 0) {
        this.food.count--;
      }
      this.$emit('decree');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol-wrap
  display flex
  align-items center
  .cartcontrol-add
    text-align center
    flex 1
    .icon
      display inline-block
      width 100%
      height 100%
      font-size 16px
      color #00a0dc
  .cartcontrol-decrees
    text-align center
    flex 1
    transition all 0.4s linear
    .icon
      display inline-block
      width 100%
      height 100%
      font-size 16px
      color gainsboro
      transform rotate(0)
      transition all 0.4s linear
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity 0
        transform: translate(24px, 0) rotate(-180deg)
  .cartcontrol-count
    text-align center
    flex 1
    font-size 15px
</style>
