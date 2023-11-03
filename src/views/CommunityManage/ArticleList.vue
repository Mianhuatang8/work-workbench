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
            <el-input placeholder="请输入内容" style="width:270px" v-model="formData.UniqueCode"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="文章名称">
            <el-input placeholder="请输入内容"  style="width:270px" v-model="formData.Title"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="角色">
            <el-select placeholder="请选择" style="width:270px"  v-model="formData.Role">
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-button type="primary" icon="search" style="margin-right:12px" 
              @click="getList()">搜索</el-button>
            <el-button  icon="refresh" @click="reset()">重置</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="合辑分类">
            <el-select placeholder="请选择"  style="width:270px" v-model="formData.CollectId">
              <el-option v-for="item in collectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            <el-date-picker v-model="formData.createTime" @change="changeTime" value-format="yyyy-MM-dd"  style="width:270px"
              type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-select placeholder="请选择" style="width:270px" v-model="formData.QType">
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

            <el-button type="primary" icon="plus" @click="addArticle">新建</el-button>
          </div>
          <div>
            <el-button type="primary"  plain @click="openMoveDl()">批量操作</el-button>
            <el-button type="danger"  plain @click="delSome()">删除</el-button>
          </div>
        </div>

        <!-- height="540px" -->
        <el-table  ref="multipleTableDevice" :data="tableData"
          :header-cell-style="{ background: '#F2F3F8' }" :row-style="{ height: 40 + 'px' }"
          @selection-change="handleSelectionChange" :cell-style="iCellStyle">
          <el-table-column type="selection" width="60">
          </el-table-column>

          <el-table-column prop="hotListOrder" align="center" header-align="center" label="热榜顺序">
            <!-- <template v-slot="scope">
              <div>{{ getSort(scope.row, scope) }}</div>
            </template> -->
          </el-table-column>

          <el-table-column prop="uniqueCode" align="center" header-align="center" label="文章编号">
          </el-table-column>
          <el-table-column prop="userRole" align="center" header-align="center" label="角色">
          </el-table-column>
          <el-table-column prop="id" align="center" header-align="center" label="用户ID">
          </el-table-column>
          <el-table-column prop="userName" align="center" header-align="center" label="用户名">
          </el-table-column>
          <el-table-column prop="title" align="center" header-align="center" show-overflow-tooltip label="文章名称">
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
                <el-dropdown @command="handleCommand"  style="vertical-align: middle; margin-left: 7px;cursor: pointer;">
                  <span class="el-dropdown-link" style="color: #40aaff;">
                    更多
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="publish" v-if="scope.row.cType == 2" @click="publish(scope.row.id)">发布</el-dropdown-item>
                      <el-dropdown-item command="up" v-if="scope.row.cType != 2" @click="upHot(scope.row)">上移</el-dropdown-item>
                      <el-dropdown-item command="down" v-if="scope.row.cType != 2" @click="downHot(scope.row)">下移</el-dropdown-item>
                      <el-dropdown-item command="del" style="color: red;"
                        @click="delItem(scope.row.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </p>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页条 -->
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
  </div>
</template>
  
<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()

//分页条数据
const pages = ref({
   total: 1000,
   currentPage: 1,
   limit: 10

})


const tableData = ref([
  {
    hotListOrder: 1,
    uniqueCode: '121',//文章编号
    userRole: '后台用户',//角色
    id: '123',//用户id
    userName: 'User',
    title: '好设计是沉思的',
    scanCount: '11131',
    likeCount: '110',
    cType: 1,// 1-已发布 2-草稿 3-回收 4-下架
    createTime: '2023/09/10 12:54',
  },
  {
    hotListOrder: 2,
    uniqueCode: '121',//文章编号
    userRole: '后台用户',//角色
    id: '123',//用户id
    userName: 'User',
    title: '好设计是沉思的',
    scanCount: '11131',
    likeCount: '110',
    cType: 2,// 1-已发布 2-草稿 3-回收 4-下架
    createTime: '2023/09/10 12:54',
  },
])

const formData = ref({
  UniqueCode: "",
  Title: "",
  Role: "",
  CollectId: "",
  CreateBeginDt: "",
  CreateEndDt: "",
  createTime:null,
  QType: null,
  PageIndex: 1,
  PageSize: 20,

})

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
    query:{
      type:'add'
    }
  });
}
//查看
const LookArticleListInfo = (id) => {
  router.push({
    path: "/articleListInfo",
    query:{
      type:'look'
    }
  });

}
//编辑
const editArticle = (id) => {
  router.push({
    path: "/articleListInfo",
    query:{
      type:'edit'
    }
  });

}
//删除
const delItem = (id) => {
  ElMessageBox.confirm(
    '是否确认删除该文章?',
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
  ElMessageBox.confirm(
    '是否确认删除选中的所有文章?',
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

//发布文章
const publish=(id)=>{

}
//上移
const upHot=(row)=>{

}

//下移
const downHot=(row)=>{

}

onMounted(() => {
   document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
})



</script>
  
<style scoped lang="scss">
.articleContentBox_head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.articleContentBox {
  margin-top: 30px;
  background-color: white;
  // border-radius: 15px;
  padding: 30px;
}

.articleSearchBox {
  background-color: white;
  padding: 20px;
  // border-radius: 15px;
}

.stateIcon {
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
</style>