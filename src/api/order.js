import request from "../request";

const commonUrl = 'http://www.caotanghuali.com:9002/app/admin'

//分页查询订单列表
export function getOrderList(data){
    return request({
        url: `${commonUrl}/order/getbypage`,
        methods: 'post',
        data:data
    })
}


//根据id查询订单信息
export function getOrderInfoById(id){
    return request({
        url:`${commonUrl}/order/getbyid`,
        methods:'post',
        data:id
    })
}
