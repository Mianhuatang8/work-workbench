<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>用户管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">用户列表</span>
    </div>

    <div class="card-content">
      <div class="role-sort" style="display:flex;">
        <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
          会员等级
        </div>
        <div v-for="(item, index) in sortRole" :key="index"
          style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
          :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
          {{ item }}</div>
      </div>
      <div class="datePick">

        <div style="display: flex;align-items: center;width: 52%;">
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;"> 注册日期 </div>
          <el-date-picker v-model="time" type="date" placeholder="请选择日期" style="float:left" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" @change="changeDate" />

          <div class=" " v-for="(item, index) in daysArr" :key="index"
            style="cursor: pointer;text-align: center;margin-left: 10px;"
            :class="selectDateIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex2(index)">
            <div @click="setTimeByDays(index)" style="width: 60px;line-height: 32px;font-size: 14px;">
              {{ item }}
            </div>
          </div>
        </div>
        <div style="display: flex;margin-right: 60px;">
          <el-button type="primary" style="margin-right:10px;" :icon="Search" @click="getList()">查询</el-button>
          <el-button @click="reset()">重置</el-button>

        </div>
      </div>

    </div>

    <div style="background-color: white;padding: 30px;">
      <div
        style="display: flex;margin-bottom: 15px;justify-content: space-between;align-items: center;margin-left: 15px;">
        <el-button type="primary" style="margin-right: 8px;" @click="addUser()" disabled>+&nbsp;新建</el-button>
        <!-- <div style="display: flex;">
          <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
        </div> -->
      </div>
      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <!-- <el-table-column type="selection" width="60">
        </el-table-column> -->

        <el-table-column prop="UserName" align="center" header-align="center" label="用户名">
        </el-table-column>
        <el-table-column prop="Telepathy" align="center" header-align="center" label="灵感额总额">
        </el-table-column>
        <el-table-column prop="VIPLevelName" align="center" header-align="center" label="会员等级">

        </el-table-column>
        <el-table-column prop="UserInfoLevelName" align="center" header-align="center" label="用户等级">

        </el-table-column>
        <el-table-column prop="AllGrowthValue" align="center" header-align="center" label="成长值总额">
        </el-table-column>

        <el-table-column prop="RecentlyLaunchedDate" align="center" header-align="center" label="最近上线时间">
          <template #default="scope">
            {{ processTime(scope.row.RecentlyLaunchedDate) }}
          </template>

        </el-table-column>
        <el-table-column prop="RegisterDate" align="center" header-align="center" label="注册时间">
          <template #default="scope">
            {{ processTime(scope.row.RegisterDate) }}
          </template>

        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <div style="color: #009fff; " @click="lookDetail(scope.row)">查看</div>
              <div style="color: #009fff; " @click="editItem(scope.row)">编辑</div>
              <!-- <div style="color: red;" @click="delItem(scope.row)">删除</div> -->
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
        <div style="margin-right: 15px;">
          共<span>{{ pages.total }}</span>条
        </div>
        <el-pagination v-model:current-page="pages.currentPage" :page-size="pages.limit" 
          background layout=" prev, pager, next, jumper" :total="pages.total"
          @current-change="handleCurrentChange"></el-pagination>
      </div>

    </div>
  </div>


  <!-- 查看对话框 -->
  <el-dialog v-model="lookDialogVisible" :title="type == 'look' ? '查看' : type == 'edit' ? '编辑' : '新增'" width="30%"
    :before-close="handleClose">
    <div class="dialog-content">
      <el-form :model="form">
        <el-form-item label="用户头像">

          <el-upload class="avatar-uploader" action="#" :http-request="uploadFile" :show-file-list="false"
            :on-change="handleAvatarChange" :disabled="type == 'look'">
            <img v-if="form.avatarUrl" :src="tableData.avatarUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>

        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="form.name" :disabled="type == 'look'" style="margin-right: 20px;" />
        </el-form-item>

        <el-form-item label="用户名称">
          <el-input v-model="form.name" :disabled="type == 'look'" style="margin-right: 20px;" />
        </el-form-item>
        <el-form-item label="用户等级(自身等级)">
          <el-select v-model="form.userRank" class="m-2" placeholder="请选择" :disabled="type == 'look'">
            <el-option v-for="(item, index) in userRankSort" :key="item" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="form.vipRank" class="m-2" placeholder="请选择" :disabled="type == 'look'">
            <el-option v-for="(item, index) in vipRankSort" :key="item" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员开始时间-结束时间" style="display: flex;">
          <el-date-picker v-model="form.startTime" type="date" :disabled="type == 'look'" />
          <div style="margin:0 5px">-</div>
          <el-date-picker v-model="form.endTime" type="date" :disabled="type == 'look'" />
        </el-form-item>


        <el-form-item label="手机号">
          <el-input v-model="form.phone" :disabled="type == 'look'" style="margin-right: 20px;" />
        </el-form-item>

        <el-form-item v-if="type == 'look'" label="用户活动日志">
          <div class="record" style="height:150px;overflow-y:auto;background-color: #f5f7fa;width: 400px;">
            <div v-for="item in form.records" :key="item"
              style="display:flex;margin-top:15px;align-item:center;justify-content:space-between">
              <div style="display:flex" :style="{ 'margin-left': Number(item.spiritsValue) > 0 ? '3px' : '' }">
                <div style="font-size:14px;">{{ item.operation }}</div>
                <div style="margin:0 8px;color:#d7d7d7;">|</div>
                <div :style="{ 'color': Number(item.spiritsValue) > 0 ? '#2fd32f' : '' }" style="font-size:14px;">灵感值{{
                  item.spiritsValue }}</div>
              </div>
              <div><span style="font-size:12px;color:rgb(155 155 155);">{{ item.time }}</span></div>
            </div>
          </div>

        </el-form-item>

        <!-- <el-form-item label="用户私有图库">
          <el-upload v-model:file-list="form.privacyImages"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
            v-if="type != 'look'">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <div v-else style="display: flex;flex-wrap: wrap;">
            <div v-for="file in form.privacyImages" :key="file.url" style="margin-right: 8px;margin-top: 8px;">
              <img :src="file.url" style="width: 146px; height: 146px;border-radius: 7px;">
            </div>
          </div>

        </el-form-item> -->

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="type == 'edit' || type == 'add'" @click="lookDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish()">完成</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import $ from 'jquery'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Search, Share, Upload, Plus } from '@element-plus/icons-vue'
import { searchSomeUser, delUserInfo, userSelfChange, editUserInfo } from '../../api/user.js'

//分页条数据
const pages = ref({
  total: 1000,
  currentPage: 1,
  limit: 10
})


const sortRole = ref(['不限', '普通', '月度', '年度'])
const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])

const time = ref([])

// const tableData = reactive([
//   {
//     id: '1',
//     name: '王小虎',
//     inspirationCount: '后台用户',
//     vipRank: '普通会员',
//     userRank: 'V.1 创作初学者',
//     lastOnlineTime: '2020/09/20 16:12:23',
//     createTime: '2020/09/20 16:12:23',
//     avatarUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//   },
//   {
//     id: '2',
//     name: '王小虎',
//     inspirationCount: '管理员',
//     vipRank: '月度会员',
//     userRank: 'V.3 创作工程师',
//     lastOnlineTime: '2020/09/20 16:12:23',
//     createTime: '2020/09/20 16:12:23',
//     avatarUrl: ''
//   },
//   {
//     id: '3',
//     name: '王小虎',
//     inspirationCount: '运营',
//     vipRank: '年度会员',
//     userRank: 'V.7 创作大师',
//     lastOnlineTime: '2020/09/20 16:12:23',
//     createTime: '2020/09/20 16:12:23',
//     avatarUrl: ''
//   },])


const tableData = ref([])

const form = reactive({
  avatarUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  name: 'SXJ21325',
  userRank: 2,
  vipRank: 0,
  vxNumber: '111343254564',
  phone: '21325423',
  privacyImages: [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
  ],
  startTime: new Date(2023, 10, 20),
  endTime: new Date(2024, 10, 20),
  records: [
    {
      operation: '生图',
      spiritsValue: '-2',
      time: '2023年10月23日 10：10：11'
    },
    {
      operation: '生图',
      spiritsValue: '+2',
      time: '2023年10月23日 10：10：11'
    },
    {
      operation: '生图',
      spiritsValue: '-2',
      time: '2023年10月23日 10：10：11'
    },
    {
      operation: '生图',
      spiritsValue: '2',
      time: '2023年10月23日 10：10：11'
    },
    {
      operation: '生图',
      spiritsValue: '-2',
      time: '2023年10月23日 10：10：11'
    },

  ],
  time: null

})


const searchData = reactive({
  RegisterTime: [],//注册时间
  UserCode: "",//用户code  f67e490f-070a-c46c-c2be-3a0e7783da82
  VIPLevelCode: ""//VIPcode
})


//获取用户信息
const getList = async () => {
  console.log('发起请求传递的参数', searchData);
  const res = await searchSomeUser(searchData)
  console.log('获取用户信息列表', res);
  tableData.value = res.data.Result
}
getList()



const userRankSort = ref(['LV1创作初学者', 'LV2创作爱好者', 'LV3创作工程师', 'LV4创作研究者', 'LV5创作探险家', 'LV6创作修行者', 'LV7创作大师'])
const vipRankSort = ref(['免费会员', '月度会员', '年度会员'])
const selectRoleSortIndex = ref(0)
const selectDateIndex = ref(null)
//改变被选中的会员等级样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
  if (index == 1) {
    searchData.VIPLevelCode = 'VIP001'
  } else if (index == 2) {
    searchData.VIPLevelCode = 'VIP002'
  } else if (index == 3) {
    searchData.VIPLevelCode = 'VIP003'
  } else {
    searchData.VIPLevelCode = ''
  }
  // VIPLevelCode
}
const changeIndex2 = (index) => {
  selectDateIndex.value = index
}


//点击分页条
const handleCurrentChange = (currentPage) => {
  // searchData.PageIndex = currentPage
  //修改当前页数后重新发起数据请求
  getList()
}

//对接口请求的时间进行加工
const processTime = (value) => {
  let newValue = value.split('T')
  let processValue = newValue[0].split('-').join('/')
  let newValue2 = newValue[1].split(':')
  return processValue + " " + newValue2[0] + ':' + newValue2[1];
}

//日期选择器时间发生变化
const changeDate = (value) => {
  // console.log('日期选择器发生变化', value);
  selectDateIndex.value = null
  // searchData.RegisterTime = [time.value]
  const newDate = value.split('-')
  newDate[2] = (Number(newDate[2]) + 1).toString()
  searchData.RegisterTime = [time.value, newDate.join('-')]
}

const reset = () => {
  selectDateIndex.value = null
  selectRoleSortIndex.value = 0
  pages.currentPage = 1
  time.value = []
  searchData.RegisterTime = []
  searchData.VIPLevelCode = ''
  searchData.UserCode = ''
  //重新发起请求
  getList()

}


const formatDate = (time) => {
  const y = time.getFullYear();
  const yy = y < 10 ? '0' + y : y
  const m = time.getMonth() + 1;
  const mm = m < 10 ? '0' + m : m
  const d = time.getDate();
  const dd = d < 10 ? '0' + d : d
  return `${yy}-${mm}-${dd}`;
}

// const setTimeByDays = (value) => {
//   console.log('点击日期', value);
//   const end = new Date()
//   const start = new Date()
//   time.value = formatDate(start)
//   if (value == 1) {
//     // const date = new Date()
//     start.setTime(start.getTime() - 3600 * 1000 * 24)
//     end.setTime(end.getTime() - 3600 * 1000 * 24)
//     time.value = formatDate(end)
//   } else if (value == 2) {
//     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
//     time.value = []
//   } else if (value == 3) {
//     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
//     time.value = []
//   }
//   //对获取到的时间进行格式化
//   searchData.RegisterTime = [formatDate(start), formatDate(end)]
// }

const setTimeByDays = (value) => {
  console.log('点击日期', value);
  const end = new Date()
  const start = new Date()
  time.value = formatDate(start)
  if (value == 1) {

    start.setTime(start.getTime() - 3600 * 1000 * 24)
    end.setTime(end.getTime() - 3600 * 1000 * 24)
    time.value = formatDate(end)

  } else if (value == 2) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    time.value = []
  } else if (value == 3) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    time.value = []
  }

  const newDate = formatDate(end).split('-')
  newDate[2] = (Number(newDate[2]) + 1).toString()
  //日期往后多取一个时间
  // console.log('点击按钮实现的时间', formatDate(start), formatDate(end));
  searchData.RegisterTime = [formatDate(start), newDate.join('-')]
  // console.log("加工后的时间", searchData.DateTimes);
}



//上传图片
const uploadFile = (file) => {
  let json;
  form.imgSrc = null;
  let formData = new FormData();
  formData.append("fil1", file.file);
  $.ajax({
    url: "https://3dapi.shixianjia.com/api/file/upload",
    type: "POST",
    contentType: false,
    processData: false,
    async: false,
    headers: {
      token:
        "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
    },
    data: formData,
    success: function (data) {
      console.log(data.Data, 8888);
      let url = JSON.parse(data.Data);
      json = url;
      // addForm.cover = url;
    },
  });
  form.imgSrc = json[0];
  console.log('json[0]', json[0]);
  console.log(form.imgSrc);
  console.log('点击上传图片', form.imgSrc);
}

const lookDialogVisible = ref(false)
const type = ref('look')
//新建用户
const addUser = () => {
  type.value = 'add'
  lookDialogVisible.value = true

}
//查看
const lookDetail = (row) => {
  type.value = 'look'
  lookDialogVisible.value = true
}
//编辑
const editItem = (row) => {
  type.value = 'edit'
  lookDialogVisible.value = true

}

//完成
const finish = () => {
  lookDialogVisible.value = false
  if (type.value == 'add') {
    ElMessage({
      message: '新建成功',
      type: 'success',
    })
  }
  if (type.value == 'edit') {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  }
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

onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
})

</script>
  
<style lang="less" scoped>
.selectedRoleStyle {
  color: white;
  display: flex;
  justify-content: center;
  background-color: #06a6ff;
  width: 60px;
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

.record {
  margin-top: 10px;
  height: 130px;
  border: 1px solid #ebebeb;
  overflow-y: scroll;
  padding: 10px;
  width: 335px;

  .el-form-item__content {
    display: block;
  }
}

.dialog-content {
  height: 60vh;
  overflow: auto;
}

.avatar-uploader .avatar {
  width: 130px;
  height: 130px;
  display: block;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  text-align: center;
}

:deep(.el-form-item) {
  flex-direction: column;
}

:deep(.el-form-item__label) {
  justify-content: flex-start;
}


:deep(.el-form-item) {
  margin-left: 20px;
}
</style>