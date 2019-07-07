<template>
  <div id="app">
    <HelloWorld/>
    <!-- <List/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import List from './components/List';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  padding: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100vh;
  overflow: hidden;
}
</style>
