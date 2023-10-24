import { PageContainer } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './index.less';

interface DataType {
  _id: string;
  title: string;
  identifierList: string[];
  author: string;
  tag_1st: string;
  tag_2nd: string;
  summary: string;
}

const UserPage: React.FC = () => {
  const { user, getUser } = useModel('userModel');
  const [book, setBook] = useState<DataType[]>([]);

  async function getData() {
    let ids = '';
    if (user) {
      if (!user.borrowedBooks.length) {
        return setBook([]);
      }
      for (let i = 0; i < user.borrowedBooks.length; i++) {
        if (i === user.borrowedBooks.length - 1) {
          ids = ids + user.borrowedBooks[i].id;
        } else {
          ids = ids + user.borrowedBooks[i].id + ',';
        }
      }

      // 请求接口  request默认是get方式传参，params用于querystring传参（即：查询字符串）
      // 4种传参方式：payload、querystring、header请求头、path
      const res = await request('/api/book/', {
        params: {
          ids,
        },
      });
      setBook(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, [user]);

  const columns: ColumnsType<DataType> = [
    {
      title: '书名',
      dataIndex: 'title',
    },
    {
      title: '编号',
      dataIndex: 'identifierList',
      width: 100,
      render: (text, record) => {
        const bookId =
          user &&
          user.borrowedBooks.find((item) => {
            return item.id === record._id;
          })?.identifier;
        return bookId;
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'tag_1st',
      width: 130,
      render: (text, record) => {
        const tags = record.tag_1st + '-' + record.tag_2nd;
        return tags;
      },
    },
    {
      title: '简介',
      dataIndex: 'summary',
      ellipsis: true,
    },
    {
      title: '借书时间',
      render: (text, record) => {
        const newDate =
          user &&
          user.borrowedBooks.find((item) => {
            return item.id === record._id;
          })?.date;
        // 原来的时间是： 2023-10-21T07:00:56.232Z   '{YYYY} MM-DDTHH:mm:ss SSS [Z] A'
        return dayjs(newDate).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      render: (text, record) => {
        const bookBack = async () => {
          const res = await request('/api/user/return', {
            // data表示payload负载，一般用于post传参。
            data: {
              id: record._id,
            },
            method: 'post',
          });

          // 还书后，需要更新user.borrowedBooks
          // 这里通过从服务器 重新获取user 来保证borrowedBooks是最新状态
          if (res.data) {
            getUser();
          }
        };
        return (
          <Button danger onClick={bookBack}>
            归还
          </Button>
        );
      },
      width: 100,
    },
  ];

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Table columns={columns} dataSource={book} rowKey="_id" />
      </div>
    </PageContainer>
  );
};

export default UserPage;
