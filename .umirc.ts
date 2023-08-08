import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      layout: false,
      routes: [
        { path: '/', component: './Home' },
        { path: '/user', component: './User' },
      ],
    },
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  proxy: {
    '/api': {
        target: 'http://192.168.31.118:8888',
        changeOrigin: true,
        pathRewrite: {}
    }
  },
  npmClient: 'pnpm',
});

