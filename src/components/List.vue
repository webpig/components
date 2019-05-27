<template>
    <div>
        <div class="btn" @click="addItem">新增自定义</div>
        <div class="list" v-if="list.length > 0">
            <div class="item" v-for="(item, index) in list" :key="item.name">
                <span class="name">{{item.name}}</span>
                <div>
                    <span class="operate-btn" @click="editItem(index)">编辑</span>
                    <span class="operate-btn" @click="deleteItem(index)">删除</span>
                </div>
            </div>
        </div>
        <el-dialog title="新增自定义" :visible.sync="isShowAddModal" width="30%">
            <el-form :inline="true" :model="form" ref="form">
                <el-form-item
                    label="名称"
                    prop="name"
                    label-width="60px"
                    :rules="{ 
                        required: true, message: '请输入名称', trigger: 'blur'
                    }">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="isShowEditModal" width="30%">
            <el-form :inline="true" :model="form" ref="form">
                <el-form-item
                    label="名称"
                    prop="name"
                    label-width="60px"
                    :rules="{ 
                        required: true, message: '请输入名称', trigger: 'blur'
                    }">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="confirmEdit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            form: {
                name: ''
            },
            currIndex: 0,
            isShowAddModal: false,
            isShowEditModal: false
        }
    },
    methods: {
        addItem() {
            this.isShowAddModal = true;
        },
        hideAddModal() {
            this.isShowAddModal = false;
        },
        showAddModal() {
            this.isShowAddModal = true;
        },
        cancel() {
            this.hideAddModal();
            this.form.name = '';
        },
        confirmAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.name) {
                        this.list.push({
                            name: this.form.name
                        });
                        this.hideAddModal()
                        this.form.name = '';
                        this.showSuccessTip('添加成功！');
                    }
                } else {
                    return false;
                }
            });
        },
        hideEditModal() {
            this.isShowEditModal = false;
        },
        showEditModal() {
            this.isShowEditModal = true;
        },
        cancelEdit() {
            this.hideEditModal();
            this.form.name = '';
        },
        editItem(index) {
            this.showEditModal();
            this.form.name = this.list[index].name;
            this.currIndex = index;
        },
        deleteItem(index) {
            this.list.splice(index, 1);
            this.showSuccessTip('删除成功！');
        },
        confirmEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.name) {
                        this.list.splice(this.currIndex, 1, {name: this.form.name});
                        this.hideEditModal();
                        this.form.name = '';
                        this.showSuccessTip('编辑成功！')
                    }
                } else {
                    return false;
                }
            });
        },
        showSuccessTip(message) {
            this.$message({
                message,
                type: 'success'
            });
        }
    }
}
</script>

<style>
    .btn {
        width: 98px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        background: #409EFF;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
    }
    .list {
        margin-top: 18px;
    }
    .item {
        width: 100%;
        height: 60px;
        border: 1px solid #999;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 28px;
        font-size: 14px;
        box-sizing: border-box;
    }
    .name {
        color: #000;
    }
    .operate-btn {
        color: #409EFF;
        margin-left: 12px;
        cursor: pointer;
    }
</style>
