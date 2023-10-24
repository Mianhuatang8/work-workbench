
<template>
  <el-container>
    <el-header height="64px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="165px">
        <sider></sider>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './components/Header.vue';
import Sider from './components/Sider.vue';
import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped lang="scss">
.el-container {
  height: calc(100vh - 64px);
}

.el-header {
  z-index: 999999;
  --el-header-padding: 0;
}

.el-main {
  // background: url(./assets/img/bg_zhu@2.png);
  padding: 30px 24px;
  background-color: whitesmoke;
}
</style>


