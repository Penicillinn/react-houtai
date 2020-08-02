import React,{ useState } from 'react';
import { Layout,Menu, Dropdown, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { getStorage,removeStorage } from '../../utils';
import { logOut } from '@service/login'
const { Header } = Layout;
const menu = (
    <Menu
        onClick={e => hadleLogOut()}
    >
        <Menu.Item>
                <span>退出登录</span>
        </Menu.Item>
    </Menu>
)
const hadleLogOut = async() => {
    await logOut();
    removeStorage('userinfo');
    window.location.href = '/login';
}
const iconStyle = { fontSize: '15px', color: '#fff',marginLeft: '10px' };
const HeaderCpn = () => {
    const checkIsLogin = () => {
        const result = getStorage('userinfo');
        if(!result) {
            return false;
        }
        return true;
    }
    const getUserName = () => {
        return getStorage('userinfo') ? getStorage('userinfo').username : '';
    }
    const [ isLogin ] = useState(checkIsLogin());
    const renderByIsLogin = () => {
        if(isLogin) {
            return (
                <Dropdown overlay={menu} placement="bottomLeft">
                    <span style={iconStyle}>{ getUserName() }</span>
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