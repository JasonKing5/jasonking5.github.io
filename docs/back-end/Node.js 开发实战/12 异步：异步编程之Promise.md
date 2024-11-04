## Promise
+ 当前事件循环得不到结果，但承诺未来的事件循环会给结果
+ 是一个状态机

![画板](https://cdn.nlark.com/yuque/0/2022/jpeg/155952/1659272475522-e43a945f-2ce9-4663-9f84-9a2b321d793d.jpeg)

## then and catch
+ resolved状态的promise会回调后面的第一个  .then
+ rejected状态的promise会回调后面的第一个 .catch
+ rejected后状态时如果没有catch，会造成全局错误

执行then和catch会返回一个新的Promise，该Promise最终状态会根据then和catch的回调函数的执行结果决定。

+ 最终是throw，该promise是reject状态
+ 最终是return，该promise是resolve状态
+ return一个promise，该promise会和callback return的promise状态一致



