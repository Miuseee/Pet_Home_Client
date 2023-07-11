import request from './request';

// export const get = <T>(url: string, params?: any): Promise<T> => {
//     return request.get(url, { params });
// };

// export const post = <T>(url: string, data?: any): Promise<T> => {
//     return request.post(url, data);
// };
export const register = <T>(params?: any): Promise<T> => {
    return request.get("/merchant/register/", { params });
};
export const login = <T>(params?: any): Promise<T> => {
    // console.log({ params })
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/merchant/login/", params);
};
export const getComInfo = <T>(params?: any): Promise<T> => {

    return request.get("/merchant/getcom/" + params);
};
export const getWaitComInfo = <T>(params?: any): Promise<T> => {

    return request.get("/merchant/getFailcomBymid/" + params);
};
export const addCommodity = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/merchant/addition", params);
};