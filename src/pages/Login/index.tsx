import { Input } from 'antd';
import styles from './index.less';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Input placeholder="Basic usage" />
    </div>
  );
};

export default LoginPage;
