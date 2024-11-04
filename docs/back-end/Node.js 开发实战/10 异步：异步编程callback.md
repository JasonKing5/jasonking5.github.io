## 回调函数格式规范
error-first callback / Node-style callback：第一个参数是error，后面的参数才是结果。



多次callback造成回调地狱。

不便于并发。

## 异步并发编程方式
npm包：async

thunk

