<template>
    <div id="tree">
        <div class="header">
            <el-button type="primary" @click="showAddModal">{{addBtnText}}</el-button>
            <el-button @click="toggleAllExpand" v-if="data.length">展开/收起</el-button>
        </div>
        <template v-if="update">
            <SingleTreeItem
                v-for="(item, index) in data"
                :key="item.name"
                :data="item"
                :index="index"
                :addBtnText="addBtnText"
                :addChildBtnText="addChildBtnText"
                :isAllExpand="isAllExpand"
                @del="del"
                @del-child="delChild"
                @add-child="addChild"
                @edit="edit"
            />
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
import SingleTreeItem from './SingleTreeItem'

export default {
    components: {
        SingleTreeItem
    },
    props: {
        data: {
            type: Array,
            required: true
        },
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
              name: ''
          },
          isAllExpand: false,
          update: true
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
            return this.data.some(item => item.name === name)
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
        del (val) {
            this.$emit('del', val)
        },
        delChild (val) {
            this.$emit('del-child', val)
        },
        addChild (val) {
            this.$emit('add-child', val)
        },
        edit (val) {
            this.$emit('edit', val)
        }
    }
}
</script>

<style lang="less" scoped>
@border-color: #d8d8d8;

.header {
    margin-bottom: 20px;
    .tip {
        color: #909399;
        font-size: 14px;
        margin-left: 12px;
    }
}

.tree-item {
    width: 860rpx;
    .wrap {
        display: flex;
        align-items: center;
        padding: 0 30px 0 18px;
        box-sizing: border-box;
        // position: relative;
        height: 60px;
        border: 1px solid @border-color;
        line-height: $height;
        border-radius: 5px;
        color: #606266;
        margin-top: 12px;
        .icon {
            position: relative;
            width: 20px;
            height: 20px;
            border: 1px solid @border-color;
            // display: inline-block;
            // position: absolute;
            // top: 50%;
            // left: 18px;
            // transform: translateY(-50%);
            &::before, &::after {
                content: '';
                position: absolute;
                width: 8px;
                height: 1px;
                background: @border-color;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            &.close {
                &::after {
                    width: 1px;
                    height: 8px;
                }
            }
        }
        .btn-container {
            // position: absolute;
            // right: 30px;
            // display: inline-block;
            margin-left: auto;
        }
    }
    .children {
        padding-left: 30px;
    }
}
</style>