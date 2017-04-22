<template>
  <div class="starwrapper">
    <div class="stars-wrapper" :class="starType">
      <span v-for="star in stars" class="star-item" :class="star">
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const STAR_NUM = 5;
  const STAR_1 = 'on';
  const STAR_2 = 'half';
  const STAR_3 = 'off';

  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
        starType () {
          return 'star-' + this.size;
        },
        starState () {
          return Math.floor(this.score * 2) / 2;
        },
        stars () {
          let isInteger = true;
          let arr = [];
          let onStarNum = 0;
          if (Number.isInteger(Math.floor(this.score * 2) / 2)) {
             onStarNum = Math.floor(this.score * 2) / 2;
          } else {
             onStarNum = (Math.floor(this.score * 2) / 2) - 1;
             isInteger = false;
          }
          for (let i = 0; i < onStarNum; i++) {
            arr.push(STAR_1);
          }
          if (isInteger === false) {
            arr.push(STAR_2);
          }
          while (arr.length < STAR_NUM) {
            arr.push(STAR_3);
          }
          return arr;
        }
    }
  };
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
  @import '../../common/stylus/mixin.styl';
  .starwrapper
      .stars-wrapper
        text-align center
      .star-24
        .on
          display inline-block
          height 12px
          width 12px
          bg-img('star24_on')
        .half
          display inline-block
          height 12px
          width 12px
          bg-img('star24_half')
        .off
          display inline-block
          height 12px
          width 12px
          bg-img('star24_off')
      .star-36
        .on
          display inline-block
          height 18px
          width 18px
          bg-img('star36_on')
        .half
          display inline-block
          height 18px
          width 18px
          bg-img('star36_half')
        .off
          display inline-block
          height 18px
          width 18px
          bg-img('star36_off')
      .star-48
        .on
          display inline-block
          height 24px
          width 24px
          bg-img('star48_on')
        .half
          display inline-block
          height 24px
          width 24px
          bg-img('star48_half')
        .off
          display inline-block
          height 24px
          width 24px
          bg-img('star48_off')
      .star-item
        margin 0 5px
</style>
