import { request } from '@umijs/max';
import { Card, Pagination, Space } from 'antd';
import styles from './index.less';

request('/api/book/search?pageSize=12');

const { Meta } = Card;

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Space direction="vertical" size="middle" align="end">
        <Space size={[16, 20]} wrap>
          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   剩余：10"
            />
          </Card>

          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   剩余：10"
            />
          </Card>

          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    剩余：10"
            />
          </Card>

          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    剩余：10"
            />
          </Card>

          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   剩余：10"
            />
          </Card>

          <Card
            hoverable
            style={{ width: 236 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="一个女孩的记忆"
              description="总数：1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    剩余：10"
            />
          </Card>
        </Space>
        <Pagination defaultCurrent={1} total={10} />
      </Space>
    </div>
  );
};

export default HomePage;
