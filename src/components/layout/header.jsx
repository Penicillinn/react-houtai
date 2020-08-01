import React,{ useState } from 'react';
import { Layout,Menu, Dropdown, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const menu = (
    <Menu>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            退出登录
        </a>
        </Menu.Item>
    </Menu>
)
const { Header } = Layout;
const iconStyle = { fontSize: '15px', color: '#fff',marginLeft: '10px' };
const HeaderCpn = () => {
    const [ isLogin ] = useState(false);
    const renderByIsLogin = () => {
        if(isLogin) {
            return (
                <Dropdown overlay={menu} placement="bottomLeft">
                    <span style={iconStyle}>hello</span>
                </Dropdown>
            )
        }
        return (<span style={iconStyle}>
            <NavLink to='/login' style={{color: '#fff'}}>登录</NavLink>
        </span>)
    }
    return (
        <Header className="header">
            <div className="logo">
                <h2 style={{color: '#fff'}}>happy mmal</h2>
            </div>
            <div className="header_user">
                <UserOutlined style={{fontSize: '20px', color: '#fff'}} />
                { renderByIsLogin() }
            </div>
        </Header>
    )
}

export default HeaderCpn;