<template>
  <div>
    <tree :data="data" @add="add" @edit="edit" @add-child="addChild" @del="del"></tree>
  </div>
</template>

<script>
import Tree from '../components/Tree'

export default {
  components: {
    Tree
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    // 新增分类
    add (val) {
      console.log(val)
      this.data.push({
        name: val,
        children: []
      })
    },
    // 编辑
    edit (val) {
      console.log('edit', val)
    },
    // 新增子分类
    addChild (val) {
      console.log('addChild', val)
    },
    // 删除
    del (val) {
      console.log('del', val)
    }
  }
}
</script>

<style>

</style>