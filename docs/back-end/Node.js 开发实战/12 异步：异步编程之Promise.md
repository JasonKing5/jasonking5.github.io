## Promise

- 当前事件循环得不到结果，但承诺未来的事件循环会给结果
- 是一个状态机

![画板](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1659272475522-e43a945f-2ce9-4663-9f84-9a2b321d793d.jpeg)

## then and catch

- resolved 状态的 promise 会回调后面的第一个 .then
- rejected 状态的 promise 会回调后面的第一个 .catch
- rejected 后状态时如果没有 catch，会造成全局错误

执行 then 和 catch 会返回一个新的 Promise，该 Promise 最终状态会根据 then 和 catch 的回调函数的执行结果决定。

- 最终是 throw，该 promise 是 reject 状态
- 最终是 return，该 promise 是 resolve 状态
- return 一个 promise，该 promise 会和 callback return 的 promise 状态一致
