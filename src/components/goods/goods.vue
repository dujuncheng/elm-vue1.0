<template>
  <div class="goods-wrapper">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(menu, index) in goods" class="menu-item menu-item-hook" :class="{active:currentIndex===index}">
          <span v-if="classmap[menu.type]" class="menu-icon" :class="classmap[menu.type]"></span>
          <span class="menu-text">{{menu.name}}</span>
        </li>
      </ul>
    </div>
    <div class="items-wrapper" ref="itemsWrapper">
      <ul>
        <li v-for="item in goods" class="item-hook">
          <div class="item-title">
            {{item.name}}
          </div>
          <ul>
            <li v-for="food in item.foods" class="item-content">
              <div class="food-img-wrapper">
                <img :src="food.image" alt="" width="57px" height="57px">
              </div>
              <div class="food-content-wrapper">
                <div class="food-title">
                  <h1 class="food-title-text">{{food.name}}</h1>
                </div>
                <div class="food-description">
                  <span class="food-description-text">
                    {{food.description}}
                  </span>
                </div>
                <div class="food-sell">
                  <span class="food-sell-count">月售{{food.sellCount}}份</span>
                  <span class="food-sell-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="now-price">￥{{food.price}}</span>
                  <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        goods: {},
        heightList: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    mounted () {
      this.$http.get('/api/goods').then((response) => {
        if (response.body.errno === ERR_OK) {
          this.goods = response.body.data;
          this.$nextTick(
            () => {
              this._scrollinit();
              this._calculateHeight();
            }
          );
        }
      }, (response) => {
      });
      this.classmap = ['decrease', 'discount', 'guanrantee', 'invoice', 'special'];
    },
    methods: {
      _scrollinit () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        this.itemsWrapper = new BScroll(this.$refs.itemsWrapper, {
          probeType: 3
        });
        this.itemsWrapper.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        var itemList = this.$refs.itemsWrapper.getElementsByClassName('item-hook');
        var height = 0;
        this.heightList.push(height);
        for (let i = 0; i < itemList.length; i++) {
          height = height + itemList[i].clientHeight;
          this.heightList.push(height);
        }
        console.log(this.heightList);
      }
    }
  };
</script>

<style lang="stylus" rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl';
.goods-wrapper
  display flex
  flex-direction row
  position absolute
  top 184px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 1 80px
    width 80px
    background-color #f3f5f7
    height 100%
    .menu-item
      padding 15px 10px
      text-align center
      font-size 12px
    .active
      background white
      font-size 12px
      .menu-icon
        display inline-block
        width 10px
        height 10px
        border-radius 2px
        &.decrease
          bg-img('decrease_3')
        &.discount
          bg-img('discount_3')
        &.guanrantee
          bg-img('guarantee_3')
        &.invoice
          bg-img('invoice_3')
        &.special
          bg-img('special_3')
      .menu-text
        font-size 12px
  .items-wrapper
    flex 1
    .item-title
      width 100%
      background-color #f3f5f7
      border-left 2px solid #d9dde1
      padding 6px 12px
    .item-content
      display flex
      width 100%
      display flex
      flex-direction row
      padding 18px
      border 1px solid blue
      align-items top
      .food-img-wrapper
        flex 0 1 60px
        width 60px
      .food-content-wrapper
        flex 1
        background-color red
        .food-title
          padding 5px 10px
          .food-title-text
            font-size 16px
            font-weight 800
            margin 0
        .food-description
          padding 2px
          font-size 10px
        .food-sell
          padding 2px
          font-size 10px
        .food-price
          padding 2px
          font-size 10px
</style>
