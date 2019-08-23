<template>
  <div id="Sku">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <SkuItem
      :skuList="skuList"
      :isCanAddImg="true"
      :checkedSkuNames="checkedSkuNames"
      @change-sku-name="changeSkuName"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change"
    />
    <SkuItem
      :skuList="skuList"
      :isCanAddImg="false"
      :checkedSkuNames="checkedSkuNames"
      @change-sku-name="changeSkuName"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change"
      style="margin-top: 30px"
    />
  </div>
</template>

<script>
import SkuItem from './SkuItem';

export default {
  components: {
    SkuItem
  },
  props: {
    'skuList': Array,
  },
  data () {
    return {
      checkedSkuNames: []
    }
  },
  methods: {
    addSpecificationName (val) {
      console.log(val);
      this.$emit('add-sku-name', val);
    },
    addSpecificationValue (data) {
      console.log(data);
      this.$emit('add-sku-value', data);
    },
    change (data) {
      console.log(data);
    },
    changeSkuName (item) {
      console.log(item);
      this.checkedSkuNames.push(item.name);
    }
  }
}
</script>

<style>
</style>
