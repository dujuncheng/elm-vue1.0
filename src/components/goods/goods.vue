<template>
  <div>
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
              <li v-for="food in item.foods" class="item-content" @click="showFood(food,$event)">
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
                  <div class="cartcontrol">
                    <v-cartcontrol :food="food"></v-cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <v-shopcart :selectGoods="selectGoods"></v-shopcart>
    <transition name="slideFromRight">
      <div class="foodshow" v-if="foodShow">
        <v-foodshow :selectfood="selectFood" @close="hideFood"></v-foodshow>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import shopcart from 'components/shopcart/shopcart.vue';
  import foodshow from 'components/foodshow/foodshow.vue';
  const ERR_OK = 0;
  export default {
    components: {
      'v-cartcontrol': cartcontrol,
      'v-shopcart': shopcart,
      'v-foodshow': foodshow
    },
    data () {
      return {
        goods: [],
        heightList: [],
        scrollY: 0,
        selectFood: {},
        foodShow: false
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
      },
      selectGoods() {
        let selectGoods = [];
        this.goods.forEach((section) => {
          section.foods.forEach((food) => {
            if (food.count) {
              selectGoods.push(food);
            }
          });
        });
        return selectGoods;
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
      hideFood () {
        this.foodShow = false;
      },
      showFood (food, $event) {
        this.selectFood = food;
        this.foodShow = true;
      },
      _scrollinit () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.itemsWrapper = new BScroll(this.$refs.itemsWrapper, {
          click: true,
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
      flex-direction row
      padding 18px
      align-items top
      border-bottom 1px solid rgba(0,0,0,0.1)
      .food-img-wrapper
        flex 0 1 60px
        width 60px
      .food-content-wrapper
        flex 1
        position relative
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
          .now-price
            font-size: 14px;
            color: #f01414;
          .old-price
            text-decoration: line-through;
            font-size: 10px;
            color: #93999f;
        .cartcontrol
          position absolute
          right 0px
          bottom -8px
          width 84px
          height 18px
          padding 0

.slideFromRight-enter,.slideFromRight-leave-active
  transform translate(100vw,0px);
.slideFromRight-enter-active,.slideFromRight-leave-active
  transition all 0.5s
.foodshow
  position fixed
  z-index 1000
  top 0
  left 0
  bottom 0
  right 0
  background-color white
  transition all 0.5s
</style>
