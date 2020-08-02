import request from './index';

export function checkLogin(loginInfo) {
    return request({
        method: 'post',
        url: '/manage/user/login.do',
        params: {
            ...loginInfo
        }
    })
}

export function logOut() {
    return request({
        url: '/user/logout.do',
        method: 'post'
    })
}