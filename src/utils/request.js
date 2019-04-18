
import axios from 'axios'

// 创建axios实例
axios.create({
  baseURL: 'http://127.0.0.1:8001', // api的base_url
  timeout: 5000 // 请求超时时间
})


// request拦截器
axios.interceptors.request.use(config => {
  //const token = localStorage.getItem("token")
  const token = "token0123";
  console.log(token)
  if(token){
    console.log("已获取到token")
    config.headers['Authorization'] = "bearer "+token // 让每个请求携带自定义token 请根据实际情况自行修改
  }else{
    console.log("未获取到token")
  }
  console.log("进入axios拦截器========" , config)
  return config;
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use((response) => {
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    const res = response.data
    if (res.code !== 20000) {
      //Message.error(res.message);
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      }
      return Promise.reject('error')
    } else {
      return response.data;
    }
  },
  error => {
    //console.log(error.response.data)
    if (error && error.response) {
      switch (error.response.data.status) {
        case 400:
          error.message = '请求失败，可能由于参数转换错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = (process.env.NODE_ENV === 'production' ? `目标资源路径不存在` : `目标资源路径不存在: ${error.response.config.url}`)
          break
        case 408:
          error.message = '请求超时'
          break
        case 429:
          error.message = '请求过于频繁，请稍后重试'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
      Message.error(error.message);
    }
    return Promise.reject(error)
  }
)
let baseUrl = 'http://localhost:8001'

//http://localhost:8001/user/list   user/list
export const postRequest = (url, params) => {
  console.log("post参数为:===" + params);
  return axios({
    method: 'post',
    url: 'http://localhost:8001'+`${url}`,
    data: params,
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    }
  });
}

export const reportListRequest = (url, params) => {
  console.log("post参数为:===" + params);
  return axios({
    method: 'post',
    url: 'http://localhost:8001'+`${url}`,
    data: {
      phone: params
    },
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    }
  });
}


const phone=""
const password =""
export const loginRequest = (url, {phone, password} ) => {
  console.log("post参数为:===" , phone, password);
  return axios({
    method: 'post',
    url: 'http://localhost:8001'+`${url}`,
    data: {
      phone : phone,
      password : password
    },
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    }
  });
}


export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: baseUrl+`${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url:
      +`${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url,params) => {
  return axios({
    method: 'delete',
    url: baseUrl+`${url}`,
    params:params,
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    }
  });
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    url: baseUrl +`${url}`,
    params: params,
    transformRequest: [function (params) {
      let ret = ''
      for (let it in params) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export default axios;
