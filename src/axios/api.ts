import { log } from 'console';
import request from './request';

export const register = <T>(params?: any): Promise<T> => {
    return request.get("/merchant/register/", { params });
};
export const login = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/merchant/login/", params);
};
export const userLogin = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/users/login", params);
};
export const userRegister = <T>(params?: any): Promise<T> => {
    return request.post("/users/register", params);
};
export const getComInfo = <T>(params?: any): Promise<T> => {        //商品列表
    return request.get("/commodity/getcomBymidPage/", params);
};
export const getWaitComInfo = <T>(params?: any): Promise<T> => {    //待审核列表
    console.log(params)
    return request.get("/commodity/getFailcomBymidPage", params);
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
export const updateCommodity = <T>(params?: any): Promise<T> => {  //更新商品
    params = JSON.stringify(params)
    console.log(params)
    return request.put("/merchant/update/commodity", params);
};
export const getMerchantName = <T>(params?: any): Promise<T> => {  //获取商家名
    params = JSON.stringify(params)
    return request.get("admins/getonename/" + params);
};
export const getImg = <T>(params?: any): Promise<T> => {  //获取商品图片
    params = JSON.stringify(params)
    return request.get("/images/getImage/" + params);
};
export const getComName = <T>(params?: any): Promise<T> => {  //获取商品名字
    return request.get("/commodity/getbyid/" + params);
};
export const getBreedName = <T>(params?: any): Promise<T> => {  //获取品类名字
    // params = JSON.stringify(params)
    return request.get("/breeds/getbyID/" + params);
};
export const addToShoppingCart = <T>(params?: any): Promise<T> => {  //添加至购物车
    params = JSON.stringify(params)
    return request.post("/shoppingcart/add", params);
};
export const searchShoppingCart = <T>(params?: any): Promise<T> => {  //查找购物车
    return request.get("/shoppingcart/st/" + params);
};
export const addReview = <T>(params?: any): Promise<T> => {           //添加评论
    params = JSON.stringify(params)
    return request.post("/reviews/addreviews", params);
};
export const searchByComName = <T>(params?: any): Promise<T> => {      //查找商品通过名字
    return request.get("/commodity/searchByName", params);
};
export const searchByComNameUser = <T>(params?: any): Promise<T> => {      //查找商品通过名字
    console.log(params)
    return request.get("/commodity/mohu", params);
};
export const searchByComNameFail = <T>(params?: any): Promise<T> => {      //查找商品通过名字
    return request.get("/commodity/searchByNameFailed", params);
};
export const MerchantRecode = <T>(params?: any): Promise<T> => {  //商家修改密码
    params = JSON.stringify(params)
    console.log(params)
    return request.put("/merchant/updata", params);
};
export const addOrder = <T>(params?: any): Promise<T> => {  //提交订单
    params = JSON.stringify(params)
    const parsedObject = JSON.parse(params);
    let mapArray = parsedObject.map;
    mapArray = JSON.stringify(mapArray)
    return request.post("/shoppingcart/addtoorder", mapArray);
};
export const searchAddress = <T>(params?: any): Promise<T> => {  //查询地址
    return request.get("/shippingaddresses/get/" + params);
};
export const logOut = <T>(): Promise<T> => {                    //退出登录
    return request.get("/merchant/Logout");
};
export const userOrders = <T>(params?: any): Promise<T> => {  //用户查询订单
    return request.get("/orders/userget", params);
};
export const deleteCart = <T>(params?: any): Promise<T> => {  //删除购物车中的一行
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/shoppingcart/deleteaclassNew", params);
};
export const updateOrder = <T>(params?: any): Promise<T> => {  //更新订单
    params = JSON.stringify(params)
    return request.put("/orders/usersUpdateOrders", params);
};
export const orderRate = <T>(params?: any): Promise<T> => {    //排序评价
    return request.get("/reviews/watchRating", params);
};
export const userOrdersBy = <T>(params?: any): Promise<T> => {  //用户查询订单
    return request.get("/orders/UserSearchOrders", params);
};
export const merchantOrdersBy = <T>(params?: any): Promise<T> => {  //商家查询订单
    return request.get("/orders/MerchantSearchOrders", params);
};
export const merchantOrders = <T>(params?: any): Promise<T> => {  //商家查询订单
    return request.get("/orders/merchantget", params);
};
export const getReviewsByCom = <T>(params?: any): Promise<T> => {  //查询商品评论
    return request.get("/reviews/watchreviews", params);
};


//李超
export const geruser = <T>(params?: any): Promise<T> => {
    return request.get("/users/getOneByPhone/" + params);
};
export const userupdate = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.put("/users/update", params);
};
export const userres = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/users/reset", params);
};
export const getaddress = <T>(params?: any): Promise<T> => {
    return request.get("/shippingaddresses/get/" + params);
};
export const deleteaddress = <T>(params?: any): Promise<T> => {
    return request.delete("/shippingaddresses/delete/" + params);
};
export const updateaddress = <T>(params?: any): Promise<T> => {

    return request.put("/shippingaddresses/update", params);
};
export const insertaddress = <T>(params?: any): Promise<T> => {
    params = JSON.stringify(params)
    console.log(params)
    return request.post("/shippingaddresses/insert", params);
};
export const myBroSun = <T>(params?: any): Promise<T> => {
    return request.get("/merchant/BigData/" + params);
};

