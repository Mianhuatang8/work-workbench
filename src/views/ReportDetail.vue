<template>
    <!-- 举报详情 -->
    <div class="inform-content">
        <div class="inform-text" style="font-size: 17px;">
            <span style="margin-right: 8px;font-weight: bold;margin-bottom: 30px;">社区管理</span>
            <span style="margin:0 5px">/</span>
            <span @click="goback" style="margin-right: 8px;cursor: pointer;font-weight: bold;">举报</span>
            <span style="margin:0 5px">/</span>
            <span>举报详情</span>
        </div>
        <el-scrollbar class="article-srcoll outer-srcoll">
            <div class="center">
                <div class="article">
                    <div class="title">
                        <div class="title-block"></div>
                        <p>文章信息</p>
                    </div>
                    <div class="grid-container">
                        <div class="grid-item subBox">
                            <p>标题</p>
                            <div class="oneRow grid-box">
                                <p>{{ reportDetail.title }}</p>
                            </div>
                        </div>
                        <div class="grid-item subBox">
                            <p>合辑分类</p>
                            <div class="oneRow grid-box">
                                <p>{{ reportDetail.classify }}</p>
                            </div>
                        </div>
                        <div class="grid-item subBox">
                            <p>描述词</p>
                            <div class="eightRow grid-box">
                                <p>{{ reportDetail.descriptor }}</p>
                            </div>
                        </div>
                        <div class="grid-item subBox">
                            <p>封面</p>
                            <div class="eightRow grid-box inform-center">
                                <img class="cover-img" :src='reportDetail.coverUrl'>
                            </div>
                        </div>
                    </div>
                    <div class="imgDetail subBox">
                        <p>图文详情</p>
                        <el-scrollbar v-show="flod" :style="{ height: articleDetailMaxHeight }"
                            class="article-srcoll grid-box">
                            <div v-html="reportDetail.articleDetail">
                            </div>
                            <div class="flodArticle" @click="unfoldArticle">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <title>E4FE5EEA-AB08-4828-9A0B-CC74AD36485D@0.0x</title>
                                    <g id="社区管理" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="举报/详情（待处理）" transform="translate(-1410.000000, -666.000000)">
                                            <g id="编组-15" transform="translate(604.000000, 160.000000)">
                                                <g id="编组-3" transform="translate(0.000000, 342.000000)">
                                                    <g id="icon/zhankai" transform="translate(806.000000, 164.000000)">
                                                        <rect id="矩形" x="0" y="0" width="24" height="24"></rect>
                                                        <g id="编组" transform="translate(2.000000, 2.000000)">
                                                            <circle id="椭圆形" fill-opacity="0.45" fill="#000000" cx="10"
                                                                cy="10" r="10"></circle>
                                                            <path
                                                                d="M15,7.07983126 L10.0000524,2 L5.00012083,7.07983126 L6.13929628,8.23724811 L10.0000524,4.31475187 L13.8608326,8.23724811 L15,7.07983126 Z M5,11.9200869 L9.99997181,17 L14.9999194,11.9200869 L13.8607521,10.7627192 L9.99997181,14.6851827 L6.13917545,10.7627192 L5,11.9200869 Z"
                                                                id="形状" fill="#FFFFFF" fill-rule="nonzero"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </el-scrollbar>
                        <div v-show="!flod" class="article-srcoll grid-box inform-outerBox">
                            <div v-html="reportDetail.articleDetail">
                            </div>
                            <div class="flodArticle" @click="unfoldArticle">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <title>E4FE5EEA-AB08-4828-9A0B-CC74AD36485D@0.0x</title>
                                    <g id="社区管理" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="举报/详情（待处理）" transform="translate(-1410.000000, -666.000000)">
                                            <g id="编组-15" transform="translate(604.000000, 160.000000)">
                                                <g id="编组-3" transform="translate(0.000000, 342.000000)">
                                                    <g id="icon/zhankai" transform="translate(806.000000, 164.000000)">
                                                        <rect id="矩形" x="0" y="0" width="24" height="24"></rect>
                                                        <g id="编组" transform="translate(2.000000, 2.000000)">
                                                            <circle id="椭圆形" fill-opacity="0.45" fill="#000000" cx="10"
                                                                cy="10" r="10"></circle>
                                                            <path
                                                                d="M15,7.07983126 L10.0000524,2 L5.00012083,7.07983126 L6.13929628,8.23724811 L10.0000524,4.31475187 L13.8608326,8.23724811 L15,7.07983126 Z M5,11.9200869 L9.99997181,17 L14.9999194,11.9200869 L13.8607521,10.7627192 L9.99997181,14.6851827 L6.13917545,10.7627192 L5,11.9200869 Z"
                                                                id="形状" fill="#FFFFFF" fill-rule="nonzero"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inform-info">
                    <div class="title">
                        <div class="title-block"></div>
                        <p>举报信息</p>
                    </div>
                    <div class="inform-box subBox">
                        <p>举报内容</p>
                        <div class="grid-box">
                            <p>{{ reportDetail.reportCxt }}</p>
                        </div>
                    </div>
                    <div class="inform-box subBox">
                        <p>举报状态</p>
                        <div class="grid-box inform-state">
                            <!-- <p> -->
                            <div :style="{ 'background-color': getStateColor(reportDetail.reportState) }" class="stateIcon">
                                {{ reportDetail.reportState }}
                            </div>

                            <!-- </p>  -->
                        </div>
                    </div>
                </div>
                <div class="subBox">
                    <el-steps :active="reportDetail.hadleFlowActive">
                        <el-step v-for="(item, index) in reportDetail.hadleFlow" :key=index :title="item.title"
                            :description="item.description">
                            <div class="handleIcon" slot="icon">
                                <div v-if="index === reportDetail.hadleFlowActive" class="handle-area">
                                    <div class="handle-tag handle-ing">{{ index + 1 }}</div><span>正在处理</span>
                                </div>
                                <div v-if="index < reportDetail.hadleFlowActive" class="handle-area">
                                    <div class="handle-tag handle-done"><i class="el-icon-check"></i></div><span>处理完成</span>
                                </div>
                                <div v-if="index > reportDetail.hadleFlowActive" class="handle-area">
                                    <div class="handle-tag handle-wait">{{ index + 1 }}</div>
                                    <p>等待处理</p>
                                </div>
                            </div>
                        </el-step>
                    </el-steps>
                </div>

            </div>
        </el-scrollbar>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const reportDetail = ref({
    title: '标题',
    classify: '合辑分类',
    descriptor: '描述词',
    coverUrl: '',
    articleDetail: '',
    reportCxt: '举报内容',
    reportState: '待处理',
    hadleFlow: [
        { title: '上传举报信息', description: '' },
        { title: '运营人员处理', description: '' },
        { title: '推送消息给用户', description: '' }
    ],
    hadleFlowActive: 1
})
const flod = ref(false)
const articleDetailMaxHeight = ref('inherit')
const traslate2APIState = ref({
    '待处理': 1,
    '已下架': 2,
    '已驳回': 3
})


const goback = () => {
    router.back();
}


const getStateFont = (state) => {
    if (state == 1) {
        return "待处理";
    } else if (state == 2) {
        return "已下架";
    } else if (state == 3) {
        return "已驳回";
    }
}
const getStateColor = (state) => {
    if (state == "待处理") {
        return "#FFAD28";
    } else if (state == "已下架") {
        return "#52C41A";
    } else {
        return "#5F90EE";
    }
}
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40px 220px;
    gap: 20px;
}

.inform-content .el-scrollbar__wrap {
    overflow-x: hidden;
}

.center .grid-item {
    min-width: 300px;
}

.inform-box .stateIcon {
    width: 8px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
}

.inform-state {
    display: flex;
    align-items: center;
}

.center {
    padding-left: 400px;
    padding-right: 400px;
    background-color: #FFFFFF;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(224, 224, 239, 0.5);
}

.title-block {
    width: 4px;
    height: 16px;
    background-color: #5F90EE;
}

.title {
    display: flex;
    align-items: center;
    padding-top: 24px;
    margin-bottom: 12px;
}

.title p {
    font-family: PingFangSC;
    color: #1F1F1F;
    font-weight: 550;
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    text-decoration: none;
    text-align: left;
}

.grid-box {
    background-color: #F5F5F5;
    margin-top: 6px;
    border-radius: 2px;
    min-height: 24px;
}

.grid-box p {
    margin-left: 14px;
    font-family: PingFangSC;
    color: #000000;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
}

.eightRow {
    height: 180px;
}

.cover-img {
    width: 200px;
    height: 150px;
}

.inform-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flodArticle {
    position: absolute;
    z-index: 1;
    bottom: 0px;
    right: 6px;
    cursor: pointer;
}

.article-srcoll {}

.subBox {
    margin-bottom: 24px;
    min-width: 620px;
}

.subBox p {}

.inform-content {
    background-color: #fafafa;
    height: calc(100% - 64px);
    box-sizing: border-box;
    padding: 25px 46px 0 46px;
}

.inform-text {
    color: #979797;
    margin-bottom: 24px;
}

.outer-srcoll {
    height: calc(100% - 42px);
}

.inform-outerBox {
    position: relative;
}

.handleIcon {
    position: absolute;
    width: 120px;
    height: 32px;
    background-color: #ffffff;
}

.handle-area {
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #000000;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.handle-tag {
    background-color: #E6F4FF;
    border-radius: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.handle-done {
    background-color: #E6F4FF;
}

.handle-ing {
    background-color: #1677FF;
}

.handle-wait {
    background-color: rgba(0, 0, 0, 0.06);
}

.center .el-steps {
    transform: translate(40px);
    width: 95%;
}

.center .is-finish {
    color: rgba(00, 00, 00, .45);
}

.center .el-step__title {
    font-size: 14px;
}

.center .el-step__description {
    font-size: 12px;
}

.center .el-icon-check::before {
    color: #569EFF;
}

.center .el-step__line {
    opacity: .3;
}
</style>