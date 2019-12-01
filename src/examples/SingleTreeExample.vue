<template>
  <div id="index">
    <SingleTree
      addBtnText="新增线路"
      addChildBtnText="新增客户"
      :data="data"
      @add="add"
      @add-child="addChild"
      @edit="edit"
      @del="del"
      @del-child="delChild"
    />
  </div>
</template>

<script>
import SingleTree from '../components/SingleTree';

export default {
  components: {
    SingleTree
  },
  data () {
    return {
      data: [{
        name: '线路一',
        children: [{
          name: '线路一的',
          address: '余杭区'
        }]
      }, {
        name: '线路二',
        children: [{
          name: '线路二的',
          address: '余杭区'
        }]
      }]
    }
  },
  methods: {
    add (val) {
      console.log(val)
      this.data.push({
        name: val,
        // children: []
      })
    },
    addChild (val) {
      console.log(val)
      if (!this.data[val.index].children) {
        this.$set(this.data[val.index], 'children', [])
      }
      this.data[val.index].children.push({
        name: '新增的客户',
        address: '新增的客户地址'
      })
    },
    edit (val) {
      console.log(val)
      this.data[val.index].name = val.newName
    },
    del (val) {
      console.log(val)
      this.data.splice(val.index, 1)
    },
    delChild (val) {
      console.log(val)
      this.data[val.parentIndex].children.splice(index, 1)
    }
  }
}
</script>

<style>

</style>