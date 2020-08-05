import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = (props) => {
    
    return (
        <div>
            <h1>出错了</h1>
            <NavLink to='/user/userlist'>点击跳转到首页</NavLink>
        </div>
    )
}

export default Error;