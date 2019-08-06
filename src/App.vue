<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <Sku :specificationList="specificationList" :addSpecificationName="addSpecificationName" :form="form"/>
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
      specificationList: [{
        name: '尺寸',
        values: []
      }, {
        name: '颜色',
        values: []
      }],
      form: {
        specificationName: ''
      }
    }
  },
  methods: {
    addSpecificationName () {
      this.specificationList.push({
        name: this.form.specificationName,
        values: []
      });
    },
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
