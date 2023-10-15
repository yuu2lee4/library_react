import { request } from '@umijs/max';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface User {
  name: string;
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
    setUser({ name: res.data.name });
    Cookies.set('isLogin', 'true');
  };

  const initialUser = async () => {
    console.log(Cookies.get('isLogin'));
    if (user === null && Cookies.get('isLogin')) {
      const res = await request('/api/user', {
        method: 'get',
      });
      setUser({ name: res.data.name });
    }
  };

  useEffect(() => {
    initialUser();
  }, []);

  const logout = function () {
    // 清除cookie
    document.cookie = '';
    // 设置user为null
    setUser(null);
  };

  return { user, login, logout };
}
