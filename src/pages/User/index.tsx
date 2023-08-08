
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { request } from '@umijs/max';

request('/api/book/search?pageSize=12')

const UserPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        user
      </div>
    </PageContainer>
  );
};

export default UserPage;
