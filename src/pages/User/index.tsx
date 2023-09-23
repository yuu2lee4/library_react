import { PageContainer } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';

request('/api/book/search?pageSize=12');

interface DataType {
  key: string;
  bookName: string;
  bookID: number;
  author: string;
  tags: string;
  brief: string;
  loanTime: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '书名',
    dataIndex: 'bookName',
    key: 'bookName',
  },
  {
    title: '编号',
    dataIndex: 'bookID',
    key: 'bookID',
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '分类',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '简介',
    dataIndex: 'brief',
    key: 'brief',
  },
  {
    title: '借书时间',
    dataIndex: 'loanTime',
    key: 'loanTime',
  },
  {
    title: '操作',
    key: 'action',
    render: () => <Button danger>归还</Button>,
  },
];

const data: DataType[] = [
  {
    key: 'bookName',
    bookName: '当我们不再理解世界',
    bookID: 11,
    author: '[智利]本哈明·拉巴',
    tags: '历史-欧洲',
    brief: '◆编辑推荐： ★二〇二一年国际布克奖、美国国家...',
    loanTime: '2022-12-12 22:05:28',
    action: '',
  },
];

const UserPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
};

export default UserPage;
