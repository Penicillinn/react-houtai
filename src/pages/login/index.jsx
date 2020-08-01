import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
const Login = (props) => {
    const onFinish = values => {
        console.log('Success:', values);
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