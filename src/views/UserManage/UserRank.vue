<template>
  <div class="Container" style="padding:22px">
    <div style="margin-bottom: 30px; font-size: 17px;">
      <span>用户管理</span>
      <span style="margin:0 5px">/</span>
      <span style="margin:0 5px;font-weight: bold;">用户等级</span>
    </div>

    <div class="card-content">
      <!-- <div class="role-sort" style="display:flex;">
        <div style="margin-right: 25px;margin-left: 15px;display: flex;align-items: center;">
          角色
        </div>
        <div v-for="(item, index) in sortRole" :key="index"
          style="margin-right: 20px;font-size:14px;display: flex;align-items: center;cursor: pointer;"
          :class="selectRoleSortIndex == index ? 'selectedRoleStyle' : ''" @click="changeIndex(index)">
          {{ item }}</div>
      </div> -->
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
        <el-button type="primary" style="margin-right: 8px;" @click="addRole()">+&nbsp;新建</el-button>
        <div style="display: flex;">
          <el-button type="primary">批量操作</el-button>
          <el-button type="danger" plain>删除</el-button>
        </div>
      </div>

      <el-table ref="multipleTableDevice" :data="tableData" @select="selectTab" style="width: 100%;margin-left: 15px;"
        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }">

        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="id" align="center" header-align="center" label="角色ID">
        </el-table-column>
        <el-table-column prop="role" align="center" header-align="center" label="角色类型">
          <template #default="scope">
            <div style="color: #009fff;">
              {{ scope.row.role }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="roleCode" align="center" header-align="center" label="角色编号">
        </el-table-column>

        <el-table-column prop="updateTime" align="center" header-align="center" label="更新时间">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: space-around; cursor: pointer;">
              <el-button type="primary" @click="lookDetail()" link>详情</el-button>
              <el-button type="primary" @click="editItem(scope.row)" link>编辑</el-button>
              <el-button type="primary" @click="startItem()" link>权限</el-button>
              <el-button type="danger" @click="stop(scope.row)" link>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'

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

const tableData = ref([
  {
    id: '1',
    role: '超级管理员',
    roleCode: 'admin',
    updateTime: '2020/09/20 16:12:23'
  },
  {
    id: '2',
    role: '高级管理员',
    roleCode: 'admin',
    updateTime: '2020/09/20 16:12:23'
  },
  {
    id: '3',
    role: '普通管理员',
    roleCode: 'admin',
    updateTime: '2020/09/20 16:12:23'
  },])

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
</style>