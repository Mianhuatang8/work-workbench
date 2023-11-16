import request from "../request/index2";

//文章列表
//获取文章列表信息
export function getArticleList(data){
    return request({
        url:'/app/admin/content/queryalllist',
        method:'post',
        data:data
    })
}

//删除文章
export function delArticle(data){
    return request({
        url:'/app/admin/content/batchdeletecontent',
        method:'post',
        data:data
    })
}
