<template>
  <div class="titleWrapper">
    <div class="line"></div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped="true">
  .titleWrapper
    display flex
    align-items center
    padding-top: 28px;
    padding-bottom 28px
    .line
      flex 1
      height 1px
      overflow hidden
      background-color white
    .text
      flex 1
      text-align center
      font-weight 700
</style>
