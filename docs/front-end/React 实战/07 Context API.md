## Context API 的使用场景

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650771004665-a2aaf324-dcf8-4b0c-bca7-77a7859e5d48.png)

解决了多层组件之间 prop 需要层层传递的问题。（theme，language）

如果自己通过存储外部数据进行使用，需要监听数据的变化，当变化是主动调用组件的 forceUpdate 强制刷新；
