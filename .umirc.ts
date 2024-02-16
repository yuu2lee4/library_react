import { defineConfig } from '@umijs/max';
import zhCN from 'antd/locale/zh_CN';

export default defineConfig({
  antd: {
    configProvider: {
      locale: zhCN,
    }
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  metas: [{ name: 'referrer', content: 'no-referrer' }],
  routes: [
    {
      path: '/',
      component: '@/layouts/Home/index',
      layout: false,
      routes: [
        { path: '/', component: './Home' },
        { path: '/user', component: './User' },
      ],
    },
    { path: '/login', component: './Login', layout: false, },
    {
      path: '/admin',
      name: '书籍管理',
      routes: [
        { name: '书籍列表', path: 'book/list', component: './BookList' },
      ],
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
      pathRewrite: {},
    },
  },
  npmClient: 'pnpm',
});
