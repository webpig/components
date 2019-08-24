<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <Sku
      :skuList="skuList"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change"
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
        values: [{
          text: '21寸',
          imageUrl: ''
        }, {
          text: '22寸',
          imageUrl: ''
        }],
        checkedValues: []
      }, {
        name: '颜色',
        values: [{
          text: '蓝色',
          imageUrl: ''
        }, {
          text: '红色',
          imageUrl: ''
        }],
        checkedValues: []
      }],
      isCanAddImg: true
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
    change (data) {
      console.log('item', data);
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
