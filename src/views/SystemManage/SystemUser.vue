<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
         <span>系统管理</span>
         <span style="margin:0 5px">/</span>
         <span style="margin:0 5px;font-weight: bold;">系统用户</span>
      </div>
  
      <div class="card-content">
        <div class="role-sort" style="display:flex;">
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
            角色分类
          </div>
          <div v-for="(item, index) in sortRole" :key="index"
            style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
            :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
            {{ item }}</div>
        </div>
        <div class="datePick">

          <div style="display: flex;align-items: center;width: 45%;">
            <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
              日期
            </div>
            <el-date-picker v-model="params.date" value-format="yyyy/MM/dd" format="yyyy/MM/dd"
              :picker-options="pickerOptions" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              style="float:left">
            </el-date-picker>
            <div class=" " v-for="(item, index) in daysArr" :key="index">
              <div @click="daysChoose(index)"
                style="margin:0 12px;width: 60px;line-height: 32px;font-size: 14px;margin:0 15px">
                {{ item }}
              </div>
            </div>


          </div>
          <div style="display: flex;margin-right: 60px;">
            <el-button type="primary" style="margin-right:10px;" :icon="Search">查询</el-button>
            <el-button>重置</el-button>

          </div>
        </div>

      </div>

    <div style="background-color: white;padding: 30px;">
      <div
        style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
        <el-button type="primary" style="margin-right: 8px;" @click="addUser()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary" style="margin-right: 8px;">批量操作</el-button>
          <el-button type="danger" plain>删除</el-button>
        </div>
      </div>
      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>

        <el-table-column prop="id" align="center" header-align="center" label="用户ID">
        </el-table-column>
        <el-table-column prop="name" align="center" header-align="center" label="用户名">
        </el-table-column>
        <el-table-column prop="number" align="center" header-align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="role" align="center" header-align="center" label="用户角色">
          <template #default="scope">
            <span>{{ scope.row.role == 0 ? '超级管理员' : '后台用户' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="lastOnlineTime" align="center" header-align="center" label="最近上线时间">
        </el-table-column>
        <el-table-column prop="createTime" align="center" header-align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <div style="color: #009fff; " @click="lookDetail()">查看</div>
              <div style="color: #009fff; " @click="editItem(scope.row)">编辑</div>
              <el-popconfirm title="请问确定要删除吗?" confirm-button-text="是" cancel-button-text="取消" @confirm="delItem()">
                <template #reference>
                  <div style="color: red; ">删除</div>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>


  <!-- 新建用户的对话框 -->
  <el-dialog v-model="dialogVisible" title="新增" width="35%" :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-radio-group v-model="form.role">
            <el-radio label="高级管理员" name="0"/>
            <el-radio label="普通管理员" name="1"/>
            <el-radio label="普通后台用户" name="2"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="form.desc" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认 </el-button>
      </span>
    </template>
  </el-dialog>

</template>
  
<script setup>
import { ref } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const sortRole = ref(['不限', '高级管理员', '普通管理员', '普通用户'])
const selectRoleSortIndex = ref(0)

const pickerOptions = ref({
  disabledDate(time) {
    // 设置选择今天及今天之后的日期
    return time.getTime() < Date.now() - 8.64e7;
  }

})
const params = ref({
  startTime: '',
  endTime: '',
  date: ''
})
const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])
// const data = ref([])
// const onionActiveId = ref(0)
// const dataActivateId = ref(0)

const tableData = ref([
  {
    id: '1',
    name: '王小虎',
    number: '12312335261',
    role: 0,//0-超级管理员 1-后台用户
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },
  {
    id: '2',
    name: '王小虎',
    number: '12312335261',
    role: 1,//0-超级管理员 1-后台用户
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },
  {
    id: '3',
    name: '王小虎',
    number: '12312335261',
    role: 0,//0-超级管理员 1-后台用户
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },])


const form=ref({
  name:'',
  role:null,
  password:'',
  desc:''
})
const dialogVisible=ref(false)


//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}

//日期右边的几个快速选择
const daysChoose = (index) => {

}

//新建用户
const addUser = () => {
  dialogVisible.value=true

}

//查看
const look = () => {

}
//编辑
const editItem = (row) => {

}
//删除
const delItem = () => {

}

</script>
  
<style scoped lang="scss">
.selectedRoleStyle {
  color: white;
  display: flex;
  justify-content: center;
  background-color: #06a6ff;
  width: 100px;
  line-height: 30px;
  height: 30px;
  border-radius: 25px;
}

.card-content {
  background-color: white;
   padding: 17px;
   margin-bottom: 30px;
  .datePick {
    display: flex;
    margin-top: 28px;
    align-items: center;
    justify-content: space-between;
  }
}
</style>