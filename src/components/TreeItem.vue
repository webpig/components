<template>
    <div id="tree-item">
        <div class="tree-item" :style="{width: `${(860 - 30 * deep)}px`}">
            <div class="wrap">
                <div :class="['icon', {'close' : !isExpand}]" v-if="hasChildren(data)" @click="toggleExpandStatus"></div>
                <span :style="{'margin-left': hasChildren(data) ? '12px' : '0'}">{{data.name}}</span>
                <div class="btn-container">
                    <el-button type="text" @click="showAddModal">{{addChildBtnText}}</el-button>
                    <el-button type="text" @click="showEditModal">编辑</el-button>
                    <el-button type="text" @click="showConfirmDelModal">删除</el-button>
                </div>
            </div>
            <div v-if="hasChildren(data)" v-show="isExpand" class="children">
                <tree-item
                    v-for="(item, index) in data.children"
                    :data="item"
                    :key="index"
                    :isAllExpand="isAllExpand"
                    :deep="deep + 1"
                    :parentIndex="parentIndex"
                    @add-child="addChild"
                    @del="del"
                    @edit="edit">
                </tree-item>
            </div>
        </div>
        <el-dialog :title="addChildBtnText" :visible.sync="isShowAddModal" width="40%">
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
export default {
    name: 'tree-item',
    props: {
        data: {
            type: Object,
            required: true
        },
        addChildBtnText: {
            type: String,
            default: '新增子分类'
        },
        label: {
            type: String,
            default: '分类名称'
        },
        isAllExpand: Boolean,
        deep: Number,
        parentIndex: Number
    },
    data () {
        return {
            isExpand: this.isAllExpand,
            isShowAddModal: false,
            form: {
                name
            }
        }
    },
    created () {
    },
    computed: {
        // hasChildren () {
        //     return this.data.children && this.data.children.length
        // }
    },
    methods: {
        hasChildren (data) {
            return data.children && data.children.length
        },
        addChild (val) {
            this.$emit('add-child', val)
        },
        del (val) {
            this.$emit('del', val)
        },
        edit (val) {
            this.$emit('edit', val)
        },
        toggleExpandStatus () {
            this.isExpand = !this.isExpand
        },
        showAddModal () {
            console.log(this.data)
            this.isShowAddModal = true
        },
        hideAddModal () {
            this.isShowAddModal = false
        },
        showEditModal () {
            this.form.name = this.data.name
            this.showAddModal()
        },
        showConfirmDelModal () {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$emit('del', {
                    id: this.data.id,
                    parentIndex: this.parentIndex,
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
                    this.$emit('add-child', {
                        id: this.data.id,
                        parentIndex: this.parentIndex,
                        name: this.form.name,
                    })
                    this.clearInputAndCloseModal()
                } else {
                    return false;
                }
            });
        },
        checkNameIsRepeat (name = this.form.name) {
            const names = this.data.children && this.data.children.map(item => item.name) || []
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
    },
}
</script>

<style lang="less" scoped>
@border-color: #d8d8d8;

.children-width(@n, @i: 1) when (@i =< @n) {
    .children-@{i} {
        width: (860px - 30px * @i);
    }
    .children-width(@n, (@i + 1))
}

.tree-item {
    width: 860px;
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
    .children-width(3);
}
</style>