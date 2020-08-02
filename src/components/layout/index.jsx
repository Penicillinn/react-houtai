/*
    参数
    content:jsx, BreadcrumbList: Array, userInfo: Object
    SubMenuList: [
        {
            subMenuKey: '',
            subMenuTitle: '',
            menuItenList: [
                {
                    key: '',
                    content: ''
                }
            ]
        }
    ]
*/

import React,{ useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import HeaderCpn from './header';
import './style.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const LayoutCpn = (props) => {
    const { subMenuList } = props;
    const initialRootkeys = subMenuList.map(item => item.subMenuKey);
    const [breadcrumbList,setBreadcrumbList] = useState([subMenuList[0].subMenuTitle,subMenuList[0].menuItenList[0].content])
    //默认展开第一条
    const initialOpenKeys = [subMenuList[0].subMenuKey];
    //默认选中第一条的第一条数据
    const initialSelectedKeys = subMenuList[0].menuItenList[0].key;
    const [openKeys,setOpenKeys] = useState(initialOpenKeys);
    const onOpenChange = openKey => {  
        const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
        if (initialRootkeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKey);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const handleItemClick = (item,menuItem) => {
        props.history.push('')
        setBreadcrumbList([item.subMenuTitle,menuItem.content]);
        props.history.push('/' + item.subMenuKey + menuItem.key)
    }
    return (
        <Layout>
            <HeaderCpn />
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={initialSelectedKeys}
                        defaultOpenKeys={initialOpenKeys}
                        style={{ height: '100%', borderRight: 0 }}
                        openKeys={openKeys}
                        onOpenChange={openKey => onOpenChange(openKey)}
                    >
                        {
                            subMenuList.map(item => {
                                return (
                                    <SubMenu key={item.subMenuKey} title={item.subMenuTitle}>
                                        {
                                            item.menuItenList.map(menuItem => {
                                                return (
                                                    <Menu.Item 
                                                        key={menuItem.key}
                                                        onClick={e => handleItemClick(item,menuItem)}
                                                    >{menuItem.content}</Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            breadcrumbList.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            height: 650
                        }}
                    >
                        {props.content}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(LayoutCpn);