<template>
    <div class="tree-item">
        <div class="wrap">
            <div :class="['icon', {'close' : !isExpand}]" v-if="hasChildren" @click="toggleExpandStatus"></div>
            <span :style="{'margin-left': hasChildren ? '12px' : '0'}">{{data.name}}</span>
            <div class="btn-container">
                <el-button type="text" @click="addChild">{{addChildBtnText}}</el-button>
                <el-button type="text" @click="edit">编辑</el-button>
                <el-button type="text" @click="showConfirmDelModal(del)">删除</el-button>
            </div>
        </div>
        <div v-if="hasChildren" v-show="isExpand" class="children">
            <div class="wrap" v-for="item in data.children" :key="item.name">
                <div class="info">
                    <span class="title">{{item.name}}</span>
                    <span class="sub-title">{{item.address}}</span>
                </div>
                <div class="btn-container">
                    <el-button type="text" @click="showConfirmDelModal(() => delChild(item, index))">删除</el-button>
                </div>
            </div>
        </div>
        <el-dialog :title="addBtnText" :visible.sync="isShowModal" width="40%">
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
    props: {
        data: {
            type: Object,
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
        },
        isAllExpand: Boolean,
        index: Number
    },
    data () {
        return {
            isExpand: this.isAllExpand,
            isShowModal: false,
            form: {
                name: ''
            }
        }
    },
    computed: {
        hasChildren (item) {
            return this.data.children && this.data.children.length 
        },
    },
     methods: {
        showModal () {
            this.isShowModal = true
        },
        hideModal () {
            this.isShowModal = false
        },
        toggleExpandStatus () {
            this.isExpand = !this.isExpand
        },
        edit () {
            this.showModal()
            this.form.name = this.data.name
        },
        cancel (formName) {
            this.$refs[formName].resetFields();
            this.clearInputAndCloseModal()
        },
        confirm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('edit', {
                        oldName: this.data.name,
                        index: this.index,
                        newName: this.form.name
                    })
                    this.clearInputAndCloseModal()
                } else {
                    return false;
                }
            });
        },
        clearInputAndCloseModal () {
            this.form.name = ''
            this.hideModal()
        },
        addChild (item) {
            this.$emit('add-child', {
                index: this.index,
                name: this.data.name
            })
        },
        del () {
            this.$emit('del', {
                index: this.index,
                name: this.data.name
            })
        },
        delChild (item, index) {
            this.$emit('del-child', {
                parentIndex: this.index,
                parentName: this.data.name,
                name: item.name,
                address: item.address,
                index
            })
        },
        showConfirmDelModal (callback) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                callback && callback()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    }
}
</script>

<style lang="less" scoped>
@border-color: #d8d8d8;

.tree-item {
    width: 860rpx;
    .wrap {
        display: flex;
        align-items: center;
        padding: 0 30px 0 18px;
        box-sizing: border-box;
        // position: relative;
        height: 60px;
        font-size: 14px;
        font-weight: bold;
        border: 1px solid @border-color;
        // line-height: $height;
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
        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 60px;
            .sub-title {
                font-size: 12px;
                color: #909399;
            }
        }
    }
    .children {
        padding-left: 30px;
    }
}
</style>