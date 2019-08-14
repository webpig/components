<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <Sku
      :skuList="skuList"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @confirm="confirmSelect"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import List from './components/List';
import Sku from './components/Sku';

export default {
  name: 'App',
  components: {
    Sku
  },
  data () {
    return {
      // 可选的规格列表，
      skuList: [{
        name: '尺寸',
        values: ['21寸', '22寸'],
        checkedValues: []
      }, {
        name: '颜色',
        values: ['蓝色', '红色'],
        checkedValues: []
      }],
    }
  },
  methods: {
    addSpecificationName (val) {
      console.log(val)
      this.skuList.push({
        name: val,
        values: [],
        checkedValues: []
      });
    },
    addSpecificationValue (data) {
      console.log(data);
      this.skuList.forEach(item => {
        if (item.name === data.name) {
          item.values = data.values;
        }
      });
    },
    confirmSelect (data) {
      console.log(data);
    }
  }
}
</script>

<style>
/* #app {
  padding: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
} */
#app {
  padding: 30px;
}
</style>
