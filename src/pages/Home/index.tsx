import { request } from '@umijs/max';
import type { PaginationProps } from 'antd';
import { Card, Pagination, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const { Meta } = Card;

interface Book {
  _id: number;
  title: string;
  image: string;
  identifierList: string[];
  borrowers: [];
}

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [paginationTotal, setToal] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  async function getData() {
    const response = await request('/api/book/search', {
      params: {
        pageSize,
        page,
      },
    });
    setBookList(response.data.results);
    setToal(response.data.total);
  }

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const onchange: PaginationProps['onChange'] = (page) => setPage(page);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    setPageSize(pageSize);
  };

  return (
    <div className={styles.container}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Space size={[16, 20]} wrap>
          {bookList.map((item) => (
            <Card
              key={item._id}
              hoverable
              style={{ width: 236 }}
              cover={
                <img
                  style={{ width: 236, height: 314 }}
                  alt={item.title}
                  src={item.image}
                />
              }
            >
              <Meta
                title={item.title}
                description={
                  <div>
                    <div style={{ float: 'left' }}>
                      总数: {item.identifierList.length}
                    </div>{' '}
                    <div style={{ float: 'right' }}>
                      剩余: {item.identifierList.length - item.borrowers.length}
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </Space>
        <Pagination
          pageSize={pageSize}
          defaultCurrent={1}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={[1, 2, 5]}
          onChange={onchange}
          total={paginationTotal}
          style={{ float: 'right' }}
        />
      </Space>
    </div>
  );
};

export default HomePage;
