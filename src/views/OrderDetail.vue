<template>
    <div class="Container" style="padding:17px 44px">

        <div style="display: flex;justify-content: space-between;">
            <div style="margin-bottom: 30px; font-size: 17px;cursor: pointer;">
                <span>订单管理</span>
                <span style="margin:0 5px;">/</span>
                <span @click="goback">订单列表</span>
                <span style="margin:0 5px;">/</span>
                <span style="font-weight: bold;">订单详情</span>
            </div>
            <div>
                <el-button type="primary" plain @click="goback">返回</el-button>
            </div>
        </div>

        <div style="background-color: white; padding: 25px;width: 100%;display: flex;">
            <div style="margin: 0 auto;" class="main-content">
                <div class="one">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>买家信息</div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">用户ID</div>
                            <el-input v-model="form.UserId" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">用户名字</div>
                            <el-input v-model="form.UserName" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">手机号</div>
                            <el-input v-model="form.UserPhone" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
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
                        <div>订单信息</div>
                    </div>

                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">订单编号</div>
                            <el-input v-model="form.OrderCode" disabled style="margin-bottom: 10px;width: 350px;">
                                <template #append>
                                    <el-button :icon="CopyDocument" @click="copyOrderCode(value)" />
                                </template></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">商品信息</div>
                            <el-input v-model="form.OrderDetailList.WaresName" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">创建订单时间</div>
                            <el-input v-model="form.OrderTimeStr" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">会员期限</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">总价</div>
                            <el-input v-model="form.OrderDetailList.TotalAmount" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div style="width: 48%;">
                            <div style="margin-bottom: 15px;">订单状态</div>
                            <div style="display: flex;align-items: center;background-color: #f5f7fa;width: 100%;height: 31px;
                                 border: 1px solid #e4e7ed;border-radius: 5px;">
                                <div :style="{ 'background-color': getStateColor(form.OrderStatus) }" class="stateIcon">
                                </div>
                                <div>{{form.OrderStatusText}}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="three">
                    <div class="title">
                        <div class="title-block"></div>
                        <div>支付信息</div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">支付来源</div>
                            <el-input v-model="form.PayChannel" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 15px;">支付交易编号</div>
                            <el-input v-model="form.PayCode" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">付款时间</div>
                            <el-input v-model="form.PayTimeStr" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <el-button type="danger" @click="refund()">退款</el-button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Search, CopyDocument } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
const router = useRouter()
const route = useRoute()

const goback = () => {
    router.back();
}


// const value = ref('241345647685687')
// //复制订单编号
// const copyOrderCode = (value) => {
//     // window.getSelection().selectAllChildren(val);
//     document.execCommand("Copy");
//     ElMessage({
//         showClose: true,
//         message: '成功复制订单编号',
//         type: 'success',
//     })
// }


const form = reactive({})
//接收路由传递过来的参数
console.log('订单传递过来', route);
form= route.query
console.log('表单数据form',form);

const getStateColor = (row) => {
    if (row == 0) {
        return "#0adf0a";
    } else if (row == 1) {
        return "orange";
    } else if (row == 2) {
        return "red";
    }
    else if (row == 3) {
        return "gray";
    }
    else if (row == 4) {
        return "gray";
    }
}

const getOrderStateText = (row) => {
    if (row == 0) {
        return "已完成";
    } else if (row == 1) {
        return "待付款";
    } else if (row == 2) {
        return "退款中";
    } else if (row == 3) {
        return "已关闭";
    } else if (row == 4) {
        return "已退款";
    }
}


//退款
const refund = () => {

}

</script>

<style lang="scss" scoped>
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
</style>