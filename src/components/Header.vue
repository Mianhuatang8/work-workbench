<template>
    <div class="header-all">
        <div class="left ">
            <div class="logo">实现家</div>
            <div class="text">版本1.0.0</div>
        </div>

        <div class="right">
            <div class="entryPlatform">入驻平台</div>
            <el-button class="startDesign" type="text"></el-button>
            <div class="avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();


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
    background: url(../assets/img/dingbudaohang_bg.png);
    background-repeat: no-repeat;
    background-position: right;

    .left {
        margin-left: 40px;
        display: flex;
        align-items: center;

        .logo {
            // background: url(../assets/img/实现家\ 2@2.png);
            // width: 108px;
            // height: 32px;
            // background-size: contain;
            // background-position: center;
            // z-index: 99999;
            color: #9d9d68;
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
            // background: url('../assets/img/实现家 2@2.png');
            // width: 108px;
            // height: 32px;
            // background-size: contain;
            // background-position: center;
            // position: absolute;
            // left: 16px;
            // top: 0;
            // margin: auto;
            // bottom: 0;
        }

        .text {
            color: #9d9d68;
            font-size: 14px;
            font-weight: bold;
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