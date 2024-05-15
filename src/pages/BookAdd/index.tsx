import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
import http from '@/utils/http';
// import { DownOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
// import styles from './index.less';

const { TextArea } = Input;
// const { Option } = Select;
const options: SelectProps['options'] = [];

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function BookAdd() {
  const [form] = Form.useForm();
  let newBook: any;
  const [tags, setTags] = useState<any[]>([]);
  const [tags_2nd, setTags_2nd] = useState([]);

  async function getTags() {
    // api/tag
    const res = await http('/api/tag');
    setTags(
      res.data.map((item) => ({
        value: item.name,
        label: item.name,
        tags_2nd: item.tags_2nd,
      })),
    );
  }

  useEffect(() => {
    getTags();
  }, []);

  // 点击同步按钮
  async function sync() {
    //const isbn = form.getFieldValue('isbn')
    const { isbn } = await form.validateFields(['isbn']);

    // 请求接口 api/book/isbn/9787572609268  get
    const res = await http(`/api/book/isbn/${isbn}`);
    newBook = res.data;
    form.setFieldsValue({
      title: newBook.name,
      author: newBook.author,
      doubanID: newBook.douban,
      image: newBook.photoUrl,
      summary: newBook.authorIntro,
    });
    // {
    //   "id": 9787572609268,
    //   "name": "我在北京送快递",
    //   "subname": "",
    //   "author": "胡安焉",
    //   "translator": null,
    //   "publishing": "湖南文艺出版社",
    //   "published": "2023-3-24",
    //   "designed": "平装",
    //   "code": "9787572609268",
    //   "douban": 36150423,
    //   "doubanScore": 82,
    //   "numScore": 40005,
    //   "brand": null,
    //   "weight": null,
    //   "size": null,
    //   "pages": "296",
    //   "photoUrl": "https://img1.doubanio.com/view/subject/m/public/s34522268.jpg",
    //   "localPhotoUrl": "",
    //   "price": "56.00元",
    //   "froms": "douban_api2",
    //   "num": 0,
    //   "createTime": "2023-02-10T09:22:00",
    //   "uptime": "2024-03-04T22:13:18",
    //   "authorIntro": "胡安焉，打工人，写作者。近二十年间走南闯北，辗转于广东、广西、云南、上海、北京等地，现定居成都。早年间做过保安、面包店学徒、便利店店员、自行车店销售、服装店导购、网店工作人员等；近年在广东的物流公司做过夜班拣货工人，后又在北京做了两年快递员。2020年至今，待业在家。",
    //   "description": "进入社会工作至今的二十年间，胡安焉走南闯北，辗转于广东、广西、云南、上海、北京等地，做过快递员、夜班拣货工人、便利店店员、保安、自行车店销售、服装店导购、加油站加油工……他将日常的点滴和工作的甘苦化作真诚的自述，记录了一个平凡人在生活中的辛劳、私心、温情、正气。\n在物流公司夜间拣货的一年，给他留下了深刻的生理印记：“这份工作还会令人脾气变坏，因为长期熬夜以及过度劳累，人的情绪控制力会明显下降……我已经感到脑子不好使了，主要是反应变得迟钝，记忆力开始衰退。”在北京送快递的两年，他“把自己看作一个时薪30元的送货机器，达不到额定产出值就恼羞成怒、气急败坏”……\n但他最终认识到，怀着怨恨的人生是不值得过的。这些在事后追忆中写成的工作经历，渗透着他看待生活和世界的态度与反思，旨在表达个人在有限的选择和局促的现实中，对生活意义的直面和肯定：生活中许多平凡隽永的时刻，要比现实困扰的方方面面对人生更具有决定意义。\n————\n✨2023年豆瓣年度图书No.1\n✨第二届三联行读图书奖文学类中文原创年度图书、QQ阅读2023年度十大非虚构好书\n✨上市以来，南方周末、澎湃新闻、人物、南方人物周刊、新周刊、新京报、界面文化、GQ、看理想、单读等多家主流媒体或平台持续热议\n·\n《我在北京送快递》应该加入市民生活必读书，让更多人了解社会运转背后各行各业的力量。\n——《人民日报》",
    //   "reviews": null,
    //   "tags": null
    // }
  }

  function onTag1Change(value: string[]) {
    setTags_2nd(
      tags
        .find((item) => value === item.value)
        .tags_2nd.map((tag: string) => ({ value: tag, label: tag })),
    );
  }

  const onFinish = async (data: any) => {
    // 保存： 请求接口 api/book  post
    const res = await http('/api/book', {
      data,
      method: 'post',
    });
    if (res.data) {
      form.resetFields();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  // 负载：
  // {
  //   "isbn": "9787572609268",
  //   "identifierList": [
  //     "1",
  //     "2",
  //     "3",
  //     "4",
  //     "5",
  //     "6",
  //     "7",
  //     "8"
  //   ],
  //   "title": "我在北京送快递",
  //   "doubanID": 36150423,
  //   "summary": "进入社会工作至今的二十年间，胡安焉走南闯北，辗转于广东、广西、云南、上海、北京等地，做过快递员、夜班拣货工人、便利店店员、保安、自行车店销售、服装店导购、加油站加油工……他将日常的点滴和工作的甘苦化作真诚的自述，记录了一个平凡人在生活中的辛劳、私心、温情、正气。\n在物流公司夜间拣货的一年，给他留下了深刻的生理印记：“这份工作还会令人脾气变坏，因为长期熬夜以及过度劳累，人的情绪控制力会明显下降……我已经感到脑子不好使了，主要是反应变得迟钝，记忆力开始衰退。”在北京送快递的两年，他“把自己看作一个时薪30元的送货机器，达不到额定产出值就恼羞成怒、气急败坏”……\n但他最终认识到，怀着怨恨的人生是不值得过的。这些在事后追忆中写成的工作经历，渗透着他看待生活和世界的态度与反思，旨在表达个人在有限的选择和局促的现实中，对生活意义的直面和肯定：生活中许多平凡隽永的时刻，要比现实困扰的方方面面对人生更具有决定意义。\n————\n✨2023年豆瓣年度图书No.1\n✨第二届三联行读图书奖文学类中文原创年度图书、QQ阅读2023年度十大非虚构好书\n✨上市以来，南方周末、澎湃新闻、人物、南方人物周刊、新周刊、新京报、界面文化、GQ、看理想、单读等多家主流媒体或平台持续热议\n·\n《我在北京送快递》应该加入市民生活必读书，让更多人了解社会运转背后各行各业的力量。\n——《人民日报》",
  //   "image": "https://img1.doubanio.com/view/subject/m/public/s34522268.jpg",
  //   "author": "胡安焉",
  //   "tag_1st": "生活",
  //   "tag_2nd": "职场"
  // }

  return (
    <PageContainer>
      <div>
        <Form
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="ISBN"
            rules={[{ required: true, message: 'Please input your ISBN!' }]}
          >
            <Row gutter={4}>
              <Col span={20}>
                <Form.Item
                  name="isbn"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input your ISBN!' },
                  ]}
                >
                  <Input placeholder="请填写该书的ISBN" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => sync()}>
                  同步
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input placeholder="请填写该书的标题" />
          </Form.Item>
          <Form.Item
            label="作者"
            name="author"
            rules={[{ required: true, message: 'Please input your author!' }]}
          >
            <Input placeholder="请填写该书的作者" />
          </Form.Item>

          <Form.Item
            label="一级分类"
            name="tag_1st"
            rules={[{ required: true, message: 'Please input ' }]}
          >
            <Select
              placeholder="请选择"
              onChange={onTag1Change}
              options={tags}
            ></Select>
          </Form.Item>
          <Form.Item
            label="二级分类"
            name="tag_2nd"
            rules={[{ required: true, message: 'Please input ' }]}
          >
            <Select placeholder="请选择" options={tags_2nd}></Select>
          </Form.Item>

          <Form.Item
            name="identifierList"
            label="编号"
            rules={[
              {
                required: true,
                message: 'Please select your identifierList!',
                type: 'array',
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请填写该书的编号"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="豆瓣ID"
            name="doubanID"
            rules={[{ required: true, message: 'Please input your doubanID!' }]}
          >
            <Input placeholder="请填写该书的豆瓣ID" />
          </Form.Item>
          <Form.Item
            label="封面"
            name="image"
            rules={[{ required: true, message: 'Please input your faceImg!' }]}
          >
            <Input placeholder="请填写该书的封面图片" />
          </Form.Item>

          <Form.Item
            label="简介"
            name="summary"
            rules={[{ required: true, message: 'Please input summary' }]}
          >
            <TextArea rows={4} placeholder="请填写该书的简介" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 10 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </PageContainer>
  );
}
