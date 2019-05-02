<template>
    <div class="anchor" ref="anchor">
        <div class="list" ref="list">
            <div class="list-item" ref="one">商品图片</div>
            <div class="list-item" ref="two">基本信息</div>
            <div class="list-item" ref="three">自定义属性</div>
            <div class="list-item" ref="four">商品库存</div>
        </div>
        <div class="nav-wrap">
            <div :class="{'nav-item': true, 'active': activeName === 'one'}" @click="changeNav('one')">商品图片</div>
            <div :class="{'nav-item': true, 'active': activeName === 'two'}" @click="changeNav('two')">基本信息</div>
            <div :class="{'nav-item': true, 'active': activeName === 'three'}" @click="changeNav('three')">自定义属性</div>
            <div :class="{'nav-item': true, 'active': activeName === 'four'}" @click="changeNav('four')">商品库存</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Anchor',
    data () {
        return {
            activeName: 'one'
        }
    },
    created() {
    },
    mounted() {
      this.$refs.anchor.addEventListener('scroll', (e) => {
        let scrollTop = e.target.scrollTop;
        if (scrollTop < this.$refs.two.offsetTop) {
          this.activeName = 'one';
        } else if (scrollTop >= this.$refs.two.offsetTop && scrollTop < this.$refs.three.offsetTop) {
          this.activeName = 'two';
        } else if (scrollTop >= this.$refs.three.offsetTop && scrollTop < this.$refs.four.offsetTop) {
          this.activeName = 'three';
        } else {
          this.activeName = 'four';
        }
      });
    },
    methods: {
        changeNav (item) {
            let scrollTop = this.$refs[item].offsetTop;
            this.activeName = item;
            this.$nextTick(() => {
              this.$refs.anchor.scrollTo({
                top: scrollTop,
                behavior: "smooth"
              });
            });
        }
    }
}
</script>

<style scoped>
    .anchor {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: auto;
        /* padding-top: 100px; */
    }
    .list-item {
        width: 300px;
        height: 300px;
        /* border: 1px solid #409EFF; */
        padding: 32px 0;
    }
    .nav-wrap {
        position: fixed;
        right: 0;
        top: 0;
        width: 100px;
        border-left: 1px solid #eee;
        box-sizing: border-box;
        /* padding-left: 16px;    */
    }
    .nav-item {
        box-sizing: border-box;
        margin-bottom: 8px;
        cursor: pointer;
        text-align: center;
        width: 100%;
    }
    .active {
        border-left: 2px solid #409EFF;
        color: #409EFF;
        /* margin-left: -17px; */
    }
</style>
