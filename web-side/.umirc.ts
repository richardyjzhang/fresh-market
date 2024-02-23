import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      name: "登录",
      path: "/login",
      component: "./login",
      hideInMenu: true,
      layout: false,
    },
    {
      path: "/",
      component: "@/layouts/management",
      layout: false,
      routes: [
        {
          name: "经营概览",
          path: "/dashboard",
          component: "./dashboard",
        },
        {
          name: "分类管理",
          path: "/product-category",
          component: "./product-category",
        },
        {
          name: "标签管理",
          path: "/product-tag",
          component: "./product-tag",
        },
        {
          name: "商品管理",
          path: "/product",
          component: "./product",
        },
        {
          name: "订单管理",
          path: "/order",
          component: "./order",
        },
      ],
    },
    {
      name: "首页",
      path: "/dashboard",
      component: "./dashboard",
    },
  ],
  history: {
    type: "hash",
  },
  proxy: {
    "/api": {
      target: "http://127.0.0.1:9000/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  npmClient: "yarn",
});
