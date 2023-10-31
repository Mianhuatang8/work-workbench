<template>
    <div class="Container" style="padding:17px 44px">

        <div style="display: flex;justify-content:space-between">
            <div style="margin-bottom: 30px; font-size: 17px;cursor: pointer;">
                <span>竞选管理</span>
                <span style="margin:0 5px;">/</span>
                <span @click="goback">竞选列表</span>
                <span style="margin:0 5px;">/</span>
                <span style="font-weight: bold;">竞选详情</span>
            </div>
            <div style="display: flex;">
                <el-button type="primary" plain @click="goback">返回列表</el-button>
            </div>
        </div>

        <div style="background-color: white; padding: 20px;width: 100%;display: flex;">
            <div style="margin: 0 auto;" class="main-content">
                <div class="one">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>基础信息</div>
                    </div>
                    <div style="width: 100%;margin-right: 15px;">
                        <div style="margin-bottom: 10px;">竞选ID</div>
                        <el-input v-model="formData.campaignId" disabled style="margin-bottom: 10px;"></el-input>
                    </div>

                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">订单状态</div>
                            <el-input v-model="formData.orderStatus" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">提交时间</div>
                            <el-input v-model="formData.commitTime" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>

                </div>

                <!-- 进行状态 -->
                <div class="five" style="width:100%"
                    v-show="Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>进行状态</div>
                    </div>
                    <el-steps :active="Number(detailData.status) + 1" align-center style="margin-top: 25px;width:100%;">
                        <el-step>
                            <template #description>
                                <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">已确认</div>
                                <div style="font-size: 12px;color: gray;margin-top: 5px;">用户发布需求</div>
                                <div style="font-size: 12px;color: gray;">2022-09-09 12:00:00</div>
                            </template>
                        </el-step>
                        <el-step>
                            <template #description>
                                <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">已完成</div>
                                <div style="font-size: 13px;color: gray;margin-top: 5px;">设计师进行</div>
                                <div style="font-size: 13px;color: gray;">2022-09-09 12:00:00</div>
                            </template>
                        </el-step>
                        <el-step>
                            <template #description>
                                <div v-show="Number(detailData.status) == 2">
                                    <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">投稿中</div>
                                    <div v-show="Number(detailData.status) == 2"
                                        style="font-size: 12px;color: red;font-weight: bold;margin-top: 5px;">02:59:57</div>
                                </div>
                                <div v-show="Number(detailData.status) == 3 || Number(detailData.status) == 4">
                                    <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">已截止</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">设计师上传设计方案</div>
                                    <div style="font-size: 12px;color: gray;">2022-09-09 12:00:00</div>
                                </div>

                            </template>
                        </el-step>
                        <el-step>
                            <template #description>
                                <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;"
                                    v-show="Number(detailData.status) == 2">业主评选</div>

                                <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;"
                                    v-show="Number(detailData.status) == 3">评选中</div>

                                <div v-show="Number(detailData.status) == 4">
                                    <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">已评选</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">业主评选</div>
                                    <div style="font-size: 12px;color: gray;">2022-09-09 12:00:00</div>
                                </div>
                            </template>
                        </el-step>
                        <el-step>
                            <template #description>
                                <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">完成</div>
                                <div v-show="Number(detailData.status) == 4"
                                    style="font-size: 12px;color: gray;margin-top: 5px;">2022-09-09 12:00:00</div>

                            </template>
                        </el-step>
                    </el-steps>

                </div>


                <div class="two">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>竞选业主信息</div>
                    </div>

                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">用户ID</div>
                            <el-input v-model="formData.userId" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">昵称</div>
                            <el-input v-model="formData.userName" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">联系人</div>
                            <el-input v-model="formData.name" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">联系电话</div>
                            <el-input v-model="formData.phone" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>

                </div>


                <div class="three">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>设计竞选设置</div>
                    </div>

                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">最大参与人数</div>
                            <el-input v-model="formData.participate" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">设计师投稿时间</div>
                            <el-input v-model="formData.submissionTime" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">竞选结果</div>
                            <el-input v-model="formData.result" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">竞选奖金</div>
                            <el-input v-model="formData.money" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="width: 100%;margin-top: 15px;font-size: 15px;">
                        <div style="margin-bottom: 10px;">竞选奖金分配规则</div>
                        <el-input v-model="formData.campaignRules" disabled
                            v-show="Number(detailData.status) == 0 || Number(detailData.status) == 1 || Number(detailData.status) == 2"
                            style="margin-bottom: 10px" autosize></el-input>
                        <el-input v-show="Number(detailData.status) == 3 || Number(detailData.status == 4)"
                            v-model="formData.campaignRules2" disabled type="textarea" resize="none" autosize></el-input>

                    </div>

                </div>


                <div class="four" v-show="Number(detailData.status) != 0">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>需求详情</div>
                    </div>

                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">房屋地址</div>
                            <el-input v-model="formData.address" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">面积</div>
                            <el-input v-model="formData.square" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">风格</div>
                            <el-input v-model="formData.style" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">户型</div>
                            <el-input v-model="formData.apartmentType" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">房屋类型</div>
                            <el-input v-model="formData.houseType" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">楼型</div>
                            <el-input v-model="formData.buildingType" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 15px;font-size: 15px;">
                        <div style="width:328px;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">空间设计要点</div>
                           

                            <el-tabs v-model="activeDesign" type="border-card" class="demo-tabs" @tab-click="handleClick">
                                <el-tab-pane label="客厅" name="0">
                                    <!-- <el-input v-model="formData.livingRoomDesc" disabled style="margin-bottom: 10px;width: 350px;"
                                        type="textarea" resize="none" placeholder="暂无描述"></el-input> -->
                                    {{ formData.livingRoomDesc }}
                                </el-tab-pane>
                                <el-tab-pane label="主卧" name="1">
                                    {{ formData.masterbedroomDesc }}
                                </el-tab-pane>
                                <el-tab-pane label="生活阳台" name="2">
                                    {{ formData.balconyDesc }}

                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <div style="margin-left :15px;">
                            <div style="margin-bottom: 10px;">客户备注</div>
                            <el-input v-model="formData.msg" disabled style="margin-bottom: 10px;width: 350px;"
                                type="textarea" resize="none" placeholder="暂无描述"></el-input>
                        </div>
                    </div>

                    <div v-show="Number(detailData.status) != 1" style="margin-top: 15px;">
                        <div style="margin-bottom: 10px;">户型图</div>
                        <div>
                            <ul class="huixing-ul">
                                <li>
                                    <img src="../assets//img/email.png" alt="">
                                </li>
                                <li>
                                    <img src="../assets//img/email.png" alt="">
                                </li>
                                <li>
                                    <img src="../assets//img/email.png" alt="">
                                </li>
                                <li>
                                    <img src="../assets//img/email.png" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>



                <!-- 进行状态 -->
                <div class="six" style="width:100%;"
                    v-show="Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <div class="title">
                            <div class="title-block"></div>
                            <div>已参与的设计师</div>
                        </div>
                        <div v-show="Number(detailData.status) == 4">
                            <span>竞选奖金分配后余额：</span>
                            <span style="color:red">199元</span>
                        </div>
                    </div>

                    <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;"
                        :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
                        :cell-style="{ padding: 0 + 'px' }">

                        <el-table-column type="index" align="center" header-align="center" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="designerName" align="center" header-align="center" label="设计师">
                        </el-table-column>

                        <el-table-column align="center" header-align="center" label="上传时间">
                            <template v-slot="scope">
                                {{ scope.row.startTime }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align="center" label="是否上传作品"
                            v-if="Number(detailData.status) == 2 || Number(detailData.status) == 3">
                            <template v-slot="scopeUpLoad">
                                <span :style="scopeUpLoad.row.isUpLoad == 0 ? 'color:red' : 'color:#37e337'">{{
                                    scopeUpLoad.row.isUpLoad == 0 ? '未上传' : '已上传' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="rank" align="center" header-align="center" label="业主排名" sortable>
                        </el-table-column>

                        <el-table-column prop="prize" align="center" header-align="center"
                            v-if="Number(detailData.status) == 4" label="奖金">
                        </el-table-column>

                        <el-table-column align="center" header-align="center" label="操作">
                            <template v-slot="operationScope">
                                <el-link type="primary" :disabled="operationScope.row.isUpLoad == 0"
                                    :style="operationScope.row.isUpLoad == 0 ? 'color:black' : 'color:blue'">查看方案</el-link>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>




            </div>
        </div>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import DesignCommandDesigner from './DesignCommandDesigner.vue';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Search, CopyDocument } from '@element-plus/icons-vue'

const route = useRoute()
console.log('路由跳转传递过来的参数', route);
const router = useRouter()

const goback = () => {
    router.back();
}


//收集表单信息
const formData = ref({
    campaignId: '1321325354575870808',
    orderStatus: '0', //0-未支付  1-待支付
    commitTime: '2023-09-09',
    userId: 'tenujfvnhgn1212',
    userName: '你好啊',
    name: "张三",
    phone: '1122324354543',
    participate: 5,
    submissionTime: '72小时',
    result: '不公开',
    money: '199元',
    campaignRules: '业主已确定的方案最少选一个，最多选五个，所有参与者平分奖金。',
    campaignRules2: '第1名获得竞选奖金的50%;\n第2名获得竞选奖金的30%;\n第3名获得竞选奖金的15%;\n其他参与者平分竞选奖金的5%;\n业主未评选，所有参与者平分奖金',
    address: '广东省广州市海珠区',
    square: '-',
    time: '-',
    style: '-',
    budget: "-",
    //房屋类型
    houseType: '-',//房屋类型
    apartmentType: '-',//户型
    buildingType: '-',//楼型
    people: 5,//常驻人员
    peopleDesc: '',
    activeDesign: 0,//设计选择 0-客厅 1-主卧 2-阳台
    livingRoomDesc: "",
    masterbedroomDesc: '11',
    balconyDesc: '22',
    msg: '',//客户备注

})
const tableData = ref([
    {
        designerName: '设计师1',
        startTime: '2020-10-10',
        isUpLoad: 0,//0-未上传 1-已上传
        rank: '-',
        type: '0',//0-系统派单 1-手动派单
        prize: 123,
    },
    {
        designerName: '设计师2',
        startTime: '2020-10-11',
        isUpLoad: 0,//0-未上传 1-已上传
        rank: '-',
        type: '0',//0-系统派单 1-手动派单
        prize: 123,
    },
    {
        designerName: '设计师3',
        startTime: '2020-10-12',
        isUpLoad: 1,//0-未上传 1-已上传
        rank: '-',
        type: '0',//0-系统派单 1-手动派单
        prize: 123,
    },
    {
        designerName: '设计师4',
        startTime: '2020-10-13',
        isUpLoad: 1,//0-未上传 1-已上传
        rank: '-',
        type: '0',//0-系统派单 1-手动派单
        prize: 123,
    },
    {
        designerName: '设计师5',
        startTime: '2020-10-14',
        isUpLoad: 1,//0-未上传 1-已上传
        rank: '-',
        type: '1',//0-系统派单 1-手动派单
        prize: 123,
    },
    {
        designerName: '设计师6',
        startTime: '2020-10-15',
        isUpLoad: 1,//0-未上传 1-已上传
        rank: '-',
        type: '1',//0-系统派单 1-手动派单
        prize: 123,
    }
])
const detailData = ref([])
//传递一整个row过来-status订单状态
detailData.value = route.query
// console.log('this.detailData', detailData.value);
formData.orderStatus = route.query.status
// console.log('11111111111111',formData.orderStatus);


</script>

<style scoped lang="less">
.main-content {
    .title {
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        margin-top: 30px;
        font-weight: bold;

        .title-block {
            width: 4px;
            background-color: #5f90ee;
            height: 17px;
            margin-right: 3px;
        }
    }
}

.huixing-ul {
    display: flex;
    flex-wrap: wrap;

    li {
        list-style: none;
        // width: 25%;
        margin-right: 15px;
        margin-bottom: 10px;

        img {
            width: 60px;
            height: 60px;

        }
    }
}

:deep(.el-tabs--border-card>.el-tabs__content) {
    background-color: #f5f7fa;
}

:deep(.el-tabs__content) {
    height: 120px;
    overflow-y: scroll;
  
}

:deep(.el-tabs--border-card) {
    width:348px;
}
:deep(.el-tab-pane){
    line-height: 18px;
    font-size: 14px;
}
:deep(.el-textarea__inner){
    height: 190px;
}
</style>