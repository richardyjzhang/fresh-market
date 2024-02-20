import axios from "axios";

const request = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// 创建响应拦截
request.interceptors.response.use(
    (res) => {
        let data = res.data;
        return data;
    },
    (error) => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(message);
    }
);

export default request;