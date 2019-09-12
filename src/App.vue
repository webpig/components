<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <!-- <Sku
      :skuList="skuList"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change"
    /> -->
    <!-- <Tree
      :data="data"
      @add="add"
      @edit="edit"
      @add-child="addChild"
      @del="del"
      tip="提示语">
    </Tree> -->
    <el-button @click="open">打开</el-button>
    <Pop
      :visible.sync="isShow"
      title="新建拜访"
      @save="save">
      <el-form style="padding: 30px">
        <el-input placeholder="输入"></el-input>
        <el-button style="margin-top:20px">提交</el-button>
      </el-form>
    </Pop>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import List from './components/List';
import Sku from './components/Sku';
import Tree from './components/Tree';
import Pop from './components/Pop';

export default {
  name: 'App',
  components: {
    Tree,
    Pop
  },
  data () {
    return {
      isShow: false,
      update: true,
      data: [{
        id: 1,
        name: '热门推荐',
        children: [{
            id: 2,
            name: '桃花醉',
            children: [{
                id: 3,
                name: '桃花醉53度',
            }, {
                id: 4,
                name: '白酒',
            }]
        }]
      }, {
        id: 5,
        name: 'sdfs',
        children: [{
            id: 6,
            name: '桃花醉',
            children: [{
                id: 7,
                name: '桃花醉53度',
            }, {
                id: 8,
                name: '白酒',
            }]
        }]
      }],
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
    open () {
      this.isShow = true
    },
    save () {
      this.isShow = false
    },
    createId () {
      return Math.floor(Math.random() * 1e10)
    },
    // tree
    add (val) {
      console.log(val)
      this.data.push({ 
        id: this.createId(),
        name: val 
      })
    },
    addChild (val) {
      this.addFunc(this.data[val.parentIndex], val)
    },
    addFunc (data, val) {
      if (data.id === val.id) {
        if (!data.children) data.children = [] 
        data.children.push({
          id: this.createId(),
          name: val.name
        })
        return
      } else if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.addFunc(item, val)
        })
      }
    },
    edit () {

    },
    del (val) {
      this.delFunc(this.data, this.data[val.parentIndex], val.parentIndex, val)
      console.log('data', this.data)
    },
    delFunc (arr, data, index, val) {
      console.log(data.id, val.id)
      if (data.id === val.id) {
        arr.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        return
      } else if (data.children && data.children.length) {
        console.log(1)
        data.children.forEach((item, index) => {
          this.delFunc(data.children, item, index, val)
        })
      }
    },
    // sku
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
  width: 100px;
}
</style>
