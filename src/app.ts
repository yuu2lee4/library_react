// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  responseInterceptors: [
    [
      (response) => {
        const { data = {} as any } = response;
        if (data.code !== 0) {
          const msg = data.msg || '未知错误';
          message.warning(msg);
          throw new Error(msg);
        }
        return response;
      },
      (error) => {
        const msg = error.message || '未知错误';
        message.warning(msg);
        return Promise.reject(error);
      },
    ],
  ],
};
