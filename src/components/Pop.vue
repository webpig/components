<template>
    <transition name="fade">
        <div class="mask" v-show="visible">
            <div class="pop">
                <header class="header">
                    <div class="icon-close" @click="close"></div>
                    <div>{{title}}</div>
                    <el-button type="primary" class="save-btn" @click="save">保存</el-button>
                </header>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    data () {
        return {
        }
    },
    methods: {
        close () {
            this.$emit('update:visible', false)
        },
        save () {
            this.$emit('save')
        }
    }
}
</script>

<style lang="less" scoped>
    @border-color: #E4E7ED;
    @close-icon-color: #555;

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(100%);
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .pop {
            position: absolute;
            top: 0;
            right: 0;
            width: 80%;
            height: 100%;
            background: #fff;
            border-left: 1px solid @border-color;
            box-shadow: -1px 0 4px @border-color;
            .header {
                display: flex;
                align-items: center;
                padding: 0 30px;
                height: 72px;
                border-bottom: 1px solid @border-color;
                font-size: 18px;
                color: #303133;
                font-weight: bold;
                .icon-close {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border: 2px solid @close-icon-color;
                    border-radius: $width;
                    margin-right: 12px;
                    &::before, &::after {
                        content: '';
                        position: absolute;
                        width: 2px;
                        height: 10px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) rotate(45deg);
                        background: @close-icon-color;
                    }
                    &::after {
                        transform: translate(-50%, -50%) rotate(-45deg);
                    }
                }
                .save-btn {
                    margin-left: auto;
                }
            }
        }
    }
</style>