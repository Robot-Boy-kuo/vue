//1. 创建js方法
//定义成员：
const sum = function (a, b) {
    return parseInt(a) + parseInt(b)
}
const subtract = function (a, b) {
    return parseInt(a) - parseInt(b)
}

//2. 设置哪些方法可以被js调用
module.exports = {
    sum,
    subtract
}