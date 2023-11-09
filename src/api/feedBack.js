import request from "../request"

const commonUrl = 'http://www.caotanghuali.com:9002/app/admin'

//分页查询反馈信息列表
export function getFeedBackList(limit){
    return request({
        url: `${commonUrl}/feedback/getbypage`,
        methods: 'post',
        data:limit
    })
}

//根据id查询反馈列表
export function getListById(id){
    return request({
        url:`${commonUrl}/feedback/getbyid`,
        methods:'post',
        data:id
    })
}

//关闭反馈
export function closeFeedBack(id){
    return request({
        url:`${commonUrl}/feedback/close`,
        methods:'post',
        data:id
    })
}

//导出excel
export function exportExcel(data){
    return request({
        url:`${commonUrl}/feedback/exportexcel`,
        methods:'post',
        data:data
    })
}

//完成反馈
export function finishFeedBack(id){
    return request({
        url:`${commonUrl}/feedback/complete`,
        methods:'post',
        data:id
    })
}