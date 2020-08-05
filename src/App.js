import React from 'react';
import { Switch,Route } from 'react-router-dom';
import LayoutCpn from '@components/layout';
import Login from './pages/login';
import User from './pages/user';
import Product from './pages/product';
import Error from './pages/error/Error';
const subMenuList = [
  {
    subMenuKey: 'user',
    subMenuTitle: '用户',
    menuItenList: [
      {
        key: '/userlist',
        content: '用户列表'
      },
      {
        key: '/userpower',
        content: '用户权限'
      },
    ]
  },
  {
    subMenuKey: 'product',
    subMenuTitle: '商品',
    menuItenList: [
      {
        key: '/list',
        content: '商品列表'
      },
      {
        key: '/manage',
        content: '商品管理'
      },
    ]
  }
]
function App() {
  const content = (
    <Switch>
      <Route path='/user/:type' exact component={User} />
      <Route path='/product/list' component={Product} />
      <Route path='/product/manage' component={Product} />
      <Route path='/product/detail/:id' component={Product} />
      <Route path='/product/edit/:id' component={Product} />
      <Route component={Error} />
      {/* <Redirect from='/' to='/user' /> */}
    </Switch>
  )
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' render={props => {
          return (
            <LayoutCpn 
              subMenuList={subMenuList}
              content={content}
            >
            </LayoutCpn>
          )
        }}/>
      </Switch>
      
    </div>
  );
}

export default App;
