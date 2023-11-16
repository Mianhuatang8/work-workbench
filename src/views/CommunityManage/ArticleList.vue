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
            <el-input placeholder="请输入内容" style="width:270px" v-model="formData.Title"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="角色">
            <el-select placeholder="请选择" style="width:270px" v-model="formData.Role">
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-button type="primary" icon="search" style="margin-right:12px" @click="getList()">搜索</el-button>
            <el-button icon="refresh" @click="reset()">重置</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="合辑分类">
            <el-select placeholder="请选择" style="width:270px" v-model="formData.CollectId">
              <el-option v-for="item in collectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            <el-date-picker v-model="formData.createTime" @change="changeTime" value-format="yyyy-MM-dd"
              style="width:270px" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
            <el-button disabled plain @click="openMoveDl()">批量操作</el-button>
            <el-button plain @click="delSome()">移动到合辑</el-button>
            <el-button plain @click="delSome()">删除</el-button>
          </div>
        </div>

        <!-- height="540px" -->
        <el-table ref="multipleTableDevice" :data="tableData" :header-cell-style="{ background: '#F2F3F8' }"
          :row-style="{ height: 40 + 'px' }" @selection-change="changeSelection" :cell-style="iCellStyle">
          <el-table-column type="selection" width="60">
          </el-table-column>

          <el-table-column type="index" align="center" header-align="center" label="热榜排序" width="80" />

          <el-table-column prop="ID" align="center" header-align="center" label="文章编号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="Role" align="center" header-align="center" label="角色">
          </el-table-column>
          <el-table-column prop="UserId" align="center" header-align="center" label="用户ID">
          </el-table-column>
          <el-table-column prop="UserName" align="center" header-align="center" label="用户名">
          </el-table-column>
          <el-table-column prop="Title" align="center" header-align="center" show-overflow-tooltip label="文章名称">
          </el-table-column>
          <el-table-column prop="Title" align="center" header-align="center" show-overflow-tooltip label="合辑名称">
          </el-table-column>

          <el-table-column prop="VisitCount" align="center" header-align="center" label="浏览量">
          </el-table-column>
          <el-table-column prop="LikeCount" align="center" header-align="center" label="点赞量">
          </el-table-column>

          <el-table-column prop="IsDraft" align="center" header-align="center" label="文章状态">
            <template v-slot="scope">
              {{ scope.row.IsDraft ? '草稿' : '已发布' }}
              <!-- <div style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
                <div :style="{ 'background-color': getStateColor(scope.row) }" class="stateIcon"></div>
                <div>{{ getStateFont(scope.row) }}</div>
              </div> -->
            </template>
          </el-table-column>


          <el-table-column prop="CreatedOn" align="center" header-align="center" width="180" label="创建时间">
            <template #default="scope">
              {{ processTime(scope.row.CreatedOn) }}
            </template>

          </el-table-column>


          <el-table-column prop="caozuo" align="center" header-align="center" width="200" label="操作">
            <template v-slot="scope">
              <p class="openPicBtn">
                <el-button type="primary" link @click="LookArticleListInfo(scope.row)">查看</el-button>
                <el-button type="primary" link @click="editArticle(scope.row.id)">编辑</el-button>
                <el-button type="danger" link @click="delItem(scope.row)">删除</el-button>
                <el-button type="primary" link @click="publish(scope.row.id)" v-if="scope.row.IsDraft">发布</el-button>
                <!-- <el-dropdown @command="handleCommand" style="vertical-align: middle; margin-left: 7px;cursor: pointer;">
                  <span class="el-dropdown-link" style="color: #40aaff;">
                    更多
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="publish" v-if="scope.row.cType == 2"
                        @click="publish(scope.row.id)">发布</el-dropdown-item>
                      <el-dropdown-item command="up" v-if="scope.row.cType != 2"
                        @click="upHot(scope.row)">上移</el-dropdown-item>
                      <el-dropdown-item command="down" v-if="scope.row.cType != 2"
                        @click="downHot(scope.row)">下移</el-dropdown-item>
                      <el-dropdown-item command="del" style="color: red;"
                        @click="delItem(scope.row.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown> -->
              </p>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页条 -->
        <div style="margin-top: 40px;display: flex;justify-content: flex-end;align-items: center;">
          <div style="margin-right: 15px;">
            共<span>{{ pages.total }}</span>条
          </div>
          <el-pagination v-model:current-page="pages.currentPage" :page-size="pages.limit" background
            layout=" prev, pager, next, jumper" :total="pages.total"
            @current-change="handleCurrentChange"></el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticleList, delArticle } from '../../api/community'
import Sortable from 'sortablejs'



const router = useRouter()

//分页条数据
const pages = reactive({
  total: 0,
  currentPage: 1,
  limit: 15
})


// const tableData = ref([
//   {
//     hotListOrder: 1,
//     uniqueCode: '121',//文章编号
//     userRole: '后台用户',//角色
//     id: '123',//用户id
//     userName: 'User',
//     title: '好设计是沉思的',
//     scanCount: '11131',
//     likeCount: '110',
//     cType: 1,// 1-已发布 2-草稿 3-回收 4-下架
//     createTime: '2023/09/10 12:54',
//   },
//   {
//     hotListOrder: 2,
//     uniqueCode: '121',//文章编号
//     userRole: '后台用户',//角色
//     id: '123',//用户id
//     userName: 'User',
//     title: '好设计是沉思的',
//     scanCount: '11131',
//     likeCount: '110',
//     cType: 2,// 1-已发布 2-草稿 3-回收 4-下架
//     createTime: '2023/09/10 12:54',
//   },
// ])


const tableData = ref([])

const formData = ref({
  ID: "654d92c9b661dcb752b4e6dd",
  Title: "后端测试1",
  CoverPic: "url1",
  MainContent: "&lt;h3&gt;&lt;/h3&gt;",
  IsDraft: false,
  VisitCount: 0,
  LikeCount: 0,
  CreatedOn: "2023-11-10T02:17:45.554Z",
  UserId: "",
  Role: "后台用户",
  UserName: null,
  Avatar: null
})

const collectionList = ([])


//获取文章列表信息
const getList = async () => {
  let res = await getArticleList({ PageIndex: pages.currentPage, Pagesize: pages.limit })
  console.log('获取文章列表信息', res);
  tableData.value = res.data.Result.Datas
  pages.total = res.data.Result.totalCount
}
getList()


//点击分页条
const handleCurrentChange = (value) => {
  pages.currentPage = value
  //重新获取数据
  getList()
}


// //文章状态的文本及其文本颜色
// const getStateFont = (row) => {
//   if (row.cType == 1) {
//     return "已发布";
//   } else if (row.cType == 2) {
//     return "草稿";
//   } else if (row.cType == 3) {
//     return "回收站";
//   } else {
//     return "已下架";
//   }
// }

// const getStateColor = (row) => {
//   if (row.cType == 1) {
//     return "#52C41A";
//   } else if (row.cType == 2) {
//     return "#FFAD28";
//   } else {
//     return "red";
//   }
// }


//对接口请求的时间进行加工
const processTime = (value) => {
  let newValue = value.split('T')
  // let processValue = newValue[0].split('-').join('/')
  let newValue2 = newValue[1].split(':')
  return newValue[0] + " " + newValue2[0] + ':' + newValue2[1];
}



// //热榜排序
// const getSort = (row, scope) => {
//   if (this.formData.PageIndex == 1) {
//     return scope.$index + 1;
//   } else if (this.formData.PageIndex > 2) {
//     let index = this.formData.PageIndex * 10;
//     return index + scope.$index + 1 + 20;
//   } else {
//     let index = this.formData.PageIndex * 10;
//     return index + scope.$index + 1;
//   }
// }


//新建
const addArticle = () => {
  router.push({
    path: "/articleListInfo",
    query: {
      type: 'add'
    }
  });
}
//查看
const LookArticleListInfo = (row) => {
  router.push({
    path: "/articleListInfo",
    query: {
      type: 'look',
      ...row
    }
  });
}





//编辑
const editArticle = (id) => {
  router.push({
    path: "/articleListInfo",
    query: {
      type: 'edit'
    }
  });

}
//删除
const delItem = async (row) => {
  console.log('删除文章信息',row);
  let res = await delArticle({ ids: [row.ID] })
  console.log('删除文章', res);
  if (res.StatusCode == 200) {
    //删除成功
    ElMessage({
      message: '成功删除',
      type: 'success',
    })
    console.log('删除成功');
  } else {
    //删除失败
    ElMessage.error('删除失败')
  }
  getList()


  // ElMessageBox.confirm(
  //   '是否确认删除该文章?',
  //   {
  //     confirmButtonText: '确认',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }

  // )
  //   .then(() => {
  //     ElMessage({
  //       type: 'success',
  //       message: '成功删除',
  //     })
  //   })
  //   .catch(() => {
  //     ElMessage({
  //       type: 'info',
  //       message: '取消删除',
  //     })
  //   })
}

//批量选中的文章列表
const selections = ref([])

//表格选择项发生变化
const changeSelection = (item) => {
  // console.log('选择项发生变化', item);
  selections.value = []
  item.map((item) => {
    selections.value.push(item.ID)
  })
  // console.log('选择项selection', selections.value);
}



//批量删除
const delSome = async () => {
  let res = await delArticle({ ids: selections.value })
  console.log('删除文章', res);
  getList()

  // ElMessageBox.confirm(
  //   '是否确认删除选中的所有文章?',
  //   {
  //     confirmButtonText: '确认',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }
  // )
  //   .then(() => {
  //     ElMessage({
  //       type: 'success',
  //       message: '删除成功',
  //     })
  //   })
  //   .catch(() => {
  //     ElMessage({
  //       type: 'info',
  //       message: '取消删除',
  //     })
  //   })
}

//发布文章
const publish = (id) => {

}
// //上移
// const upHot = (row) => {

// }

// //下移
// const downHot = (row) => {

// }

//行拖拽
// const rowDrop = () => {
//   const tbody = document.querySelector(
//     ".draggable .el-table__body-wrapper tbody"
//   );
//   console.log(tbody, 'tbody')
//   Sortable.create(tbody, {
//     animation: 100,
//     draggable: ".draggable .el-table__row",
//     onMove: function ({ dragged, related }) {
//       // evt.dragged; // 被拖拽的对象
//       // evt.related; // 被替换的对象
//       const oldRow = activeRows[dragged.rowIndex]
//       const newRow = activeRows[related.rowIndex]
//       // console.log('newRow', newRow);
//       // console.log('oldRow', oldRow);
//       //限制只能同级别之间移动
//       if (oldRow.level !== newRow.level || oldRow.parentId !== newRow.parentId) {
//         return false
//       }
//     },

//     onEnd({ newIndex, oldIndex }) {
//       console.log('newIndex', newIndex);
//       console.log('oldIndex', oldIndex);
//       //数据进行移动-修改activeRow的数据顺序
//       const currRow = activeRows.splice(oldIndex, 1)[0]
//       console.log('currRow', currRow);
//       const aa = activeRows.splice(newIndex, 0, currRow)
//       console.log('拖拽后activeRows的数据', activeRows);
//       //修改table的数据
//       const newTbaleData = changeToTree(activeRows, 0)
//       tableData = newTbaleData
//       tableKey.value = new Date().getTime()
//       console.log('新表单数据', tableData);
//       //拖拽完成之后再次请求接口数据
//     }
//   })
//   //强制刷新
//   const internalInstance = getCurrentInstance();
//   internalInstance.ctx.$forceUpdate();
// }



onMounted(() => {
  document.getElementsByClassName("el-pagination__goto")[0].childNodes[0].nodeValue = "跳至";
  // rowDrop()
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