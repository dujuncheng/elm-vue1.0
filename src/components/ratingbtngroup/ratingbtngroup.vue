  <template>
   <div>
     <div class="rating-btn-wraper">
       <button class="rating-btn btn btn-default" @click="selectType(0,$event)">全部 {{total}}</button>
       <button class="rating-btn btn btn-info" @click="selectType(1,$event)">推荐 {{goodtext}}</button>
       <button class="rating-btn btn btn-warning" @click="selectType(2,$event)">吐槽 {{badtext}}</button>
     </div>
     <div class="rating-select-wraper">
       <div class="rating-select" @click="onlyContent">
         <span class="select-icon">
           <i class="glyphicon glyphicon-ok-circle" :class="{'active': contentOnly}"></i>
         </span>
         <span class="select-text">只看有内容的评价</span>
       </div>
     </div>
   </div>
  </template>

  <script type="text/ecmascript-6">
  export default {
    data () {
      return {
        contentOnly: false
      };
    },
    props: {
      ratingtext: {
        type: Array
      }
    },
    computed: {
      goodtext () {
        let total = 0;
        this.ratingtext.forEach((o) => {
          if (o.rateType === 0) {
            total++;
          }
        });
        return total;
      },
      badtext () {
        let total = 0;
        this.ratingtext.forEach((o) => {
          if (o.rateType === 1) {
            total++;
          }
        });
        return total;
      },
      total () {
        return this.ratingtext.length;
      }
    },
    methods: {
      selectType (type, $event) {
        this.$emit('select', type);
      },
      onlyContent () {
        console.log('d');
        if (this.contentOnly === true) {
          this.contentOnly = false;
        } else if (this.contentOnly === false) {
          this.contentOnly = true;
        }
        this.$emit('onlyContent', this.contentOnly);
      }
    }
  };
  </script>

  <style lang="stylus" rel='stylesheet/stylus' scoped>
   .rating-btn-wraper
     .rating-btn
      margin-right 10px
    outline 0px
    &:active,&:hover,&:focus,&:visited
      border 1px solid white
      outline 0px blue
   .rating-select-wraper
      .rating-select
        display inline-block
        width 100%
        padding 18px 0px
        border-bottom 1px solid gray
      .select-icon
        .active
          color #00a0dc
  </style>
