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

//查询报告影像
export function showReportImage (accnumber) {
  return getRequest("/report/reportserieslist/" + accnumber)
}
