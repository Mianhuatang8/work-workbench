import axios from "axios";
import { ElMessage } from 'element-plus';

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
})


// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        if (process.env.NODE_ENV === 'production') {
            let tokenStr;

            let token = localStorage.getItem('token');

            if (token) {
                let jItem = JSON.parse(token);
                tokenStr = jItem.access_token;
            } else {
                ElMessage({
                    message: '请先登录',
                    type: 'warning',
                });
                setTimeout(() => {
                    window.location.href = 'https://3d.shixianjia.com/#/pages/login';
                }, 2000);
            }
            config.headers.Authorization = `Bearer ${tokenStr}`;
        } else {
            //开发环境
            config.headers.Authorization = `Bearer 0A3AB8CEF92C90537E8C4EEAD7BA79B448CDA0110875D817612501ED5C148F5F`;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);













export default request




