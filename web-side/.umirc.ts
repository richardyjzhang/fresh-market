import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '登录',
      path: '/login',
      component: './login',
      hideInMenu: true,
      layout: false,
    },
    {
      path: '/',
      component: '@/layouts/management',
      layout: false,
      routes: [
        {
          name: '经营概览',
          path: '/dashboard',
          component: './dashboard',
        }
      ],
    },
    {
      name: '首页',
      path: '/dashboard',
      component: './dashboard',
    },
  ],
  proxy: {
    "/api": {
      'target': 'http://127.0.0.1:9000/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    }
  },
  npmClient: 'yarn',
});
