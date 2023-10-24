<template>
    <div class="Container" style="padding: 17px 44px;overflow: auto;">

        <div style="margin-bottom: 30px; font-size: 17px;">
            <span>社区管理</span>
            <span style="margin:0 5px">/</span>
            <!-- {{ router.currentRoute.query.CollName ? router.currentRoute.query.CollName : '文章' }} -->
            <span @click="goback" style="cursor: pointer;">文章</span>
            <span style="margin:0 5px;font-weight: bold;">/{{ this.$route.query.data ? '编辑文章' : '新增图文' }}</span>
        </div>

        <div class="articleInfoBox">
            <div class="title">基础信息</div>

            <div style="display: flex;margin-left: 60px;">
                <el-form label-width="80px" ref="addForm" :model="addForm" label-position="left" :rules="rules">

                    <el-form-item label="名称" prop="title">
                        <el-input style="width:360px" v-model="addForm.title"></el-input>
                    </el-form-item>


                    <el-form-item label="封面" prop="cover" style="position: relative;">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" style="  border: 1px dashed #d9d9d9;margin-bottom: 40px;"
                            :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview">
                            <img v-if="addForm.cover" :src="addForm.cover" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <div class="el-upload__tip">建议小于20M的JPG、PNG格式图片</div>
                    </el-form-item>

                    <el-form-item label="合辑分类" prop="collectId">
                        <el-select placeholder="请选择" v-model="addForm.collectId">
                            <el-option v-for="item in collectionList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button type="text" @click="goAddCollect" style="margin-left: 15px;">新建分类</el-button>
                    </el-form-item>

                    <el-form-item label="描述词">
                        <el-input style="width:360px" v-model="addForm.title"></el-input>
                    </el-form-item>


                    <el-form-item label="图文详情" style="width:770px" required prop="content">
                        <div style="display:flex">
                            <div id="editor—wrapper">
                                <div id="toolbar-container"></div>
                                <div id="editor-container"><!-- 编辑器 --></div>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item style="display: flex;flex-direction: row-reverse;">
                        <el-button type="primary" @click="publishArticle(0)">{{ route.query.data ? '提交' : '发布'}}</el-button>
                        <el-button plain @click="publishArticle(1)" v-if="!route.query.data">保存为草稿</el-button>
                        <el-button plain @click="empty">清空</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </div>


    </div>
</template>
    
<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const state = ref('add')
const addForm = ref({
    title: null,
    cover: null,
    labels: [],
    content: null,
    draft: null,
    audit: 0,
    collectId: null,
})

var validateContent = (rule, value, callback) => {
    // console.log(this, "this.addForm.content");
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

</script>
    
<style lang="scss" scoped>
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

.avatar-uploader {
    display: flex;
    flex-direction: column;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}


.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
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

.articleInfoBox .el-upload__tip {
    margin-top: -15px;
    color: #BFBFBF;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    bottom: 8px;
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
</style>