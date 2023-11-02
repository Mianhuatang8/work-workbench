<template>
    <!-- 举报详情 -->
    <div style="padding:17px 44px">
        <div class="center-top" style="display: flex;justify-content: space-between;">
            <div style="margin-bottom: 30px; font-size: 17px;cursor: pointer;">
                <span style="margin-right: 8px;margin-bottom: 30px;">社区管理</span>
                <span style="margin:0 5px">/</span>
                <span @click="goback" style="margin-right: 8px;cursor: pointer;">举报</span>
                <span style="margin:0 5px">/</span>
                <span style="font-weight: bold;">举报详情</span>
            </div>
            <div style="display: flex;margin-right:10px">
                <el-button @click="goback()">返回到列表</el-button>
                <el-button @click="reject()">驳回</el-button>
                <el-button type="primary" @click="remove()">下架</el-button>
            </div>
        </div>


        <div style="background-color: white; padding: 25px;width: 100%;display: flex;">
            <div style="margin: 0 auto;width: 800px;" class="main-content">
                <div class="one">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>基础信息</div>
                    </div>
                    <div style="margin-top: 15px;font-size: 15px;">
                        <div style="margin-bottom: 10px;">标题</div>
                        <el-input v-model="value" disabled style="margin-bottom: 10px;"></el-input>
                    </div>

                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">封面</div>
                            <div
                                style="width: 100%;align-items: center; display: flex;height:200px;justify-content: center;background-color: #f5f7fa;">
                                <img src="../assets/img/8_active.png" alt="" style="width: 150px;height: 150px;">

                            </div>

                        </div>
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">描述词</div>
                            <el-input v-model="form.descWord" disabled style="margin-bottom: 10px;" type="textarea"
                                resize="none" class="descWord"></el-input>
                        </div>
                    </div>

                    <div style="margin-top: 15px;font-size: 15px;">
                        <div style="margin-bottom: 10px;">图文详情</div>
                        <div
                            style="width: 100%; background-color: #f5f7fa;min-height: 300px;overflow-y: scroll;display: flex;flex-wrap: wrap;">
                            <!-- <img :src="form.detailImgSrc" style="width: 200px;height: 200px;margin: 0 auto;margin-top: 10px;"> -->
                            <div style="line-height: 20px;padding: 15px;">{{ form.detailText }}</div>
                        </div>
                    </div>

                </div>

                <div class="two" style="margin-top: 35px;">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>举报信息</div>
                    </div>

                    <div style="margin-top: 15px;font-size: 15px;">
                        <div style="margin-bottom: 10px;">举报内容</div>
                        <el-input v-model="form.reportContent" disabled style="margin-bottom: 10px;" type="textarea"
                            resize="none" autosize></el-input>
                    </div>

                    <div style="margin-top: 15px;font-size: 15px;">
                        <div style="margin-bottom: 10px;">举报状态</div>
                        <div style="display: flex;align-items: center;background-color: #f5f7fa;width: 100%;height: 31px;
                         border: 1px solid #e4e7ed;border-radius: 5px;">
                            <div :style="{ 'background-color': getStateColor(form.reportState) }" class="stateIcon"></div>
                            <div>{{ getStateFont(form.reportState) }}</div>
                        </div>
                    </div>
                </div>

                <div class="three" style="margin-top: 35px;">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>处理流程</div>
                    </div>

                    <div style="margin-top: 15px;font-size: 15px;">
                        <el-steps :active="Number(currentState) == 2 ? Number(currentState) + 2 : Number(currentState) + 1"
                            align-center style="margin-top: 25px;width:100%;">
                            <el-step>
                                <template #description>
                                    <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">处理完成</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">用户已上传举报信息</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">2022-09-09 12:00</div>
                                </template>
                            </el-step>
                            <el-step>
                                <template #description>
                                    <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">处理完成</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">系统接收</div>
                                    <div style="font-size: 12px;color: gray;margin-top: 5px;">2022-09-09 12:00</div>
                                </template>
                            </el-step>
                            <el-step>
                                <template #description>
                                    <div v-show="Number(currentState) == 1">
                                        <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">正在处理
                                        </div>
                                        <div v-show="Number(currentState) == 1"
                                            style="font-size: 12px;color: black;font-weight: bold;margin-top: 5px;">
                                            xxx运营人员正在处理
                                        </div>
                                    </div>

                                    <div v-show="Number(currentState) == 2 || Number(currentState) == 3">
                                        <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">处理完成
                                        </div>
                                        <div style="font-size: 12px;color: gray;margin-top: 5px;">
                                            xxx运营人员已处理
                                        </div>
                                        <div style="font-size: 12px;color: gray;margin-top: 5px;">2022-09-09 12:00</div>
                                    </div>

                                </template>
                            </el-step>
                            <el-step>
                                <template #description>
                                    <div v-show="Number(currentState) == 1">
                                        <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;"
                                            v-show="Number(currentState) == 1">等待处理</div>
                                        <div style="font-size: 12px;color: gray;margin-top: 5px;">推送消息给用户</div>
                                    </div>
                                    <div v-show="Number(currentState) == 2 || Number(currentState) == 3">
                                        <div style="font-size: 13px;color: black;font-weight: bold;margin-top: 13px;">处理完成
                                        </div>
                                        <div style="font-size: 12px;color: gray;margin-top: 5px;">
                                            推送消息给用户
                                        </div>
                                        <div style="font-size: 12px;color: gray;margin-top: 5px;">2022-09-09 12:00</div>
                                    </div>

                                </template>
                            </el-step>

                        </el-steps>

                    </div>
                </div>


            </div>
        </div>



        <!-- <div style="margin: 18px 40px;border-radius: 0px;box-shadow: 0px 1px 7px 1px #d7d7d7">
            <div class="basic-content">

                <div class="title">基础信息</div>
                <div>
                    <el-form ref="ruleFormRef" :model="reportDetail" label-width="120px" style="margin-top: 35px;"
                        class="demo-ruleForm" :size="formSize" status-icon>
                        <el-form-item label="名称" style="width: 550px;" :rules="{ 'required': true }">
                            <el-input v-model="reportDetail.title" disabled />
                        </el-form-item>
                        <el-form-item label="封面" style="width: 550px;" :rules="{ 'required': true }">
                            <div class="eightRow grid-box inform-center">
                                <img class="cover-img" :src='reportDetail.coverUrl'>
                            </div>
                        </el-form-item>
                        <el-form-item label="合辑分类" style="width: 550px;" :rules="{ 'required': true }">
                            <el-input v-model="reportDetail.classify" disabled />
                        </el-form-item>
                        <el-form-item label="描述词" style="width: 550px;">
                            <el-input v-model="reportDetail.descriptor" show-word-limit resize="none" disabled
                                type="textarea" />
                        </el-form-item>
                        <el-form-item label="图文详情" style="height: 300px;" :rules="{ 'required': true }">
                            <el-scrollbar :style="{ height: articleDetailMaxHeight }" class="article-srcoll grid-box">
                                <div v-html="reportDetail.articleDetail"></div>
                                <div class="flodArticle" @click="unfoldArticle"></div>
                            </el-scrollbar>

                        </el-form-item>


                    </el-form>
                </div>

            </div>

            <div class="center-bottom" style="margin-top: 50px;">
                <div style="display: flex;" class="common-border">
                    <div class="left-text">举报内容：</div>
                    <div style="font-weight: bold;margin-left: 15px;">文字敏感！！！图片违规了快下架1!!!!!!!!!</div>
                </div>
                <div style="display: flex;" class="common-border">
                    <div class="left-text">信息状态：</div>
                    <div style="color: orange;margin-left: 15px;">已下架</div>
                </div>
            </div>
        </div>

        <div class="deal-process">
            <div class="title">处理流程</div>
            <div style="height: 400px;margin-left: 30px;margin-top: 45px" class="process">
                <el-steps direction="vertical" :active="4">
                    <el-step>
                        <template #title>
                            <div style="display: flex;">
                                <div>
                                    <div class="one">用户已上传举报信息</div>
                                    <div class="two">xxxxx用户名</div>
                                </div>
                                <div>
                                    <span class="time">2020-07-12 23:22:11</span>
                                </div>
                            </div>
                        </template>

                    </el-step>

                    <el-step>
                        <template #title>
                            <div style="display: flex;">
                                <div>
                                    <div class="one">系统接收</div>
                                    <div class="two">后台管理系统-举报管理列表</div>
                                </div>
                                <div>
                                    <span class="time">2020-07-12 23:22:11</span>
                                </div>
                            </div>
                        </template>

                    </el-step>

                    <el-step>
                        <template #title>
                            <div style="display: flex;">
                                <div>
                                    <div class="one">xxx运营人员已处理</div>
                                    <div class="two">后台管理系统-举报详情</div>
                                </div>
                                <div>
                                    <span class="time">2020-07-12 23:22:11</span>
                                </div>
                            </div>
                        </template>

                    </el-step>
                    <el-step>
                        <template #title>
                            <div style="display: flex;">
                                <div>
                                    <div class="one">推送消息给用户</div>
                                    <div class="two">后台管理系统-消息推送</div>
                                </div>
                                <div>
                                    <span class="time">2020-07-12 23:22:11</span>
                                </div>
                            </div>
                        </template>

                    </el-step>
                </el-steps>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, markRaw, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()


const form = reactive({
    titel: '',
    coverImg: '',
    descWord: '',
    detailText: '',
    detailImgSrc: '',
    reportContent: '',
    reportState: null,
})
//接受传递过来的参数
const currentState = ref(null)
currentState.value = route.query.state
form.reportState = route.query.state
// console.log('路由信息',route.query);
// console.log('当前举报信息的状态',currentState.value);

const goback = () => {
    router.back();
}

//驳回
const reject = () => {
    ElMessageBox.alert('驳回举报信息', '提示', {
        icon: markRaw(Select),
    })
}
//下架
const remove = () => {
    ElMessageBox.alert('下架成功', '提示', {
        icon: markRaw(Select),
    })

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
    if (state == 1) {
        return "#FFAD28";
    } else if (state == 2) {
        return "#52C41A";
    } else {
        return "#5F90EE";
    }
}
</script>

<style lang="less" scoped>
.common-border {
    border: 1px solid #e9e9e9;
    height: 45px;
    align-items: center;

    .left-text {
        height: 100%;
        width: 10%;
        display: flex;
        align-items: center;
        border-right: 1px solid #e9e9e9;
        justify-content: center;
        background-color: #f3f3f3;
        font-weight: bold;
    }

}
.stateIcon {
  width: 8px;
  margin-left: 10px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  margin-right: 8px;
}


// .el-step__description {
//     padding-right: 10%;
//     /* margin-top: -5px; */
//     font-size: 12px;
//     line-height: 20px;
//     font-weight: 400;
//     margin: 0;
// }

.deal-process {
    margin: 40px;

    .process {
        .one {
            font-size: 16px;
            color: black;
            font-weight: bold;
        }

        .two {
            margin-top: 13px;
            color: #9b9b9b;
            font-size: 13px
        }

        .time {
            color: gray;
            font-size: 15px;
            margin-left: 60px;
        }
    }

}

.basic-content {
    padding-top: 30px;
    padding-left: 15px;
}

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
    border-radius: 15px;
    padding: 24px;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(224, 224, 239, 0.5);
}

.title-block {
    width: 4px;
    height: 16px;
    margin-right: 5px;
    background-color: #5F90EE;
}

.title {
    display: flex;
    align-items: center;
    // margin-left: 15px;
    margin-bottom: 12px;
    font-size: 17px;
    font-weight: bold;

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
    background-color: #f5f7fa;
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

.article-srcoll {
    // border-radius: 15px;
    width: 70%;
    border-radius: 10px;
}


.subBox {
    margin-bottom: 24px;
    min-width: 620px;
}

.subBox p {}

.inform-content {
    // background-color: #fafafa;
    height: calc(100% - 64px);
    box-sizing: border-box;
    padding: 25px 46px 0 46px;
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

:deep(.descWord .el-textarea__inner) {
    height: 200px;
}
</style>