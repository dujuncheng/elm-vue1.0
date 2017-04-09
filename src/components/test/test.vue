<template>
  <div>
    <ul>
      <li v-for = " (item,index) in list" v-text='`${item} - ${index} `'></li>
    </ul>
    <button @click="filter">数组进行取余过滤</button>
    <button @click="concat">数组进行合并</button>
    <button @click="map">数组印射</button>
    <button @click="slice">返回截取后的数组</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [1, 2, 3, 4],
        list2: [ 7, 8, 9, 0 ]
      };
    },
    methods: {
      filter () {
        this.list = this.list.filter((item) => {
          return item % 2;
        });
      },
      concat () {
        this.list = [...this.list, ...this.list2];
      },
      map () {
        this.list = this.list.map(item => {
          return `${item} map`;
        });
      },
      slice () {
        this.list = this.list.slice(2);
      }
    }
  };

</script>
