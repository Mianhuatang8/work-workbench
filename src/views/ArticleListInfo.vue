<template>
    <div class="Container" style="padding: 17px 44px;overflow: auto;">

        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>社区管理</span>
            <span style="margin:0 5px">/</span>
            <!-- {{ router.currentRoute.query.CollName ? router.currentRoute.query.CollName : '文章' }} -->
            <span @click="goback" style="cursor: pointer;">文章</span>
            <span style="margin:0 5px;">/</span>
            <span style="font-weight: bold;"> {{ route.query.type == 'add' ? '新增文章' : route.query.type ==
                'edit' ? '编辑文章' : '查看文章' }}</span>
        </div>

        <div class="articleInfoBox">
            <div class="title">基础信息</div>

            <div style="display: flex;margin-left: 60px;">
                <el-form label-width="80px" ref="addForm" :model="addForm" label-position="left" :rules="rules">

                    <el-form-item label="标题" prop="title">
                        <el-input style="width:360px" v-model="addForm.title"
                            :disabled="route.query.type == 'look'"></el-input>
                    </el-form-item>
                    <el-form-item label="描述词">
                        <el-input style="width:360px" v-model="addForm.desc" autosize
                            :disabled="route.query.type == 'look'"></el-input>
                    </el-form-item>

                    <el-form-item label="封面" prop="cover" style="position: relative;">
                        <el-upload class="avatar-uploader" :show-file-list="false"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview"
                            v-if="route.query.type != 'look'">

                            <!-- :http-request="uploadFile" action="#"-->
                            <img v-if="addForm.cover" :src="addForm.cover" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                            <template #tip>
                                <div class="el-upload__tip">
                                    <div class="el-upload__tip">建议小于20M的JPG、PNG格式图片</div>

                                </div>
                            </template>
                            <!-- <div class="el-upload__tip">建议小于20M的JPG、PNG格式图片</div> -->
                        </el-upload>
                        <div v-else style="display: flex;flex-wrap: wrap;">
                            <img :src="addForm.cover" style="width: 146px; height: 146px;border-radius: 7px;">
                        </div>

                    </el-form-item>
                    <el-form-item label="图文详情" style="width:770px" required prop="content">
                        <div style="display:flex">
                            <div id="editor—wrapper">
                                <!-- <div id="toolbar-container"></div> -->
                                <div id="editor-container">
                                    <!-- 富文本编辑器 -->
                                </div>
                                <el-input id="in" type="hidden"></el-input><!--绑定输入--editor输入的绑定到这个里-->
                            </div>
                        </div>


                    </el-form-item>

                    <el-form-item style="display: flex;flex-direction: row-reverse;">
                        <el-button plain @click="empty" v-if="route.query.type != 'look'">清空</el-button>
                        <el-button plain @click="publishArticle(1)" v-if="route.query.type == 'add'">保存为草稿</el-button>
                        <el-button type="primary" @click="publishArticle(0)" v-if="route.query.type != 'look'">{{
                            route.query.type == 'edit' ? '提交' : '发布'
                        }}</el-button>
                        <el-button plain v-if="route.query.type == 'look'" @click="router.back()">返回</el-button>
                        <el-button @click="gotoEdit()" v-if="route.query.type == 'look'" type="primary">去编辑</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </div>


    </div>
</template>
    
<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import EWangEditor from "wangeditor";
//富文本编辑器
// import Vue3Tinymce from '@jsdawn/vue3-tinymce';

import $ from 'jquery'
const router = useRouter()
const route = useRoute()
console.log('1111', route.query);

// const textState = reactive({
//     content: 'hello vue3-tinymce!',
//     // editor 配置项
//     setting: {
//         height: 400 // editor 高度
//     }
// });
let TxtHtml;

const state = ref('add')
const addForm = ref({
    title: '',
    desc: '',
    cover: null,
    labels: [],
    content: null,
    draft: null,
    audit: 0,
    collectId: null,
})

var validateContent = (rule, value, callback) => {
    if (TxtHtml != "<p><br></p>") {
        callback();
    } else {
        callback(new Error("请输入内容"));
    }
};
const rules = ref({
    title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
    collectId: [{ required: true, message: "请选择合辑", trigger: "blur" }],
    cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
    content: [{ validator: validateContent, trigger: "blur" }],
})
const inputVisible = ref(false)
const inputValue = ref('')
const imageUrl = ref('')
const collectionList = ref([])


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
//上传图片发起请求
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
            // this.addForm.cover = url;
        },
    });
    addForm.cover = json[0];
    console.log(json);
}


//发布文章/保存为草稿
const publishArticle = async (val) => {
    if (route.query.type == 'add' && Number(val) == 0) {
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
            message: '保存成功',
            type: 'success',
        })
        router.push({
            path: '/communityManage/articleList'
        })
    }
    if (Number(val)) {
        ElMessage({
            message: '提交成功',
            type: 'success',
        })
        router.push({
            path: '/communityManage/articleList'
        })

    }
}

//去编辑
const gotoEdit = () => {
    router.push({
        path: "/articleListInfo",
        query: {
            type: 'edit'
        }
    });
}


// onMounted(() => {
//     TxtHtml = null;
//     // this.getCollectionList();
//     // this.getArticleInfo();
//     const { createEditor, createToolbar } = window.wangEditor;
//     const editorConfig = ref({
//         placeholder: "请输入",
//         onChange(editor) {
//             console.log(editor, "12321321");
//             const html = editor.getHtml();
//             TxtHtml = html;
//         },

//         MENU_CONF: {},
//     })

//     editorConfig.MENU_CONF["uploadImage"] = {
//         server: "#",
//         // 自定义上传
//         async customUpload(file, insertFn) {
//             console.log(file, insertFn, "file, insertFn");
//             let url;
//             let formData = new FormData();
//             formData.append("fil1", file);
//             $.ajax({
//                 url: "https://3dapi.shixianjia.com/api/file/upload",
//                 type: "POST",
//                 contentType: false,
//                 processData: false,
//                 async: false,
//                 headers: {
//                     token:
//                         "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
//                 },
//                 data: formData,
//                 success: function (data) {
//                     url = JSON.parse(data.Data);
//                     console.log(url[0]);
//                     insertFn(url[0]);
//                 },
//             });
//         },
//     };

//     editorConfig.MENU_CONF["uploadVideo"] = {
//         // 上传视频的配置
//         server: "#",
//         async customUpload(file, insertFn) {
//             console.log(file, insertFn, "file, insertFn");
//             let url;
//             let formData = new FormData();
//             formData.append("fil1", file);
//             $.ajax({
//                 url: "https://3dapi.shixianjia.com/api/file/upload",
//                 type: "POST",
//                 contentType: false,
//                 processData: false,
//                 async: false,
//                 headers: {
//                     token:
//                         "F45BD6CCB4BF39394DDC58F8C4B125D5271D9A11D4B1E9BB67F53FDBFB1A547B",
//                 },
//                 data: formData,
//                 success: function (data) {
//                     url = JSON.parse(data.Data);
//                     console.log(url[0]);
//                     insertFn(url[0]);
//                 },
//             });
//         },
//     };

//     setTimeout(() => {
//         const editor = createEditor({
//             selector: "#editor-container",
//             html: TxtHtml1 ? TxtHtml1 : "<p><br></p>",
//             config: editorConfig,
//             mode: "default", // or 'simple'
//         });

//         const toolbar = createToolbar({
//             editor,
//             selector: "#toolbar-container",
//             config: toolbarConfig,
//             mode: "default", // or 'simple'
//             editorConfig: editorConfig,
//             insertKeys: {
//                 keys: ["uploadAttachment"], // 查看名称
//             },
//         });
//     }, 1);
//     /* 工具栏... */
//     const toolbarConfig = {
//         toolbarKeys: [
//             "undo",
//             "redo",
//             "justifyCenter",
//             "justifyLeft",
//             "justifyRight",
//             "uploadImage",
//             "uploadVideo",
//         ],
//     };




// })



//


let data = reactive({});
onMounted(() => {
    let editor = new EWangEditor("#editor-container");
    editor.config.uploadImgShowBase64 = true;
    editor.config.onchangeTimeout = 400;

    editor.config.customAlert = (err) => {
        console.log(err);

    };
    editor.customConfig = editor.customConfig
        ? editor.customConfig
        : editor.config;

    editor.customConfig.onchange = (html) => {
        data.editorContent = html;
        document.getElementById('in').value = html;
        console.log(html);

    };
    //以下为新增
    const menuItem = [  //工具栏里有哪些工具
        'undo',  //撤销
        'redo', //恢复
        'justify',  // 对齐方式
        'image',  //插入图片
        'video',  //插入视频
    ];

    editor.config.menus = [...menuItem]; /* 应用设置好的工具栏 */

    // editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf"];  /* 文字颜色、背景色可以选择哪些颜色? */

    // editor.config.fontNames = [ /* 字体工具提供哪些字体? */
    //     "黑体",
    //     "仿宋",
    //     "楷体",
    //     "标楷体",
    //     "华文仿宋",
    //     "华文楷体",
    //     "宋体",
    //     "微软雅黑",
    // ];
    editor.config.height = 337;  //你可能发现这个编辑器是没法用样式调高度的?


    editor.customConfig.customUploadImg = function (files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        // 在这里进行一系列的校验
        const formData = new FormData();
        formData.append("file", files[0]);
        // axios.post('http://localhost:8080/itkb/square/article/uploadArticleImage', formData, {
        //     'Content-type': 'multipart/form-data'
        // }).then(res => {
        //     // 上传成功后的处理
        //     // 上传代码返回结果之后，将图片插入到编辑器中
        //     insert(res.data)

        // }, err => {
        //     // 出现错误时的处理
        //     console.log('上传图片失败' + err.data)
        // })
    }
    //新增至此
    editor.create();

});
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

// .articleInfoBox .el-upload__tip {
//     margin-top: -15px;
//     color: #BFBFBF;
//     font-size: 12px;
//     font-weight: 400;
//     position: absolute;
//     bottom: 8px;
// }

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
    height: 297px;
    z-index: 10000;
}
</style>