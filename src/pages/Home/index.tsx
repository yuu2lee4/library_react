import { useModel } from '@umijs/max';
import type { PaginationProps } from 'antd';
import { Button, Card, Pagination, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import http from '@/utils/http';
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
  const [pageSize, setPageSize] = useState(3);
  const { user, getUser } = useModel('userModel');

  async function getData() {
    const response = await http('/api/book/search', {
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

  async function borrowBook(id: number) {
    if (user) {
      // 请求接口 借书
      const res = await http('api/user/borrow', {
        data: {
          id,
        },
        method: 'post',
      });
      message.success('去书架上领取吧，编号：' + res.data);

      // 可借书籍数量-1
      getData();
      // user借书目录 +1本
      getUser();
    } else {
      message.warning('请先登录');
    }
  }
  function canBorrow(book: any): boolean {
    // 用户已登录，且有剩余书籍，且用户没有借阅过
    const isDisable =
      !!user &&
      book.identifierList.length - book.borrowers.length > 0 &&
      !book.borrowers.find((borrower: any) => borrower.name === user.name);
    return isDisable;
  }

  return (
    <div className={styles.container}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Space size={[16, 20]} wrap>
          {bookList.map((item) => (
            <div key={item._id} className={styles.book}>
              <Card
                hoverable
                className={styles.card}
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
                        剩余:{' '}
                        {item.identifierList.length - item.borrowers.length}
                      </div>
                    </div>
                  }
                />
              </Card>
              <Button
                className={styles.borrowBtn}
                type="primary"
                size="small"
                danger
                onClick={() => borrowBook(item._id)}
                disabled={!canBorrow(item)}
              >
                借阅
              </Button>
            </div>
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
