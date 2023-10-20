<template>
    <div class="leftNav">
        <!-- <el-scrollbar height="100%"> -->
        <div class="leftNav_name">
            <el-icon style="margin-right: 8px; font-size: 18px">
                <Monitor />
            </el-icon>工作台
        </div>

        <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="#F39E00" style="border: 0px;font-size: 14px;">
            <el-menu-item v-for="(item, index) in router.options.routes.slice(0, 5)" :index="index" :key="index"
                @click="goToPurpose(item.path)">
                <span> {{ item.name }}</span>
            </el-menu-item>
        </el-menu>

        <!-- </el-scrollbar> -->

    </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToPurpose = (path) => {
    router.push(path)
}

onMounted(() => {
    console.log('router', router.options.routes);
})

</script>

<style scoped lang="scss">
.leftNav {
    width: 240px;
    height: calc(100vh - 64px);
    background: url(../assets/img/bg_cebiandaohang@2.png);
    background-size: cover;
    background-position-y: 64px;
    background-position-y: -108px;

    .leftNav_name {
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        box-sizing: border-box;
        font-size: 18px;
        color: #000000, 88%;
    }
}

.el-menu {
    background-color: transparent;
}

.el-menu-item {
   
    span {
        font-size: 15px;
        padding-left: 34px;
        color: black;
    }
}

.el-menu-item:hover {
    background-color: #fff7ea;
    // color: #f39e00;
}

.el-menu-item.is-active {
    background-color: #fff7ea;
}
</style>