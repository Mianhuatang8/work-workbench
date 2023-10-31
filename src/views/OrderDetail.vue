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
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">用户名字</div>
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
                        <div>订单信息</div>
                    </div>

                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">订单编号</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;">
                                <template #append>
                                    <el-button :icon="CopyDocument"  @click="copyOrderCode(value)"/>
                                </template></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">商品信息</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 15px;">
                            <div style="margin-bottom: 10px;">创建订单时间</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 10px;">会员期限</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">总价</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 15px;">订单状态</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
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
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                        <div>
                            <div style="margin-bottom: 15px;">支付交易编号</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;margin-top: 15px;font-size: 15px;">
                        <div style="width: 48%;margin-right: 10px;">
                            <div style="margin-bottom: 15px;">付款时间</div>
                            <el-input v-model="value" disabled style="margin-bottom: 10px;width: 350px;"></el-input>
                        </div>
                    </div>
                    <el-button type="danger">退款</el-button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Search ,CopyDocument} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const goback = () => {
    router.back();
}
//复制订单编号
const copyOrderCode=(value)=>{
    ElMessage({
    showClose: true,
    message: '成功复制订单编号',
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
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