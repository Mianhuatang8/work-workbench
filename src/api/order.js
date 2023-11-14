import request from "../request";


//分页查询订单列表
export function getOrderList(data){
    return request({
        url: '/app/admin/order/getbypage',
        method: 'post',
        data:data
    })
}


//根据id查询订单信息
export function getOrderInfoById(id){
    return request({
        url:'/app/admin/order/getbyid',
        method:'post',
        data:id
    })
}
