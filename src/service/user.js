import request from './index';

export function getUserList(pageNum,pageSize) {
    return request({
        method: 'post',
        url: '/manage/user/list.do',
        data: {
            pageNum,
            pageSize
        }
    })
}