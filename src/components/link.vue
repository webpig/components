<template>
  <div id="link">
    <div @click="goToExample('PopExample')" class="link">滑窗组件示例</div>
    <div @click="goToExample('SingleTreeExample')" class="link">单级树组件示例</div>
    <div @click="goToExample('SelectExample')" class="link">选择器组件示例</div>
  </div>
</template>

<script>
export default {
    methods: {
        goToExample (routeName) {
            this.$router.push(routeName)
        }
    }
}
</script>

<style>
    #link {
        width: 300px;
    }
    .link {
        color: #409EFF;
        text-decoration: underline;
        cursor: pointer;
        margin-bottom: 8px;
    }
</style>