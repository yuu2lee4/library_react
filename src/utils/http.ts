import { request } from '@umijs/max';
import { message } from 'antd';

export default async function http(url: string, opts = {}):Promise<any> {
    try {
        const data = await request(url, opts);
        if (data.code !== 0) {
            const msg = data.msg || '未知错误';
            message.warning(msg);
            return Promise.reject(msg);
        }
        return data;
    } catch(err) {
        const msg = err.message || '未知错误';
        message.warning(msg);
        return Promise.reject(msg);
    }
}