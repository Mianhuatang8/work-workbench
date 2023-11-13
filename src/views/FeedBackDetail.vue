<template>
    <div class="Container" style="padding:17px 44px">

        <div style="display: flex;justify-content: space-between;">
            <div style="margin-bottom: 30px; font-size: 17px;cursor: pointer;">
                <span>反馈管理</span>
                <span style="margin:0 5px;">/</span>
                <span @click="goback">反馈列表</span>
                <span style="margin:0 5px;">/</span>
                <span style="font-weight: bold;">反馈详情</span>
            </div>
            <div style="display: flex;">
                <el-button plain @click="goback">返回列表</el-button>
                <el-button plain style="margin-right: 10px;" @click="setClose()"
                    :disabled="Number(form.FeedBackStatus) !== 0">设置为关闭</el-button>
                <el-button type="primary" style="margin-right: 10px;" @click="setFinish()"
                    :disabled="Number(form.FeedBackStatus) !== 0">设置为完成</el-button>
            </div>
        </div>

        <div style="background-color: white; padding: 25px;width: 100%;display: flex;">
            <div style="margin: 0 auto;" class="main-content">
                <div class="one">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>用户信息</div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">用户ID</div>
                            <el-input v-model="form.UserId" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">用户名</div>
                            <el-input v-model="form.UserName" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">手机号</div>
                            <el-input v-model="form.UserPhone" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">微信账号</div>
                            <el-input v-model="form.WxCode" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>

                </div>

                <div class="two">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>反馈信息</div>
                    </div>

                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">反馈编号</div>
                            <el-input v-model="form.FeedBackCode" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">反馈标题</div>
                            <el-input v-model="form.FeedBackTitle" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">平台内容</div>
                            <el-input v-model="form.PlatformContent" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">问题类型</div>
                            <el-input v-model="form.ProblemContent" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">反馈状态</div>
                            <div style="display: flex;align-items: center;background-color: #f5f7fa;width: 100%;height: 31px;
                                 border: 1px solid #e4e7ed;border-radius: 5px;"
                                 :key="statuskey">
                                <div :style="{ 'background-color': getStateColor(form.FeedBackStatus) }" class="stateIcon"> </div>
                                <div>{{ form.FeedBackStatusText }}</div>
                            </div>
                        </div>


                        <div>
                            <div style="margin-bottom: 15px;">反馈时间</div>
                            <el-input v-model="form.FeedBackTimeStr" disabled
                                style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div>
                        <div style="margin-bottom: 15px;">具体描述</div>
                        <el-input v-model="form.FeedBackContent" disabled style="margin-bottom: 10px;" type="textarea"
                            resize="none"></el-input>

                    </div>
                    <div>
                        <div style="margin-bottom: 15px;">图片</div>
                        <ul style="display: flex;flex-wrap: wrap;">
                            <li style="list-style: none;margin-bottom: 10px;margin-right: 10px;"
                                v-for="(item, index) in form.PicList" :key="index">

                                <img :src="item" style="width: 70px;height: 70px;">
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, CopyDocument, Select } from '@element-plus/icons-vue'
import { reactive, ref, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { closeFeedBack, finishFeedBack,getListById } from '../api/feedBack.js'

const router = useRouter()
const route = useRoute()

var statuskey=ref('')
var form = reactive({})
//接收路由传递过来的参数
console.log('接收路由传递过来的参数', route);
form = route.query
console.log('表单数据', form);

const goback = () => {
    router.back();
}
const getStateColor = (state) => {
    if (state == 0) {
        return "orange";
    } else if (state == 1) {
        return "#0adf0a";
    } else if (state == 2) {
        return "gray";
    }
}

//设置为关闭
const setClose = async () => {
    const res = await closeFeedBack({ ID: route.query.FeedBackId })
    console.log('关闭反馈', res);
    if (res.status == 200) {
        //修改当前页面的反馈状态
        form.FeedBackStatus = 2
        form.FeedBackStatusText = '已关闭'
        statuskey.value=new Date()
        ElMessageBox.alert('反馈状态已成功修改为关闭', '提示', {
            icon: markRaw(Select),
        })
    } else {
        ElMessage.error('设置失败')
    }
}
//设置为完成
const setFinish = async () => {
    const res = await finishFeedBack({ ID: route.query.FeedBackId })
    console.log('完成反馈', res);
    if (res.status == 200) {
        form.FeedBackStatus = 1
        form.FeedBackStatusText = '已完成'
        statuskey.value=new Date()
        ElMessageBox.alert('反馈状态已成功修改为完成', '提示', {
            icon: markRaw(Select),
        })
    } else {
        ElMessage.error('设置失败')
    }
}
</script>

<style lang="less" scoped>
.stateIcon {
    width: 8px;
    margin-left: 10px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
    margin-right: 8px;
}

.main-content {
    .title {
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        margin-top: 30px;

        .title-block {
            width: 4px;
            background-color: #5f90ee;
            height: 17px;
            margin-right: 3px;
        }
    }
}

:deep(.el-textarea__inner) {
    height: 120px;
}
</style>