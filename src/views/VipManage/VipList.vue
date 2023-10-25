<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>会员管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">会员列表</span>
    </div>

    <div class="card-content">
      <div class="role-sort" style="display:flex;">
        <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
          角色
        </div>
        <div v-for="(item, index) in sortRole" :key="index"
          style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
          :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
          {{ item }}</div>
      </div>
      <div class="datePick">

        <div style="display: flex;align-items: center;width: 50%;">
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
        <el-button type="primary" style="margin-right: 8px;" @click="addVipRank()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
          <el-button type="danger" plain>删除</el-button>
        </div>
      </div>
      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>

        <el-table-column prop="id" align="center" header-align="center" label="等级ID">
        </el-table-column>
        <el-table-column prop="vipRank" align="center" header-align="center" label="等级类型">
          <template #default="scope">
            <span style="color: rgb(0, 159, 255);">{{ scope.row.vipRank }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="vipCode" align="center" header-align="center" label="等级编码">
        </el-table-column>
        <el-table-column prop="upLoadUser" align="center" header-align="center" label="上传用户">

        </el-table-column>
        <el-table-column prop="updateTime" align="center" header-align="center" label="更新时间">
        </el-table-column>

        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;align-items: center;">
              <div style="color: #009fff; " @click="lookDetail(scope.row)">详情</div>
              <el-switch v-model="scope.row.changePermission" @change="updatePermission" />
              <div style="color: #009fff; " @click="setFunItem(scope.row)">功能配置</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
          :small="small" :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper" :total="400"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

    </div>
  </div>


  <el-dialog v-model="addDialogVisible" :title="type == 'add' ? '新增会员等级' : '编辑功能配置'" width="35%"
    :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="等级名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="等级编码">
          <el-input v-model="form.rankCode" />
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
                每日成长值
                <el-input v-model="form.getInspiration" placeholder="请输入数字(例如+20)" style="margin-left: 10px;"
                  size="small" />
              </template>
            </el-checkbox>
            <el-checkbox label="4">高级设置</el-checkbox>
            <el-checkbox label="5">功能无水印下载</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 查看详情对话框 -->
  <el-dialog v-model="detailDialogVisible" title="查看会员详情" width="35%" :before-close="handleClose">
    <div class="orange-card">
      <div class="title">年度会员</div>
      <div class="content">+180灵感值/天</div>
      <div class="content">+20成长值/天</div>
    </div>
    <div class="orange-card" style="margin-top: 20px;height: 130px;">
      <div class="title">年度会员功能权益</div>
      <div class="content" v-for="item in yearVipFunc" :key="item">
        {{ item }}
      </div>
    </div>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false" type="primary">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>


  
<script setup>
import { ref } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const sortRole = ref(['不限', '普通会员', '月度会员', '年度会员'])
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

const yearVipFunc = ref(['专属标识', '高级设置', '功能无水印下载', '更多会员福利等待解锁'])
// const data = ref([])
// const onionActiveId = ref(0)
// const dataActivateId = ref(0)

const tableData = ref([
  {
    id: '1',
    vipRank: '普通会员',
    vipCode: 'Mskiwfk_vip',
    upLoadUser: '超级管理员',
    updateTime: '2020/09/20 16:12:23',
    changePermission: false,
  },
  {
    id: '2',
    vipRank: '普通会员',
    vipCode: 'Mskiwfk_vip',
    upLoadUser: '超级管理员',
    updateTime: '2020/09/20 16:12:23',
    changePermission: true,
  },
  {
    id: '3',
    vipRank: '普通会员',
    vipCode: 'Mskiwfk_vip',
    upLoadUser: '超级管理员',
    updateTime: '2020/09/20 16:12:23',
    changePermission: false,
  },])
//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}


const addDialogVisible = ref(false)
const type = ref('add')
const form = ref({
  name: '',
  rankCode: '',
  // vipDay: null,
  inspiration: '+180',
  getInspiration: '+20',
  checkList: ['1', '2', '3'],
})
const detailDialogVisible = ref(false)



//新增会员等级
const addVipRank = () => {
  type.value = 'add'
  addDialogVisible.value = true

}

//详情
const lookDetail = () => {
  detailDialogVisible.value = true

}
//功能配置
const setFunItem = () => {
  type.value = 'set'
  addDialogVisible.value = true

}

//启用/停用权限
const updatePermission = (value) => {
  console.log('会员列表-启用/停用权限', value);
}




</script>
  
<style lang="scss" scoped>
.selectedRoleStyle {
  color: white;
  display: flex;
  justify-content: center;
  background-color: #06a6ff;
  width: 90px;
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


.orange-card {
  margin: auto;
  width: 60%;
  background-color: #fcc66c;
  height: 85px;
  border-radius: 15px;
  color: white;
  padding: 30px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .content {
    font-size: 13px;
    margin-top: 8px;
    color: #848484;
  }
}
</style>