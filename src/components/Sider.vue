<template>
    <div class="leftNav">
        <!-- <el-scrollbar height="100%"> -->
        <!-- <div class="leftNav_name">
            <el-icon style="margin-right: 8px; font-size: 18px">
                <Monitor />
            </el-icon>工作台
        </div> -->

        <el-menu :default-active='activePath' class="el-menu-vertical-demo" active-text-color="#6ea2f5"
            style="border: 0px;font-size: 14px;">

            <template v-for="(item, index) in router.options.routes.slice(0,10)" :key="index">

                <el-sub-menu :index="index + ''" v-if="item.children">
                    <template #title>
                        <span style="padding-left: 20px">{{ item.name }}</span>
                    </template>
                    <el-menu-item-group style="background-color:#e4f7ff;">
                        <el-menu-item style="padding-left: 56px" @click="goToPurpose(item2.path)" :index="item2.path"
                            v-for="item2 in item.children" :key="item2">{{ item2.name }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <el-menu-item :index="index + ''" @click="goToPurpose(item.path)"  v-if="!item.children">
                    <span style="padding-left: 20px"> {{ item.name }}</span>
                </el-menu-item>
            </template>




        </el-menu>

        <!-- </el-scrollbar> -->

    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activePath = ref('/')


const currentPath = window.sessionStorage.getItem('activePath')
if (currentPath) {
    activePath.value = currentPath
}
const goToPurpose = (path) => {
    // 点击菜单选项更新激活状态
    activePath.value = path
    window.sessionStorage.setItem('activePath', path)
    router.push(path)
}

watch(router.currentRoute, (newValue, oldValue) => {
    // console.log('router.currentRoute', router.currentRoute)
    // console.log('值发生了变更', newValue, oldValue);
    activePath.value = newValue.path
    window.sessionStorage.setItem('activePath', activePath.value)
});

onMounted(() => {
    console.log('router', router.options.routes);
})

</script>

<style scoped lang="scss">
.leftNav {
    width: 165px;
    height: calc(100vh - 64px);
    background-color:  #f5f9fc;
    // background: url(../assets/img/bg_cebiandaohang@2.png);
    // background-size: cover;
    // background-position-y: 64px;
    // background-position-y: -108px;

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
    background-color:#ecf4fa;
    // color: #f39e00;
}

// .el-sub-menu:hover{
//     background-color:white;
// }
.el-menu-item.is-active {
    background-color: #ecf4fa;
    // color: #6494ee;
}
.el-menu-item-group__title{
    padding: 0;
}
</style>