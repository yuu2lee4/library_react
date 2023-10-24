import { request } from '@umijs/max';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  borrowedBooks: any[];
}

export default function UserModel() {
  const [user, setUser] = useState<User | null>(null);

  const login = async function (name: string, password: string) {
    // 请求登录接口  http://192.168.31.118:4040/api/user/login
    const res = await request('/api/user/login', {
      method: 'post',
      data: {
        name: name,
        password: password,
      },
    });
    setUser(res.data);
    Cookies.set('isLogin', 'true');
  };

  const getUser = async () => {
    // 判断cookie中用户是否已经登录。
    // 如果已经登录，需要请求接口 获取用户信息
    if (Cookies.get('isLogin')) {
      const res = await request('/api/user', {
        method: 'get',
      });
      setUser(res.data);
    }
  };

  // 第一次进入页面或者刷新进入页面时，需要获取用户信息，判断是否登录。
  useEffect(() => {
    getUser();
  }, []);

  const logout = async function () {
    const res = await request('/api/user/logout');
    console.log(res);
    if (res.data) {
      // 清除cookie
      Cookies.remove('isLogin');
      // 设置user为null
      setUser(null);
    }
  };

  return { user, login, logout, getUser };
}
