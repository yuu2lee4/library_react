import IMGUser from '@/assets/images/user.png';
import http from '@/utils/http';
import { Link, Outlet, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Form, Input, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './index.less';

const IndexLayout: React.FC = () => {
  const { Search } = Input;
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [clickable, setClickable] = useState(true);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { user, login, logout, register } = useModel('userModel');
  const pinRef = useRef<HTMLButtonElement>(null);
  let CountdownTimerRef: any = useRef(null);
  const { setTitle } = useModel('bookModel');

  const showModal1 = () => {
    setOpen1(true);
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };

  const showModal2 = () => {
    setOpen2(true);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };

  const onSearch = async (value: string) => {
    setTitle(value);
  };

  // 获取验证码
  async function getPin() {
    const name = form1.getFieldValue('name');
    if (form1.getFieldError('name').length) {
      return;
    }

    if (clickable) {
      await http('/api/user/getPin', {
        method: 'post',
        data: {
          name,
          checkUser: false,
        },
      });
      setClickable(false);

      // 60s倒计时
      let Countdown = 60;
      CountdownTimerRef.current = setInterval(() => {
        if (pinRef.current) {
          if (0 < Countdown) {
            Countdown--;
            pinRef.current.innerHTML = Countdown + 'S';
          } else {
            pinRef.current.innerHTML = '验证';
            clearInterval(CountdownTimerRef.current);
          }

          if (Countdown === 0) {
            setClickable(true);
          }
        }
      }, 1000);
    }
    return;
  }

  // 注册
  const onCheck1 = async () => {
    const values = await form1.validateFields();
    await register(values);
    form1.resetFields();

    if (CountdownTimerRef.current) {
      clearInterval(CountdownTimerRef.current);
    }
    if (pinRef.current) {
      pinRef.current.innerHTML = '验证';
    }
  };

  // 登录
  const onCheck2 = async () => {
    // 表单校验
    const values = await form2.validateFields();
    // 调登录接口 进行登录
    await login(values.email, values.password);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/user">个人资料</Link>,
    },
    {
      key: '2',
      label: (
        <Link to="/" onClick={logout}>
          退出
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <header>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            鲲鹏
          </Link>
          <Space align="center" className={styles.topRight}>
            <Search
              placeholder="搜索你喜欢的"
              allowClear
              onSearch={onSearch}
              style={{ width: 700 }}
              enterButton
            />

            {user ? (
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <div className={styles.userAvatar}>
                  <img src={IMGUser} alt="" />
                </div>

                {/* {user.name} */}
              </Dropdown>
            ) : (
              <Space className="styles.beforeLogin">
                <Button onClick={showModal1} danger>
                  注册
                </Button>
                <Modal
                  title="使用邮箱注册"
                  open={open1}
                  // onOk={handleOk1}
                  // okText="注册"
                  onCancel={handleCancel1}
                  footer={null}
                >
                  <Form
                    form={form1}
                    className={styles.register_form}
                    style={{ maxWidth: 1000 }}
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        { type: 'email', message: '请输入有效邮箱!' },
                        { required: true, message: '请输入邮箱' },
                      ]}
                    >
                      <Input
                        placeholder="邮箱"
                        addonAfter={
                          <span onClick={getPin} ref={pinRef}>
                            验证
                          </span>
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="pin"
                      rules={[{ required: true, message: '请输入验证码' }]}
                    >
                      <Input placeholder="验证码" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码' }]}
                      hasFeedback
                    >
                      <Input placeholder="密码" type="password" />
                    </Form.Item>

                    <Form.Item
                      name="repassword"
                      rules={[
                        { required: true, message: '请再次输入密码' },
                        // 绑定了Form实例 form={form1}，直接读取form1.getFieldValue属性
                        {
                          validator: (_, value) => {
                            if (
                              !value ||
                              form1.getFieldValue('password') === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('你两次输入的密码不一样!'),
                            );
                          },
                        },
                        // 如果没有绑定Form实例，则采用下面这种方法来判断
                        // ({ getFieldValue })=>({
                        //   validator(_, value) {
                        //     if (!value || getFieldValue('password') === value) {
                        //       return Promise.resolve();
                        //     }
                        //     return Promise.reject(new Error('你两次输入的密码不一样!'));
                        //   }
                        // })
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="重复密码" type="password" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        danger
                        htmlType="submit"
                        className={styles.register_form_button}
                        onClick={onCheck1}
                      >
                        注册
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>

                <Button onClick={showModal2}>登录</Button>
                <Modal
                  title="使用邮箱登录"
                  open={open2}
                  // onOk={handleOk2}
                  // okText="登录"
                  onCancel={handleCancel2}
                  footer={null}
                >
                  <Form
                    form={form2}
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
                        className={styles.register_form_button}
                        onClick={onCheck2}
                      >
                        登录
                      </Button>
                      <a href="##">
                        <div className={styles.mt10}>忘记密码？</div>
                      </a>
                    </Form.Item>
                  </Form>
                </Modal>
              </Space>
            )}
          </Space>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default IndexLayout;
