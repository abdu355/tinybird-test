const getQueryParamURL = (url, param) => {
    let query = '?'
    Object.keys(param).forEach((key, i, arr) => {
        query += key + '=' + param[key]
        if (arr[i + 1]) {
            query += '&';
        }
    })
    return url + query
}
export default getQueryParamURL