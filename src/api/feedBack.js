import request from "../request"

const commonUrl = 'http://www.caotanghuali.com:9003/app/admin'

//分页查询反馈信息列表
export function getFeedBackList(searchForm){
    return request({
        url: `${commonUrl}/feedback/getbypage`,
        method: 'post',
        data:searchForm
    })
}

//根据id查询反馈列表
export function getListById(id){
    return request({
        url:`${commonUrl}/feedback/getbyid`,
        method:'post',
        data:id
    })
}

//关闭反馈
export function closeFeedBack(id){
    return request({
        url:`${commonUrl}/feedback/close`,
        method:'post',
        data:id
    })
}

//导出excel
export function exportExcel(data){
    return request({
        url:`${commonUrl}/feedback/exportexcel`,
        method:'post',
        data:data
    })
}

//完成反馈
export function finishFeedBack(id){
    return request({
        url:`${commonUrl}/feedback/complete`,
        method:'post',
        data:id
    })
}


//获取平台内容/问题类型选择项
export function getSelectionType(code){
    return request({
        url:`${commonUrl}/dictionary/getaidicitembytype`,
        method:'post',
        data:code
    })
}