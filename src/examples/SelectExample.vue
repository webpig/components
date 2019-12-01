<template>
    <div>
        <!-- 
            data 数据列表，数组类型，每项都为对象，比如{ id: 1, name: '张三' }
            label 选择器显示字段，数据项的属性名，比如name
            add-ben-text 添加按钮的文本
            input-label 输入框的label
            confirm 确认添加新数据事件
            change 选择数据事件，返回选择的数据
        -->
        <Select
            :data="data"
            label="name"
            add-btn-text="新增规格"
            input-label="规格名"
            @confirm="add"
            @change="change">
        </Select>
    </div>
</template>

<script>
import Select from '../components/Select';
export default {
    components: {
        Select
    },
    data () {
        return {
            data: [{
                id: 1,
                name: 'sfsd',
            }, {
                id: 2,
                name: 'sdfsg'
            }],
        }
    },
    methods: {
        add (val) {
            this.data.push({
                id: this.data.length + 1,
                name: val
            })
        },
        change (val) {
            console.log(val)
        }
    }
}
</script>

<style>

</style>