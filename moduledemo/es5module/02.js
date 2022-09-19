//调用01.js中创建的方法
//1. 引入01.js文件
//  `./`表示当前路径 
const m = require('./01.js')

//2. 调用
console.log(m.sum(1, 2))
console.log(m.subtract(19, 1))