import { Outlet } from '@umijs/max';
import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const { Search } = Input;

const IndexLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <header>
        <div className={styles.wrapper}>
          <a href="/" className={styles.logo}>
            鲲鹏
          </a>
          <Space align="center" className={styles.topRight}>
            <Search placeholder="搜索你喜欢的" style={{ width: 700 }} />

            <Button danger onClick={showModal}>
              注册
            </Button>
            <Modal
              title="使用邮箱注册"
              open={open}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="注册"
              footer={null}
            >
              <Form className={styles.register_form} style={{ maxWidth: 1000 }}>
                <Form.Item validateStatus="error" help="请输入邮箱">
                  <Input
                    placeholder="邮箱"
                    id="error"
                    addonAfter={<span>验证</span>}
                  />
                </Form.Item>

                <Form.Item validateStatus="error" help="请输入验证码">
                  <Input placeholder="验证码" id="error" />
                </Form.Item>

                <Form.Item validateStatus="error" help="请输入密码">
                  <Input placeholder="密码" id="error" />
                </Form.Item>

                <Form.Item validateStatus="error" help="请再次输入密码">
                  <Input placeholder="重复密码" id="error" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    className={styles.register_form_button}
                  >
                    注册
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            <Button>登录</Button>
          </Space>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default IndexLayout;
