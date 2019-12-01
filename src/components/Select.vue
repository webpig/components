<template>
    <div class="sku">
        <div class="select-container">
            <div style="display:flex;align-items:center">
                <div :class="{'select-box': true, 'active': isShowSelectBox, 'selected': !!currSelectedItem[label]}" @click="clickSelectBox">{{currSelectedItem[label] || '请选择'}}</div>
            </div>
            <div class="specification-list" v-if="isShowSelectBox">
                <div class="specification-item empty" v-if="data.length === 0">暂无数据</div>
                <div class="specification-item" v-for="item in data" :key="item.id" @click="select(item)">{{item[label]}}</div>
                <div class="specification-item border-top" @click="handleAdd">+ {{addBtnText}}</div>
            </div>
        </div>
        <el-dialog :title="addBtnText" :visible.sync="isShowAddModal" width="30%">
            <div>
                <label for="input">{{inputLabel}}：</label>
                <el-input v-model="inputValue" autocomplete="off" maxlength="10" show-word-limit style="width:300px" id="input"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmAdd()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        addBtnText: {
            type: String,
            value: '新增属性'
        },
        inputLabel: {
            type: String,
            value: '属性名'
        }
    },
    data () {
        return {
            isShowSelectBox: false,
            isShowAddModal: false,
            inputValue: '',
            currSelectedItem: ''
        }
    },
    created() {
    },
    computed: {},
    methods: {
        select (item) {
            this.currSelectedItem = item
            this.isShowSelectBox = false
            this.$emit('change', this.currSelectedItem)
        },
        clickSelectBox () {
            this.isShowSelectBox = !this.isShowSelectBox;
        },
        showAddModal () {
            this.isShowAddModal = true;
        },
        hideAddModal () {
            this.isShowAddModal = false;
        },
        cancel () {
            this.hideAddModal();
        },
        handleAdd () {
            this.inputValue = ''
            this.showAddModal()
        },
        confirmAdd () {
            const labels = this.data.map(item => item[this.label])
            if (this.inputValue) {
                if (labels.includes(this.inputValue)) {
                    this.$message.warning('不能重复添加')
                } else {
                    this.hideAddModal()
                    this.$emit('confirm', this.inputValue)
                }
            } else {
                this.$message.warning('请填写属性名')
            }
        },
    }
}
</script>

<style lang="less" scoped>

@border-color: #d8d8d8;
@theme-color: #0486FE;

.select-container {
    position: relative;
    .select-box {
        position: relative;
        width: 200px;
        height: 36px;
        line-height: 36px;
        padding-left: 20px;
        box-sizing: border-box;
        border: 1px solid @border-color;
        border-radius: 5px;
        font-size: 14px;
        color: #bbb;
        cursor: pointer;
        &::after {
            content: '';
            width: 8px;
            height: 8px;
            border-left: 1px solid @border-color;
            border-bottom: 1px solid @border-color;
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-65%) rotate(-45deg);
            transition: .3s transform;
        }
        &.active {
            border-color: @theme-color;
            &::after {
                transform: translateY(-30%) rotate(135deg);
            }
        } 
        &.selected {
            color: #333;
        }
    }
    .specification-list { 
        position: absolute;
        left: 0;
        top: 50px;
        width: 200px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid @border-color;
        box-shadow: 0 0 4px @border-color;
        font-size: 14px;
        color: #333;
        padding-top: 8px;
        background: #fff;
        z-index: 1;
        .specification-item {
            height: 36px;
            line-height: 36px;
            padding-left: 20px;
            &:last-of-type {
                border-top: 1px solid @border-color;
                color: @theme-color;
                &::first-letter {
                    font-size: 20px;
                }
            }
            &.empty, &:hover {
                background: #F2F6FC;
            }
        }
    }
}
</style>

