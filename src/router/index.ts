import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/users/login",
        component: () => import("@/views/LoginView/LoginView.vue"),
    },
    {
        path: "/users/home",
        component: () => import("@/views/HomeView/HomeView.vue"),
    },
    {
        path: "/users/merchanthome",
        component: () => import("@/views/MerchantHome/MerchantHome.vue"),
        children: [
            {
                path: '/users/merchanthome/personinfo',
                name: 'personinfo',
                component: () => import("@/views/MerchantHome/PersonInfo/PersonInfo.vue")
            },
            {
                path: '/users/merchanthome/cominfo',
                name: 'cominfo',
                component: () => import("@/views/MerchantHome/CommodityInfo/CommodityInfo.vue")
            },
            {
                path: '/users/merchanthome/waitcominfo',
                name: 'waitcominfo',
                component: () => import("@/views/MerchantHome/WaitCommodity/WaitCommodity.vue")
            },
            {
                path: '/users/merchanthome/ordermerchant',
                name: 'ordermerchant',
                component: () => import("@/views/MerchantHome/OrderMerchant/OrderMerchant.vue")
            },
            {
                path: '/users/merchanthome/echart',
                name: 'echart',
                component: () => import("@/views/MerchantHome/Echart/Echart.vue")
            }
        ]
    },
    {
        path: "/users/searchview",
        name: "search",
        component: () => import("@/views/HomeView/SearchView/SearchView.vue"),
    },
    {
        path: "/users/person",
        name: "person",
        component: () => import("@/views/HomeView/UserInfo/UserInfo.vue"),
    },
    {
        path: "/users/scrollbar",
        component: () => import("@/components/ScrollBar.vue"),
    },
    {
        path: "/users/goodsview",
        component: () => import("@/views/HomeView/GoodsView/GoodsView.vue"),
    },
    {
        path: "/users/shoppingcart",
        component: () => import("@/views/HomeView/ShoppingCart/ShoppingCart.vue"),
    },
    {
        path: "/users/order",
        component: () => import("@/views/HomeView/OrderView/OrderView.vue"),
    },
    {
        path: "/users/calculate",
        component: () => import("@/views/HomeView/CalculateView/CalculateView.vue"),
    }
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router