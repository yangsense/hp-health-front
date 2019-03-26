import {postRequest, getRequest, loginRequest} from "../utils/request";

//用户密码登录
export function login(phone, password){
  return loginRequest("/login",{phone, password})
}

//查询报告列表
export function getReportList(phone){
  return postRequest("/report/list", phone);
}

//查询报告详情(studyAccnumber)
export const getReportDetail = (studyAccnumber) =>{
  return getRequest("/report/detail/" + studyAccnumber)
}

//查询用户列表
export function getUserList(name) {
  return getRequest("/user/list", name);
}
