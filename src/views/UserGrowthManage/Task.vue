<template>
    <div class="Container" style="padding:22px">
        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>用户成长管理</span>
            <span style="margin:0 5px">/</span>
            <span style="margin:0 5px;font-weight: bold;">任务</span>
        </div>

        <div style="background-color: white;padding: 30px;">
            <!-- :cell-style="{ padding: 0 + 'px' }" :row-style="{ height: 40 + 'px' }" -->
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#F2F3F8' }">
                <el-table-column fixed prop="task" label="任务" align="center">
                </el-table-column>
                <el-table-column fixed prop="growthValue" label="获取成长值" align="center">
                </el-table-column>
                <el-table-column fixed prop="maxNumber" label="上限次数" align="center">
                </el-table-column>
                <el-table-column prop="funOpenLevel" label="功能对哪某个等级开放" align="center" />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default>
                        <el-button size="small">启用</el-button>
                        <el-button size="small">停用</el-button>
                        <el-button type="primary" @click="edit(row)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>


    <el-dialog v-model="addDialogVisible" title="修改" width="30%">
        <div class="dialog-content" style="padding: 30px;">
            <el-form :model="formData" :rules="rules" ref="addFormRef">
                <el-form-item label="任务" prop="task">
                    <template>
                        {{formData.task}}
                    </template>
                </el-form-item>

                <el-form-item label="成长值对不同等级的配置" prop="level">
                    <el-select v-model="formData.SysUserInfoLevelCode" class="m-2" placeholder="请选择">
                        <el-option v-for="(item, index) in levelSort" :key="item" :label="item" :value="index" />
                    </el-select>
                </el-form-item>

                <el-form-item label="输入不同等级对应的成长值" prop="growthValue">
                    <el-input v-model="formData.growthValue" style="margin-right: 20px;" placeholder="请输入整数数字，例如2" />
                </el-form-item>
                <el-form-item label="上限次数" prop="maxNumber">
                    <el-input v-model="formData.maxNumber" style="margin-right: 20px;" placeholder="请输入整数数字，例如3" />
                </el-form-item>

                <el-form-item label="功能对哪些等级开发（可多选）" prop="funOpenLevel">
                    <el-select v-model="formData.funOpenLevel" class="m-2" placeholder="请选择">
                        <el-option v-for="(item, index) in levelSort" :key="item" :label="item" :value="index" />
                    </el-select>
                </el-form-item>

            </el-form>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'


const tableData = ref([
    {
        task: '每天登录',
        growthValue: 'lv.1:5',
        maxNumber: 5,
        funOpenLevel: '全部等级'
    },
    {
        task: '参与设计竞选',
        growthValue: 'lv.1:5',
        maxNumber: 5,
        funOpenLevel: '全部等级'
    },
    {
        task: '分享画作',
        growthValue: 'lv.1:5',
        maxNumber: 5,
        funOpenLevel: '全部等级'
    },
    {
        task: '邀请好友',
        growthValue: 'lv.1:5',
        maxNumber: 5,
        funOpenLevel: '全部等级'
    },
    {
        task: '发布灵感',
        growthValue: 'lv.1:5',
        maxNumber: 5,
        funOpenLevel: '全部等级'
    },
])

const formData=ref({
    task:'分享画作',
    level:null,
    growthValue:undefined,
    maxNumber:undefined,
    funOpenLevel:[]


})

const addDialogVisible = ref(false)
const addFormRef = ref(null)

const levelSort = ref(['全部等级', '仅限LV1等级以上用户开放', '仅限LV2等级以上用户开放', '仅限LV3等级以上用户开放',
    '仅限LV4等级以上用户开放', '仅限LV5等级以上用户开放', '仅限LV6等级以上用户开放', '仅限LV7等级以上用户开放'])

//编辑
const edit = () => {

    addDialogVisible.value = true

}
//启用-停用
</script>

<style lang="scss" scoped></style>