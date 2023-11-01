<template>
    <div class="leftNav">
        <el-menu :default-active='activePath' class="el-menu-vertical-demo" active-text-color="#6ea2f5"
            style="border: 0px;font-size: 14px;">
            <template v-for="(item, index) in router.options.routes.slice(0, 10)" :key="index">
                <el-sub-menu :index="index + ''" v-if="item.children">
                    <template #title>
                        <img :src="getAssetsFile(index)" style="width: 20px;height: 20px;" />
                        <!-- <img :src="getAssetsFile_active(index)" style="width: 20px;height: 20px;" v-show="item.active"/> -->
                        <span style="padding-left: 10px">{{ item.name }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item style="padding-left: 56px" @click="goToPurpose(item2.path)" :index="item2.path"
                            v-for="item2 in item.children" :key="item2">{{ item2.name }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <el-menu-item :index="index + ''" @click="goToPurpose(item.path)" v-if="!item.children">
                    <img :src="getAssetsFile(index)" style="width: 20px;height: 20px;" v-show="item.path!=activePath" />
                    <img :src="getAssetsFile_active(index)" style="width: 20px;height: 20px;" v-show="item.path==activePath"/>
                    <span style="padding-left: 10px" :style="{'color':item.path==activePath?'#6ea2f5':''}"> {{ item.name }}</span>
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

//获取图片资源
const getAssetsFile = (index) => {
    return new URL(`../assets/img/${index}.png`, import.meta.url).href
}
const getAssetsFile_active=(index)=>{
    return new URL(`../assets/img/${index}_active.png`, import.meta.url).href
}

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
    background-color: #f5f9fc;
    overflow-x: hidden;
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

:deep(.el-menu-item-group__title) {
    display: none;
}

:deep(.el-menu-item:hover) {
    background-color: #ecf4fa;
    color: #6ea2f5;
}

:deep(.el-menu-item.is-active) {
    background-color: #ecf4fa;
    color: #6ea2f5;

}

:deep(.el-sub-menu__title:hover) {

    background-color: #ecf4fa;
}

:deep(.el-sub-menu__title) {
    background-color: transparent;
}


:deep(.el-menu) {
    background-color: transparent;
}

// .el-menu-item {

//     span {
//         font-size: 15px;
//         padding-left: 34px;
//         color: black;
//     }
// }
</style>