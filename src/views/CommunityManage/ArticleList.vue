<template>
  <div class="Container" style="padding:17px 44px">

    <div>
      <div style="margin-bottom: 30px;font-size: 17px;">
        <span>社区管理</span>
        <span style="margin:0 5px">/</span>
        <span style="font-weight: bold;">文章</span>
      </div>

      <div class="articleSearchBox">
        <el-descriptions class="margin-top" :colon="false" :column="4">
          <el-descriptions-item label="文章编号">
            <el-input placeholder="请输入内容" size="small" style="width:270px" v-model="formData.UniqueCode"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="文章名称">
            <el-input placeholder="请输入内容" size="small" style="width:270px" v-model="formData.Title"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="角色">
            <el-select placeholder="请选择" style="width:270px" size="small" v-model="formData.Role">
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-button type="primary" icon="search" style="margin-right:12px" size="small"
              @click="getList()">搜索</el-button>
            <el-button size="small" icon="refresh" @click="reset()">重置</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="合辑分类">
            <el-select placeholder="请选择" size="small" style="width:270px" v-model="formData.CollectId">
              <el-option v-for="item in collectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            <el-date-picker v-model="time" @change="changeTime" value-format="yyyy-MM-dd" size="small" style="width:270px"
              type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-select placeholder="请选择" size="small" style="width:270px" v-model="formData.QType">
              <el-option label="已发布" :value="1"></el-option>
              <el-option label="草稿箱" :value="2"></el-option>
              <el-option label="回收站" :value="3"></el-option>
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="articleContentBox" style="margin-top:20px">
        <div class="articleContentBox_head">
          <div>

            <el-button type="primary" size="small" icon="plus" @click="addArticle">新建</el-button>
          </div>
          <div>
            <el-button type="primary" size="small" plain @click="openMoveDl()">本页全选</el-button>
            <el-button type="danger" size="small" plain @click="delInfo()">删除</el-button>
          </div>
        </div>


        <el-table height="540px" ref="multipleTableDevice" :data="tableData"
          :header-cell-style="{ background: '#F2F3F8' }" :row-style="{ height: 40 + 'px' }"
          @selection-change="handleSelectionChange" :cell-style="iCellStyle">
          <el-table-column type="selection" width="60">
          </el-table-column>

          <el-table-column prop="hotListOrder" align="center" header-align="center" label="热榜顺序">
            <template v-slot="scope">
              <div>{{ getSort(scope.row, scope) }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="uniqueCode" align="center" header-align="center" label="编号">
          </el-table-column>
          <el-table-column prop="userRole" align="center" header-align="center" label="角色">
          </el-table-column>
          <el-table-column prop="id" align="center" header-align="center" label="用户ID">
          </el-table-column>
          <el-table-column prop="userInfo.userName" align="center" header-align="center" label="用户名">
          </el-table-column>
          <el-table-column prop="title" align="center" header-align="center" show-overflow-tooltip label="文章名称">
          </el-table-column>
          <el-table-column prop="collect.collectName" align="center" header-align="center" label="合辑名称">
          </el-table-column>
          <el-table-column prop="scanCount" align="center" header-align="center" label="浏览量">
          </el-table-column>
          <el-table-column prop="likeCount" align="center" header-align="center" label="点赞量">
          </el-table-column>
          <el-table-column prop="cType" align="center" header-align="center" label="文章状态">
            <template v-slot="scope">
              <div style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
                <div :style="{ 'background-color': getStateColor(scope.row) }" class="stateIcon"></div>
                <div>{{ getStateFont(scope.row) }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="center" header-align="center" width="180" label="创建时间">
          </el-table-column>


          <el-table-column prop="caozuo" align="center" header-align="center" width="200" label="操作">
            <template v-slot="scope">
              <p class="openPicBtn">
                <el-button type="text" @click="LookArticleListInfo(scope.row.id)">查看</el-button>
                <el-button type="text" @click="editArticle(scope.row.id)">编辑</el-button>
                <el-button type="text" @click="delItem(scope.row.id)">删除</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页条 -->
        <div style="display: flex;flex-direction: row-reverse;">
          <el-pagination v-if="tableData.length > 0" @current-change="getList" :page-size="20" background
            layout="total,prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>


    <!-- <el-dialog title="移动到" :visible="moveDialog" width="480px">
      <div class="articleMoveBox">
        <el-scrollbar style="height:400px" height="400px">
          <div class="collectItem" v-for="item in collectionList" :key="item" @click="moveThisCollection(item.id)">
            <el-image style="width: 40px; height: 40px;margin:0 16px 0 24px" :src="item.cover" fit="cover"></el-image>
            <div>{{ item.name }}</div>
            <div class="collectItemCount">{{ item.likeCount }}篇文章</div>
          </div>
        </el-scrollbar>
      </div>

      <div v-slot:footer>
        <el-button size="small" type="primary" plain style="position: absolute;left:24px">新建合辑</el-button>
        <el-button size="small" @click="moveDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="innerVisible = true">确认</el-button>
      </div>

    </el-dialog> -->

    <!-- <el-dialog title="推荐指数" :visible.sync="recommendDialog" width="30%">
      <div style="margin-bottom: 15px;">
        文章名称：
        <el-input disabled style="width:300px" placeholder="文章名称" v-model="recommendForm.title">
        </el-input>
      </div>
      <div>
        推荐指数：
        <el-input-number v-model="recommendForm.recommend" :min="0" :max="100" label="指数越高排名越高"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRecommend">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>
  
<script setup>
import { ref } from "vue";
import{useRouter} from 'vue-router'

const router=useRouter()

const recommendDialog = ref(false)
const recommendForm = ref({
  recommend: null,
  title: "",
  id: "",
})
const moveDialog = ref(false)
const options = ref([])
const value = ref('')
const input = ref('')
const params = ref({
  startTime: "",
  endTime: "",
  date: "",

})
const tableData = ref([])
const currentPage = ref(1)
const userLength = ref(0)
const showArr = ref([])
const picArr = ref([])
const TotalPage = ref(0)
const formData = ref({
  UniqueCode: "",
  Title: "",
  Role: "",
  CollectId: "",
  CreateBeginDt: "",
  CreateEndDt: "",
  // createTime: "",
  QType: null,
  PageIndex: 1,
  PageSize: 20,

})
const time = ref(null)
const delList = ref([])
const collectionList = ([])

//文章状态的文本及其文本颜色
const getStateFont = (row) => {
  if (row.cType == 1) {
    return "已发布";
  } else if (row.cType == 2) {
    return "草稿";
  } else if (row.cType == 3) {
    return "回收站";
  } else {
    return "已下架";
  }
}

const getStateColor = (row) => {
  if (row.cType == 1) {
    return "#52C41A";
  } else if (row.cType == 2) {
    return "#FFAD28";
  } else {
    return "red";
  }
}

//热榜排序
const getSort = (row, scope) => {
  if (this.formData.PageIndex == 1) {
    return scope.$index + 1;
  } else if (this.formData.PageIndex > 2) {
    let index = this.formData.PageIndex * 10;
    return index + scope.$index + 1 + 20;
  } else {
    let index = this.formData.PageIndex * 10;
    return index + scope.$index + 1;
  }
}


//新建
const addArticle = () => {
  router.push({
    path: "/articleListInfo",
  });

}


//查看
const LookArticleListInfo = (id) => {

}
//编辑
const editArticle = (id) => {

}
//删除
const delItem = (id) => {

}


</script>
  
<style scoped lang="scss">
.articleContentBox_head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.articleContentBox{
  margin-top: 30px;
    background-color: white;
    // border-radius: 15px;
    padding: 30px;
}
.articleSearchBox{
  background-color: white;
    padding: 20px;
    // border-radius: 15px;
}

</style>