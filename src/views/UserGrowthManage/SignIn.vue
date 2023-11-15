<template>
    <div class="Container" style="padding:22px">
        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>用户成长管理</span>
            <span style="margin:0 5px">/</span>
            <span style="margin:0 5px;font-weight: bold;">签到</span>
        </div>

        <div style="background-color: white;padding: 30px;">
            <div class="top">
                <div class="top-left"></div>
                <div class="top-right">
                    <el-button style="margin-right:10px">新增</el-button>
                    <el-button style="margin-right:10px">已启用</el-button>
                    <el-button>停用</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.top{
    .top-left{

    }

    .top-right{
        display: flex;
    }
}

</style>