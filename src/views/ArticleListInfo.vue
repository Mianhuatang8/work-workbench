<template>
    <div class="Container" style="padding: 17px 44px;overflow: auto;">
        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>社区管理</span>
            <span style="margin:0 5px">/</span>
            <span @click="goback" style="cursor: pointer;">文章</span>
            <span style="margin:0 5px;">/</span>
            <span style="font-weight: bold;"> {{ route.query.type == 'add' ? '新增文章' : route.query.type == 'edit' ? '编辑文章' : '查看文章'
            }}</span>
        </div>

        <div class="articleInfoBox">
            <div class="title">基础信息</div>
            <div style="display: flex;margin-left: 60px;">

                <el-form label-width="80px" ref="articleFormRef" :model="addForm" label-position="left" :rules="rules">
                    <el-form-item label="标题" prop="title">
                        <el-input style="width:360px" v-model="addForm.Title"
                            :disabled="route.query.type == 'look'"></el-input>
                    </el-form-item>
                    <el-form-item label="描述词">
                        <el-input style="width:360px" v-model="addForm.desc" autosize
                            :disabled="route.query.type == 'look'"></el-input>
                    </el-form-item>

                    <el-form-item label="封面" prop="CoverPic" style="position: relative;">
                        <el-upload class="avatar-uploader" :show-file-list="false" action="#" :http-request="uploadFile"
                            :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview"
                            :on-change="handleAvatarChange" v-if="route.query.type != 'look'">
                            <img v-if="addForm.CoverPic" :src="addForm.CoverPic" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                            <template #tip>
                                <div class="el-upload__tip">
                                    <div class="el-upload__tip">建议小于20M的JPG、PNG格式图片</div>
                                </div>
                            </template>
                        </el-upload>

                        <div v-else style="display: flex;flex-wrap: wrap;">
                            <img :src="addForm.CoverPic" style="width: 146px; height: 146px;border-radius: 7px;">
                        </div>
                    </el-form-item>

                    <el-form-item label="图文详情" style="width:770px" prop="content">
                        <div v-if="route.query.type != 'look'">
                            <div style="width:600px">
                                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                                    :defaultConfig="toolbarConfig" :mode="mode" />
                                <Editor style="height: 400px; overflow-y: hidden;" v-model="addForm.MainContent"
                                    :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                            </div>
                        </div>

                        <!-- 查看 -->
                        <div v-else style="width: 100%; background-color: #f5f7fa;
                             min-height: 300px;overflow-y: scroll;display: flex;flex-wrap: wrap;">
                            <!-- <img :src="form.detailImgSrc" style="width: 200px;height: 200px;margin: 0 auto;margin-top: 10px;"> -->
                            <!-- <div style="line-height: 20px;padding: 15px;">{{ addForm.detailText }}</div> -->
                            <div v-html="addForm.MainContent"></div>

                        </div>

                    </el-form-item>

                    <el-form-item style="display: flex;flex-direction: row-reverse;">
                        <el-button plain @click="empty" v-if="route.query.type != 'look'">清空</el-button>
                        <el-button plain @click="temporaryArticle()" v-if="route.query.type == 'add'">保存为草稿</el-button>
                        <el-button type="primary" @click="publishArticle()" v-if="route.query.type != 'look'">{{
                            route.query.type == 'edit' ? '提交' : '发布'
                        }}</el-button>
                        <el-button plain v-if="route.query.type == 'look'" @click="goToList()">返回</el-button>
                        <el-button @click="gotoEdit()" v-if="route.query.type == 'look'" type="primary">去编辑</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </div>


    </div>
</template>
    
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ref, reactive, onMounted, onBeforeUnmount, shallowRef, } from "vue"
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import $ from 'jquery'

const router = useRouter()
const route = useRoute()
console.log('1111', route.query);
//当前路由传递过来的参数-类型type
// const currentType = ref('')
// currentType.value = route.query.type

const addForm = reactive({
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
    // title: '你好啊',
    // desc: '12345',
    // cover: '',
    // labels: [],
    // content: null,
    // draft: null,
    // audit: 0,
    // collectId: null,
    // detailText: '',
    // valueHtml: ""
})
addForm=route.query

const articleFormRef = ref(null)
var validateContent = (rule, value, callback) => {
    if (addForm.valueHtml != "<p><br></p>") {
        callback();
    } else {
        callback(new Error("请输入内容"));
    }
};
const rules = ref({
    title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
    collectId: [{ required: true, message: "请选择合辑", trigger: "blur" }],
    cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
    content: [{ required: true, validator: validateContent, trigger: "blur" }],
})

const goback = () => {
    router.back();
}
//限制图片的上传格式和大小
const beforeAvatarUpload = (file) => {
    console.log(file);
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 20;

    if (!isJPG) {
        this.$message.error("上传封面图片只能是 JPG、PNG 格式!");
    }
    if (!isLt2M) {
        this.$message.error("上传封面大小不能超过 20MB!");
    }
    return isJPG && isLt2M;
}
//预览图片
const handlePictureCardPreview = (file) => {
    console.log(file);
}
//上传图片
const uploadFile = (file) => {
    let json;
    addForm.cover = null;
    let formData = new FormData();
    formData.append("fil1", file.file);
    $.ajax({
        url: "https://3dapi.shixianjia.com/api/file/upload",
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        headers: {
            token:
                "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
        },
        data: formData,
        success: function (data) {
            console.log(data.Data, 8888);
            let url = JSON.parse(data.Data);
            json = url;
            // addForm.cover = url;
        },
    });
    addForm.cover = json[0];
    console.log('json[0]', json[0]);
    console.log(addForm.cover);
    console.log('点击上传图片', addForm);
}
const handleAvatarChange = (file, filelist) => {
    addForm.cover = URL.createObjectURL(file.raw);
}

//保存为草稿
const temporaryArticle = () => {
    ElMessage({
        message: '保存成功',
        type: 'success',
    })
    router.push({
        path: '/communityManage/articleList'
    })
}
//发布文章或提交对文章的修改
const publishArticle = async () => {
    articleFormRef.value.validate((valid, fields) => {
        if (valid) {
            if (route.query.type == 'add') {
                ElMessage({
                    message: '发布成功',
                    type: 'success',
                })
                router.push({
                    path: '/communityManage/articleList'
                })
            }
            if (route.query.type == 'edit') {
                ElMessage({
                    message: '提交成功',
                    type: 'success',
                })
                router.push({
                    path: '/communityManage/articleList'
                })
            }
        }
        else {
            console.log('error submit!', fields)
            return false
        }

    })



}

//去编辑
const gotoEdit = () => {
    // currentType.value = 'edit'
    router.push({
        path: "/articleListInfo",
        query: {
            type: 'edit'
        }
    });
}
const goToList = () => {
    router.push({
        path: '/communityManage/articleList'
    })
}


// 编辑器实例
const editorRef = shallowRef()
//模式
const mode = ref('simple')

// // 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })

//工具栏
const toolbarConfig = {
    toolbarKeys: [
        "undo",
        "redo",
        "justifyCenter",
        "justifyLeft",
        "justifyRight",
        "uploadImage",
        "uploadVideo",
    ]
}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
}


editorConfig.MENU_CONF['uploadImage'] = {
    server: "#",
    // 自定义上传
    async customUpload(file, insertFn) {
        console.log(file, "file");
        console.log(insertFn, 'insertFn');
        let url;
        let formData = new FormData();
        formData.append("fil1", file);
        $.ajax({
            url: "https://3dapi.shixianjia.com/api/file/upload",
            type: "POST",
            contentType: false,
            processData: false,
            async: false,
            headers: {
                token:
                    "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
            },
            data: formData,
            success: function (data) {
                url = JSON.parse(data.Data);
                console.log(url[0]);
                insertFn(url[0]);
            },
        });
    },
}
editorConfig.MENU_CONF['uploadVideo'] = {
    // 上传视频的配置
    server: "#",
    async customUpload(file, insertFn) {
        console.log(file, insertFn, "file, insertFn");
        let url;
        let formData = new FormData();
        formData.append("fil1", file);
        $.ajax({
            url: "https://3dapi.shixianjia.com/api/file/upload",
            type: "POST",
            contentType: false,
            processData: false,
            async: false,
            headers: {
                token:
                    "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
            },
            data: formData,
            success: function (data) {
                url = JSON.parse(data.Data);
                console.log(url[0]);
                insertFn(url[0]);
            },
        });
    },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例
}

</script>
    
<style lang="less" scoped>
.articleInfoBox {
    width: 100%;
    background-color: #fff;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 15px
}

.articleInfoBox .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    margin-left: 15px;
}

:deep(.avatar-uploader .el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

:deep(.avatar-uploader .el-upload:hover) {
    border-color: #409EFF;
}

:deep(.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

:deep(.avatar) {
    width: 178px;
    height: 178px;
    display: block;
}


#editor—wrapper {
    border: 1px solid #ccc;
    z-index: 100;
    /* 按需定义 */
}

#toolbar-container {
    border-bottom: 1px solid #ccc;
    background-color: #ccc;
}

#editor-container {
    height: 378px;
    width: 764px;
}

.w-e-toolbar {
    background-color: #ccc;
}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.el-popover {
    min-width: 60px;
    padding: 8px;
}

.articleInfoBox .el-descriptions__body .el-descriptions__table {
    display: flex;
    flex-direction: column;
}

.articleInfoBox .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
    padding-bottom: 37px;
}

.articleInfoBox .el-descriptions-item__label:not(.is-bordered-label) {
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.45);
}

.articleInfoBox .el-descriptions-item__container .el-descriptions-item__content {
    width: 600px;
}

.TxtHtml img {
    max-width: 600px;
}

:deep(.w-e-text-container) {
    border: 1px solid #dcdfe6;
    border-top: none;
    z-index: 10000;
}
</style>