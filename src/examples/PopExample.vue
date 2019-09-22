<template>
  <div id="">
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
import Pop from '../components/Pop';

export default {
  components: {
    Pop
  },
  data () {
    return {
      isShow: false,
    }
  },
  methods: {
    open () {
      this.isShow = true
    },
    save () {
      this.isShow = false
    },
  }
}
</script>

<style>

</style>