<template>
    <div class="sku">
        <div class="select-container">
            <div style="display:flex;align-items:center">
                <div :class="{'select-box': true, 'active': isShowSelectBox, 'selected': !!currSelectItem.name}" @click="clickSelectBox">{{currSelectItem.name || '选择/新增规格名'}}</div>
                <el-checkbox v-model="isAddImg" style="margin-left:20px" v-if="isCanAddImg && currSelectItem.checkedValues.length > 0">添加规格图片</el-checkbox>
                <span style="font-size:12px;color:#909399;font-weight:bold;" v-if="currSelectItem.checkedValues.length > 0 && isAddImg">不同规格产品会展示不同的图片，建议尺寸：640 * 640 像素</span>
            </div>
            <div class="specification-list" v-if="isShowSelectBox">
                <div class="specification-item empty" v-if="skuList.length === 0">暂无规格</div>
                <div class="specification-item" v-for="item in skuList" :key="item.name" @click="selectSpecificationName(item)">{{item.name}}</div>
                <div class="specification-item border-top" @click="showAddModal">+ 新增规格名</div>
            </div>
            <div class="value-select" v-if="isShowSelectValueModal && !isShowSelectBox">
                <div class="select-area">
                    <div class="title">选择{{currSelectItem.name || '规格值'}}</div>
                    <div class="empty-tip" v-if="currSelectItem.values.length === 0">暂无规格值！请输入...</div>
                    <div class="checkbox-container" v-if="currSelectItem.values.length > 0">
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="checkall">全选</el-checkbox>
                        <el-checkbox-group v-model="tempCheckedValues" @change="handleCheckedValuesChange" style="">
                            <el-checkbox v-for="item in currSelectItem.values" :label="item" :key="item.text" class="checkbox">{{item.text}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="display:flex">
                        <div :class="[{'HL-border': isFocus},'tags-wrap']">
                            <div class="tags-item" v-for="(item, index) in tempSpecificationValues" :key="item">{{item}} <div class="delete-btn" @click="delTag(index)">+</div></div>
                            <input v-model.trim="specificationValue" :placeholder="tempSpecificationValues.length === 0 ? '输入规格值，输入多个就用回车键隔开' : ''" :class="{'value-input': true, 'smaller-width': tempSpecificationValues.length > 0}" @keyup.enter="keyEnter" @keydown.delete="delTag" @focus="focus" @blur="blur"/>
                        </div>
                        <el-button type="primary" :disabled="tempSpecificationValues.length === 0 && !specificationValue " @click="addSpecificatioValue" style="height: 40px">增加规格值</el-button>
                    </div>
                </div>
                <div class="btn-row">
                    <el-button @click="cancelSelectSpecificatioValue">取消</el-button>
                    <el-button type="primary" :disabled="tempCheckedValues.length === 0" @click="confirmSelect">选好了</el-button>
                </div>
            </div>
        </div>
        <div class="tags-wrap no-border">
            <div style="margin-right:12px" v-for="(item, index) in currSelectItem.checkedValues" :key="item.text">
                <div class="tags-item">{{item.text}} <div class="delete-btn" @click="delValue(index)">+</div></div>
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleUploadSuccess"
                    v-if="isAddImg">
                    <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" @click="setCurrItem(item)">
                    <i v-else class="el-icon-plus avatar-uploader-icon" @click="setCurrItem(item)"></i>
                </el-upload>
            </div>
            <div class="add-value" v-if="isShowAddSpecificationValueBtn" @click="clickAddSpecificatioValueBtn">+增加规格值</div>
        </div>
        <el-dialog title="新增规格名" :visible.sync="isShowAddModal" width="30%">
            <el-form :inline="true" :model="form" ref="form">
                <el-form-item
                    label="规格名"
                    :prop="form.specificationName"
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
        'skuList': Array,
        'isCanAddImg': Boolean
        // 'addSpecificationName': Function,
        // 'form': Object
    },
    data () {
        return {
            isShowSelectBox: false,
            isShowSelectValueModal: false,
            isShowAddModal: false,
            currAddedSpecificationValue: [],
            checkAll: false,
            currSelectItem: {
                name: '',
                values: [],
                checkedValues: []
            },
            specificationValue: '',
            tempSpecificationValues: [],
            isShowValuesBox: false,
            tempCheckedValues: [],
            form: {
                specificationName: ''
            },
            isAddImg: false,
            isFocus: false,
            currValue: ''
        }
    },
    created() {
    },
    computed: {
        isShowAddSpecificationValueBtn () {
            return !!this.currSelectItem.name && !this.isShowSelectBox && !this.isShowSelectValueModal && this.currSelectItem.checkedValues.length < 18;
        },
    },
    methods: {
        focus () {
            this.isFocus = true;
        },
        blur () {
            this.isFocus = false;
        },
        setCurrItem (item) {
            this.currValue = item.text;
        },
        handleUploadSuccess (res, file) {
            let imageUrl = URL.createObjectURL(file.raw);
            this.currSelectItem.checkedValues.forEach((item, index) => {
                if (item.text === this.currValue) {
                    this.currSelectItem.checkedValues[index].imageUrl = imageUrl;
                }
            });
            this.handleChange();
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
            this.form.specificationName = '';
            this.hideAddModal();
        },
        confirmAdd (formName) {
            const names = this.skuList.map(item => item.name);

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (names.indexOf(this.form.specificationName) === -1) {
                        this.$emit('add-sku-name', this.form.specificationName);
                        this.hideAddModal();
                    } else {
                        this.$message({
                            message: '已有该规格名，请重新编辑！',
                            type: 'warning'
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        selectSpecificationName (item) {
            this.currSelectItem = item;
            this.isShowSelectBox = false;
            this.checkAll = false;
            this.currSelectItem.checkedValues = [];
            this.currAddedSpecificationValue = [];
            this.tempCheckedValues = [];
        },
        clickAddSpecificatioValueBtn () {
            this.isShowSelectValueModal = true;
            this.tempCheckedValues = this.currSelectItem.checkedValues;
            this.checkAll = this.currSelectItem.values.length === this.tempCheckedValues.length;
        },
        cancelSelectSpecificatioValue () {
            this.isShowSelectValueModal = false;
            this.specificationValue = '';
            // this.checkedValues
        }, 
        addSpecificatioValue () {
            const len = this.currSelectItem.values.length;

            if (this.specificationValue && !this.isShowValuesBox) {
                this.tempSpecificationValues.push(this.specificationValue);
            }

            let arr = this.currSelectItem.values.slice(), values = this.currSelectItem.values.map(item => item.text);
            this.tempSpecificationValues.forEach(item => {
                if (values.indexOf(item) === -1) {
                    arr.push({
                        text: item,
                        imageUrl: ''
                    });
                }
            });
            this.$emit('add-sku-value', {
                name: this.currSelectItem.name,
                values: arr
            });

            this.specificationValue = '';
            this.tempSpecificationValues = [];

            if (this.currSelectItem.values.length > len) {
                this.checkAll = false;
            }
        },
        handleCheckAllChange (val) {
            this.tempCheckedValues = val ? this.currSelectItem.values.slice() : [];
        },
        handleCheckedValuesChange (val) {
            let checkedCount = val.length;
            this.checkAll = checkedCount === this.currSelectItem.values.length;
        },
        keyEnter () {
            let values = this.currSelectItem.values.map(item => item.text);
            if (values.indexOf(this.specificationValue) === -1 && this.tempSpecificationValues.indexOf(this.specificationValue) === -1 && this.specificationValue) {
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
        delValue (index) {
            this.currSelectItem.checkedValues.splice(index, 1);
            this.handleChange();
        },
        confirmSelect () {
            this.currSelectItem.checkedValues = this.tempCheckedValues;
            this.isShowSelectBox = false;
            this.isShowSelectValueModal = false;
            this.handleChange();
        }, 
        handleChange () {
            this.$emit('change', this.currSelectItem);
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
    // min-height: 40px;
    box-sizing: border-box;
    border: 1px solid @border-color;
    margin-right: 20px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    &.HL-border {
        border-color: @theme-color;
    }
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
        .tags-item {
            background: #fff;
            border-color: @border-color;
            color: #999;
            margin: 20px 0 12px 0;
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
.add-value {
    font-size: 12px;
    color: @theme-color;
    cursor: pointer;
    // padding: 3px;
    margin-top: 24px;
}
.value-select {
    position: absolute;
    width: 618px;
    border: 1px solid @border-color;
    top: 50px;
    z-index: 1;
    background: #fff;
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
        .value-box {
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
.avatar-uploader {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 60px;
    margin: 0 auto;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
    
</style>

