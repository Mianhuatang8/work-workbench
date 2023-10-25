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
          <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
            注册日期
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
          <el-button type="primary" style="margin-right: 8px;" plain>批量操作</el-button>
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
        <el-table-column prop="inspirationCount" align="center" header-align="center" label="灵感额总值">
        </el-table-column>
        <el-table-column prop="vipRank" align="center" header-align="center" label="会员等级">

        </el-table-column>
        <el-table-column prop="userRank" align="center" header-align="center" label="用户等级">

        </el-table-column>


        <el-table-column prop="lastOnlineTime" align="center" header-align="center" label="最近上线时间">
        </el-table-column>
        <el-table-column prop="createTime" align="center" header-align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <div style="color: #009fff; " @click="lookDetail(scope.row)">查看</div>
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

      <div style="margin-top: 40px;display: flex;justify-content: flex-end;">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
          :small="small" :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper" :total="400"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

    </div>
  </div>


  <!-- 查看对话框 -->
  <el-dialog v-model="lookDialogVisible" :title="type == 'look' ? '查看' : type=='edit'?'编辑':'新增'" width="40%" :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="180px">
        <el-form-item label="用户头像">
          <img :src="form.avatar" style="width: 100px;height: 50px;">
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="form.name" style="width: 200px;"  :disabled="type=='look'"/>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-select v-model="form.userRank" class="m-2" placeholder="请选择" style="width: 200px;" :disabled="type=='look'">
            <el-option v-for="(item, index) in userRankSort" :key="item" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="form.vipRank" class="m-2" placeholder="请选择" style="width: 200px;" :disabled="type=='look'">
            <el-option v-for="(item, index) in vipRankSort" :key="item" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员开始时间-结束时间" style="display: flex;" >
          <el-date-picker v-model="form.startTime" type="date" style="width: 130px;" :disabled="type=='look'"/>
          <div style="margin:0 5px">-</div>
          <el-date-picker v-model="form.endTime" type="date" style="width: 130px;" :disabled="type=='look'"/>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.vxNumber" style="width: 200px;" :disabled="type=='look'" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="form.phone" style="width: 200px;"  :disabled="type=='look'"/>
        </el-form-item>

        <el-form-item v-if="type == 'look'" label="用户活动日志" >
          <div class="record">
            <div style="margin-bottom: 8px;">2023年10月20日 12:03:33 生图 灵感值-2</div>
            <div style="margin-bottom: 8px;">2023年10月20日 12:03:33 生图 灵感值-2</div>
            <div style="margin-bottom: 8px;">2023年10月20日 12:03:33 生图 灵感值-2</div>
            <div style="margin-bottom: 8px;">2023年10月20日 12:03:33 生图 灵感值-2</div>
            <div style="margin-bottom: 8px;">2023年10月20日 12:03:33 生图 灵感值-2</div>
          </div>

        </el-form-item>


        <el-form-item label="用户私有图库" style="height: 300px;overflow-y: scroll;">
          <div style="width: 48%;display: flex;flex-wrap: wrap;" v-for="item in form.privacyImages" :key="item">
            <img :src="item" style="width: 200px;height: 200px;margin-bottom: 15px;">
          </div>
        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="type == 'edit' || type=='add'" @click="lookDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="lookDialogVisible = false">完成</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const sortRole = ref(['不限', '普通', '月度', '年度'])
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
    inspirationCount: '后台用户',
    vipRank: '普通会员',
    userRank: 'V.1 创作初学者',
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },
  {
    id: '2',
    name: '王小虎',
    inspirationCount: '管理员',
    vipRank: '月度会员',
    userRank: 'V.3 创作工程师',
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },
  {
    id: '3',
    name: '王小虎',
    inspirationCount: '运营',
    vipRank: '年度会员',
    userRank: 'V.7 创作大师',
    lastOnlineTime: '2020/09/20 16:12:23',
    createTime: '2020/09/20 16:12:23'
  },])
//改变被选中的角色分类样式index
const changeIndex = (index) => {
  selectRoleSortIndex.value = index
}

const userRankSort = ref(['LV1创作初学者', 'LV2创作爱好者', 'LV3创作工程师', 'LV4创作研究者', 'LV5创作探险家', 'LV6创作修行者', 'LV7创作大师'])
const vipRankSort = ref(['免费会员', '月度会员', '年度会员'])
const form = ref({
  avatar: 'data:image/jpeg;base64,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',
  name: 'SXJ21325',
  userRank: 2,
  vipRank: 0,
  vxNumber: '111343254564',
  phone: '21325423',
  privacyImages: [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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'
  ],
  startTime: new Date(2023, 10, 20),
  endTime: new Date(2024, 10, 20),

})

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
</script>
  
<style lang="scss" scoped>
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
</style>