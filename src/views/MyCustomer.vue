<template>
  <div class="mycustomer-top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的客户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button>新建客户</el-button>
  </div>

  <div class="mycustomer-center">
    <div class="row-container">
      <el-row class="first">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="oneForm">
          <el-form-item label="名称">
            <el-input v-model="searchForm.name" placeholder="请输入" :suffix-icon="Search" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.state" placeholder="请选择" clearable>
              <el-option label="Zone one" value="1" />
              <el-option label="Zone two" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select v-model="searchForm.origin" placeholder="请选择" clearable>
              <el-option label="Zone one" value="1" />
              <el-option label="Zone two" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
        <p @click="changeIsExtendSearch">{{ isExtendSearch ? '收起' : '高级搜索' }}</p>
      </el-row>

      <el-row>
        <el-form v-if="isExtendSearch" :model="searchForm" class="demo-ruleForm">
          <el-form-item label="竞选编号">
            <el-select v-model="searchForm.campaignId" placeholder="请选择">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item label="地址">
            <el-select clearable @change="changeProvice" placeholder="请选择" style="width: 180px"
              v-model="searchForm.address.province">
              <el-option label="Zone one" value="shanghai" />
            </el-select>

            <el-select clearable @change="changeCity" v-model="searchForm.address.city" placeholder="请选择"
              style="margin: 0 12px; width: 180px">
              <el-option label="Zone one" value="shanghai" />
            </el-select>
            <el-select clearable placeholder="请选择 " style="width: 180px" v-model="searchForm.address.district">
              <el-option label="Zone one" value="shanghai" />
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间">
            <el-date-picker v-model="searchForm.date1" type="date" placeholder="开始" />
            <span style="margin:0 3px">-</span>
            <el-date-picker v-model="searchForm.date2" type="date" placeholder="结束" />
          </el-form-item>

        </el-form>
      </el-row>
    </div>




  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchForm = reactive({
  name: '',
  state: '',
  origin: '',
  campaignId: '',
  address: {
    province: '',
    city: '',
    district: ''
  },
  date1: null,
  date2: null,
})
// 是否展开高级搜索
const isExtendSearch = ref(false)


const changeIsExtendSearch = () => {
  isExtendSearch.value = !isExtendSearch.value
}





</script>

<style scoped lang="scss">
.mycustomer-top {
  display: flex;
  justify-content: space-between;
}

.mycustomer-center {
  width: 100%;
  height: auto;
  border-radius: 12px;
  background-color: white;
  margin-top: 30px;

  .first {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    color: orange;
    margin-right: 30px;
    font-size: 14px;
    cursor: pointer;
  }
}
.row-container{
  padding: 20px 0;
}

.el-form {

  display: flex;
  padding: 10px 30px;
}

// .el-form--inline 
.el-form-item {
  margin: 0 24px 0 0;
}
</style>