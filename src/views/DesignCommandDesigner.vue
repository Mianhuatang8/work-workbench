<template>
    <div>
        <!-- 需求详情 -->
        <div style="margin-top: 30px;width: 1200px;">
            <span style="font-weight: bold;font-size:15px;">需求详情</span>
            <div style="margin-top: 30px;margin-left: 15px;">
                <div style="display: flex;">
                    <span style="margin-right: 15px;">房屋地址：</span>
                    <span>{{ commonds.address }}</span>
                </div>
                <ul style="display: flex;margin-top:15px;">
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">面积：</span>
                        <span>{{ commonds.square }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">计划入住时间：</span>
                        <span>{{ commonds.time }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">风格：</span>
                        <span>{{ commonds.style }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">装修预算：</span>
                        <span>{{ commonds.budget }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">房屋类型：</span>
                        <span>{{ commonds.houseType }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">户型：</span>
                        <span>{{ commonds.apartmentType }}</span>
                    </li>
                    <li style="list-style: none;margin-right: 50px;">
                        <span style="margin-right: 15px;">楼型：</span>
                        <span>{{ commonds.buildingType }}</span>
                    </li>
                </ul>
                <div style="display: flex;align-items: center; width: 400px;margin-top:15px;">
                    <span style="margin-right: 15px;width: 130px;">常驻人员：</span>
                    <span style="margin-right: 20px;">{{ commonds.people }}</span>
                    <el-input v-model="commonds.peopleDesc" type="text" placeholder="暂无描述" />
                </div>

                <div style="display: flex;margin-top: 16px;width:450px;">
                    <span style="margin-right: 20px;width:170px;">空间设计要点：</span>
                    <div>
                        <el-checkbox-group v-model="commonds.designSelect" size="small" style="display:flex;">
                            <el-checkbox label="1" border class="no-circle">客厅</el-checkbox>
                            <el-checkbox label="2" border class="no-circle">主卧</el-checkbox>
                            <el-checkbox laber="3" border class="no-circle">生活阳台</el-checkbox>
                        </el-checkbox-group>
                        <el-input v-model="commonds.peopleDesc" type="textarea" class="designDesc" style="margin-top: 12px;"
                            resize="none" placeholder="暂无描述" />
                    </div>
                </div>

                <div style="display: flex;margin-top: 16px;">
                    <span style="margin-right: 64px;">客户备注：</span>
                    <div style="width:316px;">
                        <el-input v-model="commonds.msg" type="textarea" placeholder="暂无描述" resize="none"
                            class="designDesc" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 已参与的设计师 -->
        <el-card class="box-card" style="margin-top: 50px;width: 1000px;">
            <template #header>
                <div class="card-header">
                    <span>已参与的设计师</span>
                </div>
            </template>
            <el-table ref="multipleTableDevice" :data="tableData" style="width: 100%;"
                :header-cell-style="{ background: '#F2F3F8' }" max-height="380" :row-style="{ height: 40 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }">

                <el-table-column type="index" align="center" header-align="center" label="序号">
                </el-table-column>
                <el-table-column prop="designerName" align="center" header-align="center" label="设计师">
                </el-table-column>
                <el-table-column v-if="Number(status) == 3 || Number(status) == 4" prop="type" align="center"
                    header-align="center" label="派单类型">
                    <template v-slot="scope">
                        {{ scope.row.type == 0 ? '系统派单' : '手动派单' }}
                    </template>
                </el-table-column>

                <el-table-column align="center" header-align="center" :label="Number(status) === 2 ? '开始时间' : '接受时间'">
                    <template v-slot="scope">
                        {{ scope.row.startTime }}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="是否上传作品" sortable>
                    <template v-slot="scopeUpLoad">
                        <span :style="scopeUpLoad.row.isUpLoad == 0 ? 'color:red' : 'color:#37e337'">{{
                            scopeUpLoad.row.isUpLoad == 0 ? '未完成' : '已完成' }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="rank" align="center" header-align="center" label="业主排名" sortable>
                </el-table-column>

                <el-table-column v-if="Number(status) == 4" prop="prize" align="center" header-align="center" label="奖金">
                </el-table-column>

                <el-table-column align="center" header-align="center" label="操作">
                    <template v-slot="operationScope">
                        <el-link type="primary" :disabled="operationScope.row.isUpLoad == 0"
                            :style="operationScope.row.isUpLoad == 0 ? 'color:black' : 'color:blue'">查看方案</el-link>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    status
})
const commonds = ref({
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
    designSelect: [],//设计选择
    designDesc: '',//设计描述
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
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)

</script>

<style></style>