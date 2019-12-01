<template>
    <div>
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