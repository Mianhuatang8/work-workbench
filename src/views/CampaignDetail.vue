<template>
    <!-- <div class="Container" style="padding:22px;height: calc(100% - 64px);"> -->

    <div class="Container2" style="padding:30px">
        <!-- 1-设计竞选详情标题 -->
        <div v-show="Number(detailData.status) == 0 || Number(detailData.status) == 1"
            style="display: flex;align-items:center;">
            <img src="../assets/img/email.png" style="width: 40px;height: 40px;">
            <span style="margin-left: 20px;font-size:17px;">设计竞选详情</span>
        </div>

        <div style="padding: 20px;  background-color: white; margin-top: 30px;">

            <!-- 2-竞选id等内容 -->
            <ul v-show="Number(detailData.status) == 1" style="margin-top:30px;padding: 0;">
                <li style="list-style: none;margin-top: 15px;">
                    <span style="font-weight: bold;margin-right: 20px;font-size: 14px">竞选ID：</span>
                    <span style="margin-right: 20px;">xxxxxx</span>
                </li>
                <li style="list-style: none;margin-top: 15px;">
                    <span style="margin-right: 20px;margin-right: 20px;font-size: 14px">提交时间：</span>
                    <span style="font-size: 14px">2020-10-10</span>
                </li>
                <li style="list-style: none;margin-top: 15px;">
                    <span style="font-weight: bold;margin-right: 20px;font-size: 14px">订单状态:</span>
                    <span style="font-size: 14px">未支付</span>
                </li>
            </ul>

            <ul v-show="Number(detailData.status) == 0" style="margin-top:30px;padding: 0;font-size: 14px;">
                <li style="list-style: none;margin-top: 15px;">
                    <span style="font-weight: bold;margin-right: 20px;">竞选ID：</span>
                    <span style="margin-right: 30px;">xxxxxx</span>
                    <span style="margin-right: 20px;">提交时间：</span>
                    <span>2020-10-10</span>
                </li>
                <li style="list-style: none;margin-top: 15px;">
                    <span style="font-weight: bold;margin-right: 20px;">订单状态:</span>
                    <span style="margin-right: 20px;">待支付</span>
                    <span style="color: red;font-weight: bold;">08:00:00</span>
                </li>
            </ul>

            <div v-show="Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4"
                style="display: flex;align-items: center">
                <img src="../assets/img/email.png" style="width: 40px;height: 40px;">
                <span style="margin-left: 20px;font-size:17px;">设计竞选详情</span>
                <ul style="padding: 0;display: flex;margin-left: 60px; font-size: 14px;">
                    <li style="list-style: none;margin-right: 30px;">
                        <span style="font-weight: bold;margin-right: 20px;">竞选ID：</span>
                        <span>xxxxxx</span>
                    </li>
                    <li style="list-style: none;margin-right: 30px;">
                        <span style="margin-right: 20px;">提交时间：</span>
                        <span>2020-10-10</span>
                    </li>
                    <li style="list-style: none;margin-right: 30px;">
                        <span style="font-weight: bold;margin-right: 20px;">订单状态:</span>
                        <span>进行中</span>
                    </li>
                </ul>
            </div>


            <!-- 设计竞选状态 -->
            <div v-show="Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4"
                style="margin-top: 30px;margin-left: 50px;font-size: 14px;">
                <span style="font-weight:bold;font-size:15px;">设计竞选进行状态</span>
                <!-- 步骤条 -->
                <el-steps :active="Number(detailData.status) + 1" align-center style="margin-top: 25px;width:1000px;">
                    <el-step>
                        <template #description>
                            <div style="font-size: 15px;color: black;font-weight: bold;margin-top: 13px;">用户已发布</div>
                            <div style="font-size: 13px;color: gray;margin-top: 5px;">已确认</div>
                            <div style="font-size: 13px;color: gray;">2022-09-09 12:00:00</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template #description>
                            <div style="font-size: 15px;color: black;font-weight: bold;margin-top: 13px;">设计师进行</div>
                            <div style="font-size: 13px;color: gray;margin-top: 5px;">已完成</div>
                            <div style="font-size: 13px;color: gray;">2022-09-09 12:00:00</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template #description>
                            <div style="font-size: 15px;color: black;font-weight: bold;margin-top: 13px;">上传设计方案</div>
                            <div v-show="Number(detailData.status) == 2"
                                style="font-size: 13px;color: red;font-weight: bold;margin-top: 5px;">02:59:57</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template #description>
                            <div style="font-size: 15px;color: black;font-weight: bold;margin-top: 13px;">业主评选</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template #description>
                            <div style="font-size: 15px;color: black;font-weight: bold;margin-top: 13px;">完成</div>
                        </template>
                    </el-step>
                </el-steps>
            </div>

            <!-- 3-竞选业主信息与竞选设置 -->
            <div v-show="Number(detailData.status) == 1 || Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4"
                style="margin-top:50px;">
                <span style="font-weight:bold;font-size:15px;">竞选业主信息</span>
                <div style="margin-top:30px;margin-left:30px;font-size: 14px;">
                    <ul style="padding: 0;display:flex">
                        <li style="list-style: none;margin-right:40px;width: 160px;">
                            <span>用户ID：</span>
                            <span>xxxxxx</span>
                        </li>
                        <li style="list-style: none;width: 200px;">
                            <span>昵称：</span>
                            <span>xxx</span>
                        </li>
                    </ul>
                    <ul style="padding: 0;margin-top:20px;display:flex">
                        <li style="list-style: none;margin-right:40px;width: 160px;">
                            <span>联系人：</span>
                            <span>xxx</span>
                        </li>
                        <li style="list-style: none;width: 200px;">
                            <span>联系电话：</span>
                            <span>11111111111</span>
                        </li>
                    </ul>
                </div>
            </div>


            <div v-show="Number(detailData.status) == 0" style="margin-top:50px;">
                <span style="font-weight:bold;font-size:15px;">竞选业主信息</span>
                <div style="margin-top:30px;margin-left:30px; font-size: 14px;">
                    <ul style="padding: 0;display:flex">
                        <li style="list-style: none;margin-right:40px;width: 160px;">
                            <span>用户ID：</span>
                            <span>xxxxxx</span>
                        </li>
                        <li style="list-style: none;width: 200px;">
                            <span>昵称：</span>
                            <span>xxx</span>
                        </li>
                    </ul>
                    <ul style="padding: 0;margin-top:20px;display:flex">
                        <li style="list-style: none;margin-right:40px;width: 160px;">
                            <span>联系人：</span>
                            <span>xxx</span>
                        </li>
                        <li style="list-style: none;width: 200px;">
                            <span>联系电话：</span>
                            <span>11111111111</span>
                        </li>
                        <li style="list-style: none;width: 200px;">
                            <span>是否接受异地设计：</span>
                            <span>是</span>
                        </li>
                        <li style="list-style: none;width: 270px;">
                            <span>显房时间：</span>
                            <span>2023年10月10日 16:00</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div style="margin-top:50px;">
                <span style="font-weight:bold;font-size:15px;">设计竞选设置</span>
                <div style="margin-top:30px;margin-left:30px; font-size: 14px;">
                    <ul style="padding: 0;display:flex;justify-content: space-between;width:800px;">
                        <li style="list-style: none;">
                            <span style="margin-right: 20px;">最大参与人数：</span>
                            <span>xxxxxx</span>
                        </li>
                        <li style="list-style: none;">
                            <span style="margin-right: 20px;">设计师投稿时间：</span>
                            <span>48小时（两天）</span>
                        </li>
                        <li style="list-style: none;">
                            <span style="margin-right: 20px;">竞选结果：</span>
                            <span>不公开</span>
                        </li>
                        <li style="list-style: none;">
                            <span style="margin-right: 20px;">竞选奖金：</span>
                            <span>199元</span>
                        </li>
                    </ul>
                </div>
                <div style="margin-top:20px;margin-left:30px; display: flex;font-size: 14px;">
                    <span style="margin-right: 20px;">竞选奖金分配规则：</span>
                    <ul style="padding: 0;margin: 0;">
                        <li style="list-style: none;margin-bottom:5px;">第1名获得竞选奖金的50%;</li>
                        <li style="list-style: none;margin-bottom:5px;">第2名获得竞选奖金的30%;</li>
                        <li style="list-style: none;margin-bottom:5px;">第3名获得竞选奖金的15%;</li>
                        <li style="list-style: none;margin-bottom:5px;">其他参与者平分竞选奖金的5%;</li>
                        <li style="list-style: none;margin-bottom:5px;">业主未评选，所有参与者平分奖金</li>
                    </ul>

                </div>
            </div>
            <!-- 需求详情与设计师 -->
            <DesignCommandDesigner
                v-show="Number(detailData.status) == 2 || Number(detailData.status) == 3 || Number(detailData.status) == 4"
                :status="detailData.status"></DesignCommandDesigner>
        </div>
        <!-- </div> -->


    </div>
</template>

<script setup>
import DesignCommandDesigner from './DesignCommandDesigner.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

console.log('路由跳转传递过来的参数', route);

const detailData = ref([])
detailData.value = route.query
console.log('this.detailData', detailData.value);

</script>

<style></style>