import { data } from "jquery";
import request from "../request";

const commonUrl = 'http://localhost:5233/app/admin'

//添加/修改用户信息
export function editUserInfo(data){
    return request({
        url:`${commonUrl}/UserInfo/AdminAddOrUpdateMyUserInfo`,
        method:'post',
        data:data
    })
}

//用户自身操作变化
export function userSelfChange(data){
    return request({
        url:`${commonUrl}//UserInfo/UserUpdateMyUserInfo`,
        method:'post',
        data:data
    })
}

//删除用户信息
export function delUserInfo(userCode){
    return request({
        url:`${commonUrl}/UserInfo/DeleteMyUserInfo`,
        method:'post',
        data:userCode
    })
}

//查询单个或全部用户信息
export function searchSomeUser(data){
    return request({
        url:`${commonUrl}//UserInfo/GetMyUserInfoList`,
        method:'post',
        data:data
    })
}


//查询角色信息
export function searchRoleInfo(data){
    return request({
        url:`${commonUrl}/MyRole/GetMyRoleList`,
        method:'post',
        data:data
    })
}

//新增角色信息
export function addRoleInfo(data){
    return request({
        url:`${commonUrl}/MyRole/AddMyRole`,
        method:'post',
        data:data
    })
}

//修改角色信息
export function editRoleInfo(data){
    return request({
        url:`${commonUrl}/MyRole/UpdateMyRole`,
        method:'post',
        data:data
    })
}

//删除角色信息
export function delRoleInfo(roleCode){
    return request({
        url:`${commonUrl}/MyRole/DeleteMyRole`,
        method:'post',
        data:roleCode
    })
}

//获取全部角色信息
export function getAllRole(data){
    return request({
        url:`${commonUrl}/MyRole/GetAllRole`,
        method:'post',
        data:data
    })

}