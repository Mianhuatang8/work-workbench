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
                <el-button plain style="margin-right: 10px;" @click="setClose()">设置为关闭</el-button>
                <el-button type="primary" style="margin-right: 10px;" @click="setFinish()">设置为完成</el-button>
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
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">用户名</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">手机号</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">微信账号</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
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
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">反馈标题</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">平台内容</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">问题类型</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">反馈状态</div>
                            <!-- <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                             -->
                            <div style="display: flex;align-items: center;background-color: #f5f7fa;width: 100%;height: 31px;
                                 border: 1px solid #e4e7ed;border-radius: 5px;">
                                <div :style="{ 'background-color': getStateColor(form.feebackState) }" class="stateIcon">
                                </div>
                                <div>{{ getStateFont(form.feebackState) }}</div>
                            </div>
                        </div>


                        <div>
                            <div style="margin-bottom: 15px;">反馈时间</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div>
                        <div style="margin-bottom: 15px;">具体描述</div>
                        <el-input v-model="specialDesc" disabled style="margin-bottom: 10px;" type="textarea"
                            resize="none"></el-input>

                    </div>
                    <div>
                        <div style="margin-bottom: 15px;">图片</div>
                        <ul style="display: flex;flex-wrap: wrap;">
                            <li style="list-style: none;margin-bottom: 10px;margin-right: 10px;">
                                <img src="../assets/img/email.png" style="width: 70px;height: 70px;">
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
import { Search, CopyDocument,Select } from '@element-plus/icons-vue'
import { reactive, ref ,markRaw} from 'vue'
import { useRouter } from 'vue-router';



const router = useRouter()

const goback = () => {
    router.back();
}
//反馈详情信息
const form=reactive({
    feebackState:0
})
const getStateFont = (state) => {
    if (state == 0) {
        return "待处理";
    } else if (state == 1) {
        return "已完成";
    } else if (state == 2) {
        return "已关闭";
    }
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
const setClose=()=>{
    ElMessageBox.alert('反馈状态已成功修改为关闭', '提示', {
        icon: markRaw(Select),
    })
}
//设置为完成
const setFinish=()=>{
    ElMessageBox.alert('反馈状态已成功修改为完成', '提示', {
        icon: markRaw(Select),
    })
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