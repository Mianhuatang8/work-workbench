<template>
    <div class="header-all">
        <div class="left ">
            <div class="logo">
                <img src="../assets/img/logo_text_1@3x.png" alt="" style="width: 92px;height: 31px;">
            </div>
            <div class="text">实现家后台管理系统</div>
        </div>

        <div class="right" v-if="token">
            <div class="avatar">
                <el-dropdown>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="loginOut()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div style="margin-left: 10px;">
                <div>
                    <span style="font-size: 14px;">
                        草堂画里21314
                    </span>
                </div>
                <div>
                    <span style="color: gray;font-size: 12px">普通会员</span>
                </div>
            </div>
        </div>
        <div class="right" v-if="!token" style="cursor: pointer;">
            <span @click="login()">登录</span>
            <span style="margin:0 5px">|</span>
            <span @click="register()">注册</span>

        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const token = ref('23e25r')
//登录
const login = () => {
    token.value = '1223'
}
//退出登录
const loginOut = () => {
    token.value = ''
}

</script>

<style scoped lang="scss">
.header-all {
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
    // background: url(../assets/img/dingbudaohang_bg.png);
    // background-repeat: no-repeat;
    // background-position: right;

    .left {
        // margin-left: 40px;
        display: flex;
        align-items: center;

        .logo {
            width: 130px;
            text-align: center;
            line-height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 14px;

        }

        .text {
            height: 64px;
            line-height: 64px;
            padding-left: 35px;
            color: #333333;
            font-weight: 600;
            font-size: 18px;
        }

    }

    .right {
        display: flex;
        margin-right: 40px;
        align-items: center;

        .entryPlatform {
            // position: absolute;
            // right: 248px;
            font-size: 14px;
            display: flex;
            height: 100%;
            align-items: center;
            cursor: pointer;
            margin-right: 35px;
        }

        .startDesign {
            color: #fff;
            cursor: pointer;
            width: 96px;
            height: 40px;
            // border-radius: 3px;
            background: url(../assets/img/button-kaishisheji.png);
        }

        .avatar {
            display: flex;
            align-items: center;
            margin-left: 35px;

            span {
                margin-left: 5px;
                color: white;
                font-size: 13px;
            }
        }

    }
}
</style>