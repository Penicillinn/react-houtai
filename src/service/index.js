import axios from 'axios';
import { message} from 'antd';
export default function request(config) {
    const instance = axios.create({
        // baseURL: 'http://admintest.happymmall.com'
    })

    //响应拦截器
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        if(response.data.status === 1) {
            message.error(response.data.msg)
        }else if(response.data.status === 10) {
            message.warning('请登录')
            window.location.href = '/login?redirect='+ window.location.pathname; 
        }
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    return instance(config);
}