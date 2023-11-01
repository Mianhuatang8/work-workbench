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

        <div style="display: flex;align-items: center;width: 52%;">
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
            日期
          </div>
          <el-date-picker v-model="form.time" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            :picker-options="pickerOptions" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
            style="float:left">
          </el-date-picker>
          <div class=" " v-for="(item, index) in daysArr" :key="index " style="cursor: pointer;">
            <div @click="setTimeByDays(index)"
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
          <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
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
        <el-table-column prop="role" align="center" header-align="center" label="用户角色">
          <template #default="scope">
            <span>{{ scope.row.role == 0 ? '高级管理员' : scope.row.role == 1 ? '普通管理员' : '普通后台用户' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" align="center" header-align="center" label="手机号">
        </el-table-column>


        <el-table-column prop="lastOnlineTime" align="center" header-align="center" label="最近上线时间">
        </el-table-column>
        <el-table-column prop="createTime" align="center" header-align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <div style="color: #009fff; " @click="lookItem()">查看</div>
              <div style="color: #009fff; " @click="editItem(scope.row)">编辑</div>
              <div style="color: red;" @click="delItem(scope.row)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
        <div style="margin-right: 15px;">
          共<span>{{ pages.total }}</span>条
        </div>
        <el-pagination v-model:current-page="pages.currentPage"  :page-size="pages.limit"
          :small="small" :disabled="disabled" background layout=" prev, pager, next, jumper" :total="pages.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" ></el-pagination>
      </div>

    </div>
  </div>


  <!-- 新建用户的对话框 -->
  <el-dialog v-model="dialogVisible" :title="type == 'add' ? '新建' : type == 'look' ? '查看详情' : '编辑'" width="35%"
    :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="form.name" placeholder="请输入" :disabled="type == 'look'" />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-radio-group v-model="form.role" :disabled="type == 'look'">
            <el-radio label="高级管理员" name="0" />
            <el-radio label="普通管理员" name="1" />
            <el-radio label="普通后台用户" name="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入" :disabled="type == 'look'" />
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="form.desc" placeholder="请输入" :disabled="type == 'look'" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish(type)" v-if="type != 'look'">完成 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { onMounted, ref,reactive } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

//分页条数据
const pages=ref({
  total:1000,
  currentPage:1,
  limit:10

})

const sortRole = ref(['不限', '高级管理员', '普通管理员', '普通用户'])
const selectRoleSortIndex = ref(0)

const pickerOptions = ref({
  disabledDate(time) {
    // 设置选择今天及今天之后的日期
    return time.getTime() < Date.now() - 8.64e7;
  }
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
    role: 0,//0-超级管理员 1-普通管理员 2-普通后台用户
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


const form = reactive({
  name: '',
  role: null,
  password: '',
  desc: '',
  time:null,
})

const formatDate = (time) => {
  const y = time.getFullYear();
  const yy = y < 10 ? '0' + y : y
  const m = time.getMonth() + 1;
  const mm = m < 10 ? '0' + m : m
  const d = time.getDate();
  const dd = d < 10 ? '0' + d : d
  return `${yy}-${mm}-${dd}`;
}

const setTimeByDays = (value) => {
  console.log('点击日期', value);
  const end = new Date()
  const start = new Date()
  if (value == 1) {
    // const date = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    end.setTime(end.getTime() - 3600 * 1000 * 24)
  } else if (value == 2) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  } else if (value == 3) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
  }
  //对获取到的时间进行格式化
  form.time = [formatDate(start), formatDate(end)]
  // console.log('form的time', formData.time);
}


const dialogVisible = ref(false)


//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}

//日期右边的几个快速选择
const daysChoose = (index) => {

}

const type = ref('add')

//新建用户
const addUser = () => {
  type.value = 'add'
  dialogVisible.value = true

}

//查看
const lookItem = () => {
  type.value = 'look'
  dialogVisible.value = true

}
//编辑
const editItem = (row) => {
  type.value = 'edit'
  dialogVisible.value = true

}
//删除
const delItem = () => {
  ElMessageBox.confirm(
    '是否确认删除?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}
//批量删除
const delSome = () => {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
//完成新建/编辑/查看
const finish = (type) => {
  dialogVisible.value = false
  if (type = 'add') {
    ElMessage({
      message: '新建成功',
      type: 'success',
    })
  }
  if (type == 'edit') {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  }
}

onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
  // document.getElementsByClassName("el-pagination__total is-first")[0].childNodes[0].nodeValue = "共";
  
})

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