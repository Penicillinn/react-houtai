import React, { PureComponent } from 'react';
import { getUserList } from '@service/user';
import { Table } from 'antd';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '注册时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text,record) => <span>{new Date(record.createTime).toLocaleString()}</span>
    },
]
class UserList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            pageNum: 1,
            total: 0,
            pageSize: 10
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        const data = await getUserList(this.state.pageNum,this.state.pageSize);
        this.setState({
            userList: data.data.data.list,
            total: data.data.data.total
        })
    }
    handleChangePage(pageNum,pageSize) {
        this.setState({
            pageNum,
            pageSize
        },this.fetchData);
    }
    render() {
        return (
            <div>
                <h1 style={{fontSize: '20px',textAlign:'center'}}>用户列表</h1>
                <Table 
                    columns={columns} 
                    dataSource={this.state.userList}
                    pagination={{
                        position: ['bottomRight'],
                        defaultCurrent: this.state.pageNum,
                        total: this.state.total,
                        onChange: (pageNum,pageSize) => this.handleChangePage(pageNum,pageSize) 
                    }}
                 />
            </div>
        )
    }
}

export default UserList;