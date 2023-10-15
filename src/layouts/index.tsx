import { Outlet, useModel } from '@umijs/max';
import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const { Search } = Input;

const IndexLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { user, login } = useModel('userModel');

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      await login(values.email, values.password);

      // console.log('Success:', values);  UI切换到登录状态
    } catch (errorInfo) {
      //
      console.log('Failed:', errorInfo);
    }
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

            {user ? (
              <div>{user.name}</div>
            ) : (
              <div className="styles.beforeLogin">
                <Button danger>注册</Button>
                {/* <Modal
                  title="使用邮箱注册"
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="注册"
                  footer={null}
                >
                  <Form form={form} className={styles.register_form} style={{ maxWidth: 1000 }}>
                    <Form.Item rules={[{ required: true, message: '请输入邮箱' }]} >
                      <Input
                        placeholder="邮箱"
                        id="error"
                        addonAfter={<span>验证</span>}
                      />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请输入验证码' }]}>
                      <Input placeholder="验证码" id="error" />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请输入密码' }]}>
                      <Input placeholder="密码" id="error" />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请再次输入密码' }]}>
                      <Input placeholder="重复密码" id="error" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        danger
                        htmlType="submit"
                        className={styles.register_form_button}
                        onClick={onCheck}
                      >
                        注册
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal> */}

                <Button onClick={showModal}>登录</Button>
                <Modal
                  title="使用邮箱登录"
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="注册"
                  footer={null}
                >
                  <Form
                    form={form}
                    className={styles.register_form}
                    style={{ maxWidth: 1000 }}
                  >
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                      <Input placeholder="邮箱" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码' }]}
                    >
                      <Input placeholder="密码" type="password" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        danger
                        htmlType="submit"
                        className={styles.register_form_button}
                        onClick={onCheck}
                      >
                        登录
                      </Button>
                      <a href="##">
                        <div className={styles.mt10}>忘记密码？</div>
                      </a>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            )}
          </Space>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default IndexLayout;
