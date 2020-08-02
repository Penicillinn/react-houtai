import React from 'react';
import UserList from './UserList';

const User = (props) => {
    const showCpnByType = () => {
        if(props.history.location.pathname === '/user/userlist'){
            return <UserList />
        }else {
            return (
                <div>
                    power
                </div>
            )
        }
    }
    showCpnByType()
    return (
        <div>
            {showCpnByType()}
        </div>
    )
}

export default User;