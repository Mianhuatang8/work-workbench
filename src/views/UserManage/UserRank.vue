<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>用户管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">用户等级</span>
    </div>

    <div class="card-content">
      <div class="datePick">

        <div style="display: flex;align-items: center;width: 50%;">
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
            日期
          </div>
          <el-date-picker v-model="form.time" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            :picker-options="pickerOptions" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
            style="float:left">
          </el-date-picker>
          <div class=" " v-for="(item, index) in daysArr" :key="index"  style="cursor: pointer;">
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
        <el-button type="primary" style="margin-right: 8px;" @click="addUserRank()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary" plain>批量操作</el-button>
          <el-button type="danger" plain @click="delSome()">删除</el-button>
        </div>
      </div>

      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="id" align="center" header-align="center" label="等级ID">
        </el-table-column>
        <el-table-column prop="rankStyle" align="center" header-align="center" label="等级类型">
        </el-table-column>
        <el-table-column prop="rankCode" align="center" header-align="center" label="等级编码">
        </el-table-column>
        <el-table-column prop="upLoadTime" align="center" header-align="center" label="上传用户">
        </el-table-column>

        <el-table-column prop="updateTime" align="center" header-align="center" label="更新时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <el-button type="primary" link @click="gotToRankDetail(scope.row)">详情</el-button>
              <el-switch v-model="scope.row.changePermission" @change="updatePermission" />
              <el-button type="primary" link @click="setFunction(scope.row)">功能配置</el-button>

            </div>
          </template>
        </el-table-column>
      </el-table>


      <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
            <div style="margin-right: 15px;">
               共<span>{{ pages.total }}</span>条
            </div>
            <el-pagination v-model:current-page="pages.currentPage" :page-size="pages.limit" :small="small"
               :disabled="disabled" background layout=" prev, pager, next, jumper" :total="pages.total"
               @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
         </div>
    </div>
  </div>


  <!-- 新增用户等级 -->
  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增用户等级' : '编辑功能配置'" width="35%"
    :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="等级名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="等级编码">
          <el-input v-model="form.rankCode" />
        </el-form-item>


        <el-form-item label="获得灵感值配置" style="margin-top: 30px;" v-if="type == 'setFun'">
          <el-checkbox-group v-model="form.getInspiration" @change="handleCheckAllChange"
            style="display: flex; flex-direction: column;">
            <el-checkbox label="0">
              <template #default>
                主页签到
                <el-input v-model="form.homeSign" placeholder="请输入数字" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="1">
              <template #default>
                微信打卡
                <el-input v-model="form.vxCount" placeholder="请输入数字(例如+10)" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>


        <el-form-item label="消耗灵感值配置" style="margin:30px 0;" v-if="type == 'setFun'">
          <el-checkbox-group v-model="form.useInspiration" @change="handleCheckAllChange"
            style="display: flex; flex-direction: column;">
            <el-checkbox label="4">专属标识</el-checkbox>
            <el-checkbox label="0">
              <template #default>
                生成
                <el-input v-model="form.generate" placeholder="请输入数字" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="1">
              <template #default>
                下载超清
                <el-input v-model="form.downLoad" placeholder="请输入数字" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>


        <el-form-item label="创作权益配置">
          <el-checkbox-group v-model="form.checkList" @change="handleCheckAllChange"
            style="display: flex; flex-direction: column;">
            <el-checkbox label="1">专属标识</el-checkbox>
            <el-checkbox label="2">
              <template #default>
                每日灵感值
                <el-input v-model="form.inspiration" placeholder="请输入数字(例如+10)" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="3">
              <template #default>
                VIP天数
                <el-input v-model="form.vipDay" placeholder="请输入数字(例如+20)" style="margin-left: 10px;" size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="4">随机会员</el-checkbox>
            <el-checkbox label="5">购买优惠券包</el-checkbox>
            <el-checkbox label="6">灵感值包</el-checkbox>
            <el-checkbox label="7">创作资源包</el-checkbox>
            <el-checkbox label="8">参与设计竞选资格</el-checkbox>
          </el-checkbox-group>


        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish(type)">确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 查看用户等级详情 -->
  <el-dialog v-model="detailDialogVisible" title="用户等级详情" width="35%" :before-close="handleClose">
    <div class="green-card">
      <div class="title">{{ currentUserRankData.name }}</div>
      <div class="process" style="margin-bottom: 10px;">
        <el-progress :percentage="parseInt(currentUserRankData.growthValue / 500 * 100)" :stroke-width="10"
          color="rgb(255 255 255)" class="process-content" />
      </div>
      <div style="font-size: 12px;">成长值距离剩升下一级还有{{ 500 - currentUserRankData.growthValue }}成长值</div>
    </div>

    <div style="margin: 45px 15px 0 25px">
      <div style="font-size: 17px;font-weight: bold;margin-bottom: 15px;">创作权益</div>
      <div style="display: flex;align-items: center;margin-left: 25px;margin-top: 15px;"
        v-for="item in currentUserRankData.createPermission " :key="item">
        <el-icon style="margin-right: 20px;font-size: 16px;">
          <CircleCheckFilled />
        </el-icon>
        <div style="font-size: 14px;">{{ item }}</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref, watch ,onMounted,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})

const pickerOptions = ref({
  disabledDate(time) {
    // 设置选择今天及今天之后的日期
    return time.getTime() < Date.now() - 8.64e7;
  }

})

const daysArr = ref(['今日', '昨日', '最近7天', '最近30天'])

const tableData = ref([
  {
    id: '1',
    rankStyle: 'User',
    rankCode: '后台用户',
    upLoadTime: '2020/09/20 16:12:23',
    updateTime: '2020/09/20 16:12:23',
    changePermission: false
  },
  {
    id: '2',
    rankStyle: '玛卡阿卡',
    rankCode: '管理员',
    upLoadTime: '2020/09/20 16:12:23',
    updateTime: '2020/09/20 16:12:23',
    changePermission: true
  },
  {
    id: '3',
    rankStyle: 'Janeefiks',
    rankCode: '等级编码',
    upLoadTime: '2020/09/20 16:12:23',
    updateTime: '2020/09/20 16:12:23',
    changePermission: false
  },


])

const form = reactive({
  name: '',
  rankCode: '',
  vipDay: null,
  inspiration: null,
  checkList: [],//['1', '5', '8']
  getInspiration:[],// ['1',]
  useInspiration: [],//['1', '3']
  homeSign: '',
  vxCount: '',
  generate: '',
  downLoad: '',
  time:null

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


const type = ref('add')//默认类型为新建等级 setFun为功能配置
const addDialogVisible = ref(false)
//新增用户等级
const addUserRank = () => {
  type.value = 'add'
  addDialogVisible.value = true
}
//功能配置
const setFunction = (row) => {
  type.value = 'setFun'
  addDialogVisible.value = true

}

//查看用户等级详情
const detailDialogVisible = ref(false)
//当前用户的等级详情信息
const currentUserRankData = ref({
  name: 'LV1.创作初学者',
  growthValue: 40,
  createPermission: ['专属标识', '每日灵感值+5']
})
const gotToRankDetail = (row) => {
  detailDialogVisible.value = true
}

//启用/停用权限
const updatePermission = (val) => {
  console.log('修改权限', val);
}

//完成
const finish = (type) => {
  addDialogVisible.value = false
  if (type == 'add') {
    ElMessage({
      message: '新建成功',
      type: 'success',
    })
  }
  if (type == 'setFun') {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  }
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
  
<style lang="scss" scoped>
.card-content {
  background-color: white;
  padding: 17px;
  margin-bottom: 30px;

  .datePick {
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
  }
}

.green-card {
  margin: auto;
  width: 60%;
  background-color: #09cd8a;
  height: 85px;
  border-radius: 15px;
  color: white;
  padding: 30px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  :deep(.el-progress-bar__outer) {
    background-color: #ffffff7a;
  }

  :deep(.el-progress__text) {
    display: none;
  }
}
</style>