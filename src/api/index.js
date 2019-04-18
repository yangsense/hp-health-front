import {postRequest, getRequest, loginRequest, reportListRequest} from "../utils/request";

//发送手机号验证码
export function reqSendCode (phone) {
  return getRequest("/sendcode/" + phone);
}

//通过手机号验证码登录
export function loginByCode (phone, code) {
  return postRequest("/login/code", {phone, code})
}

//用户密码登录
export function login(phone, password){
  return loginRequest("/login",{phone, password})
}

//根据token查询用户信息
export function getOperatorByToken (token) {
  return getRequest("/findoperator/" + token)
}

//查询报告列表
export function getReportList(phone){
  return reportListRequest("/report/list", phone);
}

//查询报告详情(studyAccnumber)
export const getReportDetail = (studyAccnumber) =>{
  return getRequest("/report/detail/" + studyAccnumber)
}

//查询报告影像
export function showReportImage (accnumber) {
  return getRequest("/report/reportserieslist/" + accnumber)
}
