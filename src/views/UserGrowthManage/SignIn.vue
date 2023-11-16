<template>
    <div class="Container" style="padding:22px">
        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>用户成长管理</span>
            <span style="margin:0 5px">/</span>
            <span style="margin:0 5px;font-weight: bold;">签到</span>
        </div>

        <div style="background-color: white;padding: 30px;">
            <div class="top">
                <div class="top-left">
                    <ul>
                        <li>1、用户进行签到即可获得相应积分，以七天为一个周期。</li>
                        <li>2、每个用户每天仅可获得一次，需连续签到方可获得递增积分，签到终端则需从第一天重新开始。</li>
                        <li>3、签到活动持续在线，属于日常活动</li>
                    </ul>

                </div>
                <div class="top-right">
                    <el-button style="margin-right:10px" @click="add()">新增</el-button>
                    <el-button style="margin-right:10px">已启用</el-button>
                    <el-button>停用</el-button>
                </div>
            </div>

            <el-table :data="tableData" style="width: 100%" 
            :cell-style="{ padding: 0 + 'px' }" :row-style="{ height: 40 + 'px' }"
            :header-cell-style="{ background: '#F2F3F8' }">
                <el-table-column fixed prop="signDays" label="签到天数" align="center">
                    <template #default="scope">
                        用户签到{{ scope.row.signDays }}天,将获得
                    </template>
                </el-table-column>
                <el-table-column prop="growthValue" label="获取成长值" align="center" />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default>
                        <el-button link type="primary" @click="edit(row)">修改</el-button>
                        <el-button link type="danger" @click="del(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>

    <el-dialog v-model="addDialogVisible" :title="type == 'edit' ? '编辑' : '新增'" width="30%">
        <div class="dialog-content" style="padding: 30px;">
            <el-form :model="formData" :rules="rules" ref="addFormRef">
                <el-form-item label="输入第n天" prop="signDays">
                    <el-input v-model="formData.signDays" style="margin-right: 20px;" />
                </el-form-item>

                <el-form-item label="获取值" prop="growthValue">
                    <el-input v-model="formData.growthValue" style="margin-right: 20px;" />
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
import { reactive, ref } from 'vue'

const tableData = ref([
    {
        signDays: 1,
        growthValue: 4,
    },
    {
        signDays: 2,
        growthValue: 8,
    },
    {
        signDays: 3,
        growthValue: 12,
    }
])

const formData = reactive({
    signDays: '',
    growthValue: ''
})

const addFormRef = ref(null)
const addDialogVisible = ref(false)
const type = ref('add')
//表单验证规则
const rules = reactive({
    signDays: [
        { required: true, message: '请输入天数', trigger: 'blur' },
    ],
})


//添加
const add = () => {
    type.value = 'add'
    //清空表单数据
    addFormRef.value.resetFields()
    addDialogVisible.value = true
}

//编辑
const edit = (row) => {
    type.value = 'edit'
    addDialogVisible.value = true

}

//确认编辑/新增
const confirm = async () => {
    //表单规则验证
    addFormRef.value.validate((valid, fields) => {
        if (valid) {
            addDialogVisible.value = false
            if (type == 'add') {
                ElMessage({
                    message: '新增成功',
                    type: 'success',
                })
            }
            if (type == 'edit') {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
            }
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
            return false
        }
    })
}

//删除
const del = (row) => {

}



</script>

<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .top-left {
        li {
            line-height: 20px;
            font-size: 15px;
        }

    }

    .top-right {
        display: flex;
        align-items: center
    }
}
</style>