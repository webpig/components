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
        <div class="tags-wrap no-border">
            <div class="tags-item" v-for="item in currAddedSpecificationValue" :key="item.name">{{item.name}} <div class="delete-btn" @click="delTag(index)">+</div></div>
            <div class="add-value" v-if="isShowAddSpecificationValueBtn" @click="clickAddSpecificatioValueBtn">+增加规格值</div>
        </div>
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
        <div class="value-select" v-if="isClickedAddValueBtn && !isClickedSelectBox">
            <div class="select-area">
                <div class="title">选择{{currSelectedSpecificationName || '规格值'}}</div>
                <div class="empty-tip" v-if="specificationValues.length === 0">暂无规格值！请输入...</div>
                <div class="checkbox-container" v-if="specificationValues.length">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="checkall">全选</el-checkbox>
                    <el-checkbox-group v-model="currSelectedSpecificationValues" @change="handleCheckedValuesChange" style="">
                        <el-checkbox v-for="item in specificationValues" :label="item" :key="item" class="checkbox">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div style="display:flex">
                    <div class="tags-wrap">
                        <div class="tags-item" v-for="(item, index) in tempSpecificationValues" :key="item">{{item}} <div class="delete-btn" @click="delTag(index)">+</div></div>
                        <input v-model.trim="specificationValue" :placeholder="tempSpecificationValues.length === 0 ? '输入规格值，输入多个就用回车键隔开' : ''" :class="{'value-input': true, 'smaller-width': tempSpecificationValues.length > 0}" @keyup.enter="keyEnter" @keydown.delete="delTag"/>
                    </div>
                    <el-button type="primary" :disabled="tempSpecificationValues.length === 0 && !specificationValue " @click="addSpecificatioValue" style="height: 40px">增加规格值</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button @click="cancelSelectSpecificatioValue">取消</el-button>
                <el-button type="primary" :disabled="currSelectedSpecificationValues.length === 0" @click="confirmSelect">选好了</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'specificationList': Array,
        'addSpecificationName': Function,
        'form': Object
    },
    data () {
        return {
            isClickedSelectBox: false,
            isClickedAddValueBtn: false,
            isShowAddModal: false,
            currSelectedSpecificationName: '',
            currAddedSpecificationValue: [],
            checkAll: false,
            specificationValue: '',
            specificationValues: [],
            tempSpecificationValues: [],
            currSelectedSpecificationValues: [],
            isShowValuesBox: false,
            isOnlyOneChar: false
        }
    },
    created() {
    },
    computed: {
        isShowAddSpecificationValueBtn () {
            return !!this.currSelectedSpecificationName && !this.isClickedSelectBox && !this.isClickedAddValueBtn && this.currAddedSpecificationValue.length <= 18;
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
        },
        clickAddSpecificatioValueBtn () {
            this.isClickedAddValueBtn = true;
        },
        cancelSelectSpecificatioValue () {
            this.isClickedAddValueBtn = false;
            this.specificationValue = '';
        }, 
        addSpecificatioValue () {
            if (this.specificationValue && !this.isShowValuesBox) {
                this.tempSpecificationValues.push(this.specificationValue);
            }
            this.specificationValues = [...new Set(this.specificationValues.concat(this.tempSpecificationValues))];

            this.specificationValue = '';
            this.tempSpecificationValues = [];
        },
        handleCheckAllChange (val) {
            this.currSelectedSpecificationValues = val ? this.specificationValues : [];
        },
        handleCheckedValuesChange (val) {
            let checkedCount = val.length;
            this.checkAll = checkedCount === this.specificationValues.length;
        },
        focus () {

        },
        keyEnter () {
            if (this.tempSpecificationValues.indexOf(this.specificationValue) === -1 && this.specificationValue) {
                this.tempSpecificationValues.push(this.specificationValue);
                this.specificationValue = '';
            }
        },
        clickValuesBox () {
            // this.
        },
        delTag (index) {
            if (index >= 0) {
               this.tempSpecificationValues.splice(index, 1);
            } else if (this.specificationValue === '') {
                this.tempSpecificationValues.pop(); 
            }
        },
        confirmSelect () {
            this.specificationValues.forEach(item => {
                if (this.currAddedSpecificationValue.map(item => item.name) !== item) {
                    this.currAddedSpecificationValue.push({
                        name: item,
                        img: ''
                    })
                }
            });
            console.log(this.currAddedSpecificationValue)
            this.isClickedSelectBox = false;
            this.isClickedAddValueBtn = false;
        }
    }
}
</script>

<style lang="less" scoped>

@border-color: #d8d8d8;
@theme-color: #0486FE;

.tags-wrap {
    width: 424px;
    padding: 8px 10px;
    min-height: 40px;
    box-sizing: border-box;
    border: 1px solid @border-color;
    margin-right: 20px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    .tags-item  {
        display: flex;
        align-items: center;
        padding: 0 12px;
        height: 24px;
        border-radius: 24px;
        border: 1px solid #A3D0FD;
        color: @theme-color;
        font-size: 12px;
        background: #F2F6FC;
        margin-right: 12px;
        margin-bottom: 8px;
        font-weight: bold;
        .delete-btn {
            font-size: 16px;
            color: #A3D0FD;
            transform: rotate(45deg);
            margin-left: 8px;
            cursor: pointer;
        }
    }
    &.no-border {
        width: 800px;
        border: none;
        padding: 0;
        margin: 20px 0;
        .tags-item {
            background: #fff;
            border-color: @border-color;
            color: #999;
            &:hover {
                border-color: #A3D0FD;
                color: @theme-color;
                background: #F2F6FC;
                .delete-btn {
                    color: #A3D0FD;
                }
            }
        }
        .delete-btn {
            color: #999;
        }
    }
    .value-input {
        background: none;  
        outline: none;  
        border: 0px;
        height: 24px;
        width: 240px;
        &.smaller-width {
            width: 80px;
        }
    }
}
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
        z-index: 99999;
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
.add-value {
    font-size: 12px;
    color: @theme-color;
    cursor: pointer;
    // padding: 3px;
}
.value-select {
    width: 618px;
    border: 1px solid @border-color;
    margin-top: 20px;
    .select-area {
        padding: 18px 30px;
        .title {
            font-size: 14px;
            color: #606266;
            font-weight: bold;
            margin-bottom: 18px;
        }
        .empty-tip {
            font-size: 12px;
            color: #E6A23C;
            font-weight: bold;
            margin-bottom: 30px;
        }
        // .value-input, .value-box {
        //     width: 424px;
        //     min-height: 40px;
        //     margin-right: 12px;
        // }
        .value-box {
        //     // width: 100%;
        //     // height: 40px;
        //     // padding-left: 10px;
        //     // box-sizing: border-box;
        //     // border: 1px solid @border-color;
        //     // border-radius: 5px;
        //     display: flex;
        //     width: 600px;
        //     // align-items: center;
        //     flex-wrap: wrap;
            display: flex;
            .value-item {
                // width: 48px;
                display: inline-block;
                display: flex;
                align-items: center;
                padding: 0 12px;
                height: 24px;
                border-radius: 24px;
                border: 1px solid #A3D0FD;
                color: @theme-color;
                font-size: 12px;
                background: #F2F6FC;
                margin-right: 12px;
                margin-bottom: 12px;
                font-weight: bold;
                .delete-btn {
                    font-size: 16px;
                    color: #A3D0FD;
                    transform: rotate(45deg);
                    margin-left: 8px;
                }
            }
        }
        .checkbox-container {
            display: flex;
            margin-bottom: 10px;
            .checkbox {
                margin-bottom: 18px;
            }
        }
    } 
    .btn-row {
        height: 100%;
        padding: 12px 30px;
        border-top: 1px solid @border-color;
    }
}
    
</style>

