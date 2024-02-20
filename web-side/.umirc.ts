import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/login',
      component: './login',
      hideInMenu: true,
      layout: false,
    },
    /* {
      path: '/',
      component: '@/layouts/Management',
      layout: false,
      routes: [
        {
          name: '组织管理',
          path: '/organization',
          component: './Organization',
        }
      ],
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    }, */
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
