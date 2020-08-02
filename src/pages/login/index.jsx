import React,{ useState } from 'react';
import { Form, Input, Button } from 'antd';
import { checkLogin } from '@service/login';
import { setStorage } from '../../utils'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  
const Login = (props) => {
    //获取登录之前的路径
    const getOldPathname = () => {
        const searchStr = props.history.location.search;
        if(!searchStr) {
            return '/'
        }
        return searchStr.substr(1).split('=')[1];
    }
    const [ oldPath ] = useState(getOldPathname());
    const onFinish = async values => {
        const { data } = await checkLogin(values);
        if(data.status === 0) {
            setStorage('userinfo',data.data)
            props.history.push(oldPath)
        }
    };
    return (
        <div style={{width: '400px',height: '300px',margin: '200px auto'}}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    登录
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;