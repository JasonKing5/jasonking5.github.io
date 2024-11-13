## Virtual DOM

是 JSX 的运行基础，先通过数据计算出 Virtual DOM，再通过 diff 算法将变化的部分对真实 DOM 做局部更新。

![前后Virtual DOM比对，O(n)](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650769065213-ec24dd85-e86e-452d-8d05-8201e0209caf.png)

## Virtual DOM 的 diff 算法

![分层比较广度优先](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650769146959-8ca08013-b427-4c19-9c51-94d9d211647d.png)

1. 根节点开始比较；
2. 第二层通过唯一标识 key 确定 A 和 B 交换了位置；
3. 第三层 A 下面的 F 发生变化变成了 G，删除 F，新创建 G 绑定到 A 下面；
4. 第三层 B 下面的 D 消失了，会直接删除 D，第四层中 B 下面会新创建一个 D；
   1. 实际 DOM 中节点跨层移动的场景很少，React 不针对此处单独做检查，从而带来整体性能的提升。

## Key

虚拟 DOM 的两个假设：

1. 组件的 DOM 结构是相对稳定的
2. 类型相同的兄弟节点可以被唯一标识
