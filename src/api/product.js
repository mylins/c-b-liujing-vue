import http from '../utils/httpRequest'

export function getQuerycategory(obj) {
    return http({
        url: http.adornUrl('/product/productcategory/querycategorybyparentid'),
        method: 'get',
        params:obj
    })
}
export function getAmazonCategoryId(obj){
    return http({
        url: http.adornUrl('/upload/amazoncategory/childCategoryList'),
        method: 'post',
        data:http.adornData(obj)
    })
}