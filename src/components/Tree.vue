<template>
    <div id="tree">
        <div class="header">
            <el-button type="primary" @click="showAddModal">{{addBtnText}}</el-button>
            <el-button @click="toggleAllExpand" v-if="data.length">展开/收起</el-button>
            <span class="tip">{{tip}}</span>
        </div>
        <template v-if="update">
            <tree-item
                v-for="(item, index) in data"
                :data="item"
                :key="item.name"
                :addChildBtnText="addChildBtnText"
                :isAllExpand="isAllExpand"
                :label="label"
                :deep="0"
                :parentIndex="index"
                @edit="edit"
                @add-child="addChild"
                @del="del">
            </tree-item>
        </template>
        <el-dialog :title="addBtnText" :visible.sync="isShowAddModal" width="40%">
            <el-form :model="form" ref="form">
                <el-form-item
                    :label="label"
                    prop="name"
                    label-width="100px"
                    :rules="{ 
                        required: true, message: `请输入${label}`, trigger: 'blur'
                    }">
                    <el-input v-model.trim="form.name" autocomplete="off" autofocus></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TreeItem from './TreeItem.vue'

export default {
    components: {
        TreeItem
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        tip: String,
        addBtnText: {
            type: String,
            default: '新增分类'
        },
        addChildBtnText: {
            type: String,
            default: '新增子分类'
        },
        label: {
            type: String,
            default: '分类名称'
        }
    },
    data () {
        return {
            isShowAddModal: false,
            form: {
                name
            },
            isAllExpand: false,
            update: true,
        }
    },
    created () {
    },
    methods: {
        showAddModal () {
            this.isShowAddModal = true
        },
        hideAddModal () {
            this.isShowAddModal = false
        },
        cancel (formName) {         
            this.$refs[formName].resetFields();
            this.clearInputAndCloseModal()
        },
        confirm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.checkNameIsRepeat()) {
                        this.showRepeatAddTip()
                        return
                    }
                    this.$emit('add', this.form.name)
                    this.clearInputAndCloseModal()
                } else {
                    return false;
                }
            });
        },
        checkNameIsRepeat (name = this.form.name) {
            const names = this.data.map(item => item.name)
            return names.includes(name)
        },
        showRepeatAddTip () {
            this.$message({
                message: '不能重复添加！',
                type: 'warning'
            });
        },
        clearInputAndCloseModal () {
            this.form.name = ''
            this.hideAddModal()
        },
        toggleAllExpand () {
            this.isAllExpand = !this.isAllExpand
            this.update = false
            this.$nextTick(() => {
                this.update = true
            })
        },
        edit (val) {
            this.$emit('add-child', val)
        },
        addChild (val) {
            this.$emit('add-child', val)
        },
        del (val) {
            this.$emit('del', val)
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    margin-bottom: 20px;
    .tip {
        color: #909399;
        font-size: 14px;
        margin-left: 12px;
    }
}
</style>