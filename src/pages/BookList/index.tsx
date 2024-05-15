import http from '@/utils/http';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Popover, Radio, Table, Tag, message } from 'antd';
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
  borrowers: Borrower[];
}

interface Borrower {
  identifier: string;
  name: string;
  date: string;
}

interface ContentProps {
  borrowers: Borrower[];
}

const Content: React.FC<ContentProps> = ({ borrowers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>编号</th>
          <th>借出人</th>
          <th>借出时间</th>
        </tr>
      </thead>
      <tbody>
        {borrowers.map((borrower) => (
          <tr key={borrower.identifier}>
            <td>{borrower.identifier}</td>
            <td>{borrower.name}</td>
            {/* format('YYYY-MM-DD HH:mm:ss') */}
            <td>{dayjs(borrower.date).format('YYYY-MM-DD')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const BookList: React.FC = () => {
  const { user } = useModel('userModel');
  const [book, setBook] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [paginationTotal, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function getData() {
    if (user) {
      if (!user.borrowedBooks.length) {
        return setBook([]);
      }

      // 请求接口  http默认是get方式传参，params用于querystring传参（即：查询字符串）
      // 4种传参方式：payload、querystring、header请求头、path
      const res = await http('/api/book/search', {
        params: {
          pageSize,
          page,
        },
      });
      // console.log(res.data)
      setBook(res.data.results);
      // 数据总条数
      setTotal(res.data.total);
    }
  }

  useEffect(() => {
    getData();
  }, [user, page]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      width: 140,
    },

    {
      title: '书名',
      dataIndex: 'title',
    },

    {
      title: '作者',
      dataIndex: 'author',
    },

    {
      title: '总数',
      width: 60,
      render: (text, record) => record.identifierList.length,
    },
    {
      title: '借出',
      dataIndex: 'author',
      width: 100,
      render: (text, record) => {
        if (!record.borrowers.length) {
          return record.borrowers.length;
        }
        return (
          <Popover content={<Content borrowers={record.borrowers} />}>
            <Tag color="#2db7f5">查看({record.borrowers.length})</Tag>
          </Popover>
        );
      },
    },
    {
      title: '分类',
      dataIndex: 'tag_1st',
      width: 100,
      render: (text, record) => {
        const tags = record.tag_1st + '-' + record.tag_2nd;
        return tags;
      },
    },

    {
      title: '封面',
      dataIndex: 'image',
      ellipsis: true,
    },

    {
      title: '豆瓣ID',
      dataIndex: 'doubanID',
      width: 100,
    },

    {
      title: '简介',
      dataIndex: 'summary',
      ellipsis: true,
    },
  ];

  const onSelectChange = (newSelectedRowKeys: any) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  async function bookDelete() {
    // 0. 判断是否有选中的书籍
    // selectedRowKeys.length > 0 等同于： !!selectedRowKeys.length
    const hasSelected = !!selectedRowKeys.length;
    if (!hasSelected) {
      message.warning('请选择要删除的书籍!');
      return;
    }

    // 1. 删除选中书籍
    // api/book?ids=6547948432766b83f20e73d8   请求方法:DELETE
    // const res =
    await http('/api/book', {
      params: {
        ids: selectedRowKeys.join(),
      },
      method: 'delete',
    });
    // console.log('删除书籍返回的res: ',res)

    // 2. 更新书籍列表页
    // api/book/search?pageSize=10&page=1   GET
    getData();
  }

  const navigate = useNavigate();
  function bookAdd() {
    navigate('/admin/book/add');
  }

  // const id = selectedRowKeys.toString();
  function bookEdit() {
    if (!selectedRowKeys.length) {
      message.warning('请选择要编辑的书籍!');
    } else if (selectedRowKeys.length === 1) {
      // ${id}
      navigate(`/admin/book/add/`);
    } else {
      message.warning('请只选一本书籍!');
    }
  }

  const options = [
    { label: <FormOutlined onClick={bookEdit} />, value: 1 },
    { label: <DeleteOutlined onClick={bookDelete} />, value: 2 },
    { label: <PlusOutlined onClick={bookAdd} />, value: 3 },
  ];

  return (
    // PageContainer: 含有面包屑导航、主标题
    <PageContainer>
      <div>
        <Radio.Group
          options={options}
          optionType="button"
          size="small"
          value="0"
        ></Radio.Group>
        <Table
          className={styles.mt_10}
          rowSelection={rowSelection}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            onChange: (p) => setPage(p),
            total: paginationTotal,
          }}
          dataSource={book}
          rowKey="_id"
        />
      </div>
    </PageContainer>
  );
};

export default BookList;
