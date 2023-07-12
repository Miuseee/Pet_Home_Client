import request from './request';

//朱悦凯后端
export const register = <T>(params?: any): Promise<T> => {
    return request.get("/merchant/register/", { params });
};
export const login = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/merchant/login/", params);
};
export const getComInfo = <T>(params?: any): Promise<T> => {        //商品列表
    return request.get("/merchant/getcom/" + params);
};
export const getWaitComInfo = <T>(params?: any): Promise<T> => {    //待审核列表
    console.log(params)
    return request.get("/merchant/getFailcomBymid/" + params);
};
export const addCommodity = <T>(params?: any): Promise<T> => {      //添加商品
    params = JSON.stringify(params)
    return request.post("/merchant/addition", params);
};
export const searchBreed = <T>(): Promise<T> => {                  //查找所有种类
    return request.get("/breeds/getAll");
};
export const searchCommodity = <T>(params?: any): Promise<T> => { //查找品类下面所有商品
    return request.get("/commodity/commodityByBreedID/" + params);
};
export const addImage = <T>(params?: any): Promise<T> => {      //添加图片
    console.log(params)
    return request.post("/images/add", params);
};
export const phoneVertify = <T>(params?: any): Promise<T> => {  //手机验证
    return request.get("/sendCaptcha/" + params);
};
export const deleteCommodity = <T>(params?: any): Promise<T> => {  //删除商品
    return request.delete("/merchant/Delete/" + params);
};
export const updateCommodity = <T>(params?: any): Promise<T> => {  //删除商品
    params = JSON.stringify(params)
    console.log(params)
    return request.put("/merchant/update/commodity", params);
};
export const getMerchantName = <T>(params?: any): Promise<T> => {  //删除商品
    params = JSON.stringify(params)
    return request.get("admins/getonename/" + params);
};
export const getImg = <T>(params?: any): Promise<T> => {  //删除商品
    params = JSON.stringify(params)
    return request.get("/images/getImage/" + params);
};
//邹佳后端
export const userLogin = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/users/login", params);
};
export const userRegister = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/users/register", params);
};