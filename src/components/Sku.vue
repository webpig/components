<template>
  <div id="Sku">
    <!-- <HelloWorld/> -->
    <!-- <List/> -->
    <SkuItem
      :skuList="skuList"
      :isCanAddImg="true"
      :checkedSkuNames="checkedSkuNames"
      @change-sku-name="changeSkuName1"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change1"
    />
    <SkuItem
      :skuList="skuList"
      :isCanAddImg="false"
      :checkedSkuNames="checkedSkuNames"
      @change-sku-name="changeSkuName2"
      @add-sku-name="addSpecificationName"
      @add-sku-value="addSpecificationValue"
      @change="change2"
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
      checkedSkuNames: [],
      value: [],
      arr1: [],
      arr2: [],
      name1: '',
      name2: ''
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
    change1 (data) {
      console.log(data);
    //   if (this.value.length === 0 || this.value.length === 1 && this.checkedSkuNames.includes(data.name)) {
        this.arr1 = [];
        this.value = [];
        data.checkedValues.forEach(item => {
          this.arr1.push({
            [data.name]: item.text,
            imageUrl: item.imageUrl
          });
        });

      if (this.arr2.length === 0) {
        this.value = [...this.arr1];
      } else {
        this.arr1.forEach(item => {
          this.arr2.forEach(secondItem => {
            this.value.push({
              [this.name1]: item[this.name1],
              [this.name2]: secondItem[this.name2],
              imageUrl: item.imageUrl
            });
          });
        });
      }
    //   }
      this.$emit('change', this.value);
    },
    change2 (data) {
    //   if (this.value.length === 0 || this.value.length === 1 && this.checkedSkuNames.includes(data.name)) {
        this.arr2 = [];
        this.value = [];
        data.checkedValues.forEach(item => {
          this.arr2.push({
            [data.name]: item.text,
          });
        });

      if (this.arr1.length === 0) {
        this.value = [...this.arr2];
      } else {
        this.arr1.forEach(item => {
          this.arr2.forEach(secondItem => {
            this.value.push({
              [this.name1]: item[this.name1],
              [this.name2]: secondItem[this.name2],
              imageUrl: item.imageUrl
            });
          });
        });
      }
    //   }
      this.$emit('change', this.value);
    },
    changeSkuName1 (item) {
      console.log(item);
      this.name1 = item.name;
      this.checkedSkuNames = [this.name1, this.name2];
      console.log(this.checkedSkuNames)
    },
    changeSkuName2 (item) {
      this.name2 = item.name;
      this.checkedSkuNames = [this.name1, this.name2];
      console.log(this.checkedSkuNames)

    }
  }
}
</script>

<style>
</style>
