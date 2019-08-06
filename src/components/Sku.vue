<template>
    <div class="sku">
        <div class="select-container">
            <div :class="{'select-box': true, 'active': isClickedSelectBox, 'selected': !!currSelectedSpecificationName}" @click="clickSelectBox">{{currSelectedSpecificationName || '选择/新增规格名'}}</div>
            <div class="specification-list" v-if="isClickedSelectBox">
                <div class="specification-item empty" v-if="specificationList.length === 0">暂无规格</div>
                <div class="specification-item" v-for="item in specificationList" :key="item.name" @click="selectSpecificationName(item.name)">{{item.name}}</div>
                <div class="specification-item border-top" @click="showAddModal">+ 新增规格名</div>
            </div>
        </div>
        <div class="add-value" v-if="isShowAddSpecificationValueBtn">+增加规格值</div>
        <el-dialog title="新增规格名" :visible.sync="isShowAddModal" width="30%">
            <el-form :inline="true" :model="form" ref="form">
                <el-form-item
                    label="规格名"
                    prop="specificationName"
                    label-width="100px"
                    :rules="{ 
                        required: true, message: '请输入规格名', trigger: 'blur'
                    }">
                    <el-input v-model="form.specificationName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        'specificationList': Object,
        'addSpecificationName': Function,
        'form': Object
    },
    data () {
        return {
            isClickedSelectBox: false,
            isShowAddModal: false,
            currSelectedSpecificationName: '',
            // form: {
            //     specificationName: '',
            // },
            // specificationList: [{
            //     name: '尺寸',
            //     values: []
            // }, {
            //     name: '颜色',
            //     values: []
            // }]
        }
    },
    created() {
        console.log(this.specificationList);
    },
    computed: {
        isShowAddSpecificationValueBtn () {
            return !!this.currSelectedSpecificationName && !this.isClickedSelectBox;
        }
    },
    methods: {
        clickSelectBox () {
            this.isClickedSelectBox = !this.isClickedSelectBox;
        },
        showAddModal () {
            this.isShowAddModal = true;
        },
        hideAddModal () {
            this.isShowAddModal = false;
        },
        cancel () {
            this.form.specificationName = '';
            this.hideAddModal();
        },
        confirmAdd (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addSpecificationName();
                    this.hideAddModal();
                } else {
                    return false;
                }
            });
        },
        selectSpecificationName (specificationName) {
            this.currSelectedSpecificationName = specificationName;
            this.isClickedSelectBox = false;
        }
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
            &.empty {
                background: #F2F6FC;
            }
        }
    }
}
.add-value {
    margin-top: 20px;
    font-size: 12px;
    color: @theme-color;
    cursor: pointer;
}
    
</style>

