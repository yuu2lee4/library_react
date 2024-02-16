import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import http from '@/utils/http';
import { Table, Tag, Popover } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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

const Content: React.FC<ContentProps> = ( { borrowers } )=>{
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
                {borrowers.map((borrower)=>(
                <tr key={borrower.identifier}>
                    <td>{ borrower.identifier }</td>
                    <td>{ borrower.name }</td>
                    {/* format('YYYY-MM-DD HH:mm:ss') */}
                    <td>{ dayjs(borrower.date).format('YYYY-MM-DD') }</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

const BookList: React.FC = () => {

    const { user, getUser } = useModel('userModel');
    const [book, setBook] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    async function getData() {
        let ids = '';
        if (user) {
          if (!user.borrowedBooks.length) {
            return setBook([]);
          }
          for (let i = 0; i < user.borrowedBooks.length; i++) {
            if (i === user.borrowedBooks.length - 1) {
              ids = ids + user.borrowedBooks[i].id;
            } else {
              ids = ids + user.borrowedBooks[i].id + ',';
            }
          }
    
          // 请求接口  http默认是get方式传参，params用于querystring传参（即：查询字符串）
          // 4种传参方式：payload、querystring、header请求头、path
          const res = await http('/api/book/search', {
            params: {
              pageSize: 10,
              page: 1
            },
          });
        // console.log(res.data)
          setBook(res.data.results);
        }
    }

    useEffect(() => {
        getData();
    }, [user]);

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
          render: (text, record) => record.identifierList.length ,
        },
        {
            title: '借出',
            dataIndex: 'author',
            width: 100,
            render: (text, record) => {
                if(!record.borrowers.length){
                    return record.borrowers.length
                }
                return  (
                    <Popover content={<Content borrowers={record.borrowers}/>}>
                        <Tag color="#2db7f5">查看({record.borrowers.length})</Tag>
                    </Popover>
                )
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

    const onSelectChange = (newSelectedRowKeys:any) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    
    return (
        <PageContainer>
            <div className={styles.container}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={book} rowKey="_id" />
            </div>
        </PageContainer>
    )
}

export default BookList;