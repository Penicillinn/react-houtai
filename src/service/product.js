import request from './index';

export function getProductList(pageSize,pageNum) {
    return request({
        method: 'post',
        url: '/manage/product/list.do',
        data: {
            pageNum,
            pageSize
        }
    })
}

export function searchProductList(pageNum,searchType,inputValue) {
    return request({
        url: '/manage/product/search.do',
        params: {
            pageNum,
            listType: 'search',
            [searchType]: inputValue
        }
    })
}

export function changeProductStatus(productId,status) {
    return request({
        url: '/manage/product/set_sale_status.do',
        params: {
            productId,
            status
        }
    })
}
 
export function getDetail(productId) {
    return request({
        url: '/manage/product/detail.do?productId='+productId
    })
}

export function getCategory(categoryId) {
    return request({
        url: '/manage/category/get_category.do?categoryId=' + categoryId
    })
}

export function editProduct(editInfo) {
    return request({
        url: '/manage/product/save.do',
        params: {
            ...editInfo
        }
    })
}