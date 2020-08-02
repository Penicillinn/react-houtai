import React from 'react';
import { Switch,Route } from 'react-router-dom';
import LayoutCpn from '@components/layout';
import Login from './pages/login';
import User from './pages/user'
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
    subMenuKey: 'user1',
    subMenuTitle: 'user',
    menuItenList: [
      {
        key: '/user/item1',
        content: 'user1'
      },
      {
        key: '/user/item2',
        content: 'user2'
      },
    ]
  }
]
function App() {
  const content = (
    <Switch>
      <Route path='/user/:type' component={User} />
      <Route path='/home/item2' component={() => <h1>/home/item2</h1>} />
      {/* <Redirect from='/' to='/user' /> */}
    </Switch>
  )
  return (
    <div className="App">
      <Switch>
        <Route path='/' render={props => {
          return (
            <LayoutCpn 
              subMenuList={subMenuList}
              content={content}
            >
            </LayoutCpn>
          )
        }}/>
        <Route path='/login' component={Login} />
      </Switch>
      
    </div>
  );
}

export default App;
