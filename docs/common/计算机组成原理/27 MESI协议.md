## 缓存一致性问题

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648896644896-ffcabc69-4d83-4dd5-a78e-756c85da4025.png)

需要有一种机制，同步两个不同核心里面的缓存数据：

1. 写传播（Write Propagation）：在一个 CPU 核心里，Cache 数据更新必须能够传播到其他的对应节点的 Cache Line 里。
2. 事务的串行化（Transaction Serialization）：在一个 CPU 核心里面的读取和写入，在其他的节点看起来顺序是一样的。

实现该机制的要点：

1. 一个 CPU 核心对于数据的操作，需要同步通信给到其他 CPU 核心。
2. 如果两个 CPU 核心里有同一个数据的 Cache，对这个 Cache 数据的更新需要有一个锁的概念。

## 总线嗅探机制和 MESI 协议

### 总线嗅探（Bus Snooping）

把所有的读写请求都通过总线（Bus）广播给所有的 CPU 核心，然后让各个核心去嗅探这些请求，再根据本地的情况进行响应。

### 写失效（Write Invalidate）

只有一个 CPU 核心负责写入数据，其他的核心只是同步读取到这个写入。在这个 CPU 核心写入 Cache 之后，它会去广播一个失效请求告诉所有其他的 CPU 核心。其他的 CPU 核心，只是去判断自己是否也有一个失效版本的 Cache Block，然后把这个也标记成失效的。

### 写广播（Write Broadcast）

一个写入请求广播到所有的 CPU 核心，同时更新各个核心里的 Cache。

![写失效](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648897648615-12d3e801-d50f-4f46-9e35-3318c9a87e61.png)![写广播](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648897674277-35338a77-b570-49b7-a12b-81e765497097.png)

### MESI 协议

对 Cache Line 有四个不同的标记：

1. M：代表已修改（Modified）

Cache Block 里面的内容我们已经更新过了，但是还没有写回到主内存里面。

2. E：代表独占（Exclusive）

独占状态下，对应的 Cache Line 只加载到了当前 CPU 核所拥有的 Cache 里。其他的 CPU 核并没有加载对应的数据到自己的 Cache 里。这时如果要向独占的 Cache Block 写入数据，可以自由地写入数据，而不需要告知其他 CPU 核。

3. S：代表共享（Shared）

在独占状态下的数据，如果收到了一个来自于总线的读取对应缓存的请求，它就会变成共享状态。这时另外一个 CPU 核心，也把对应的 Cache Block，从内存里面加载到了自己的 Cache 里来。

当我们想要更新 Cache 里面的数据的时候，不能直接修改，而是要先向所有的其他 CPU 核心广播一个请求，要求先把其他 CPU 核心里面的 Cache，都变成无效的状态，然后再更新当前 Cache 里面的数据。

4. I：代表已失效（Invalidated）

这个 Cache Block 里面的数据已经失效了，不可以相信这个 Cache Block 里面的数据。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648898190964-0c374684-d351-4fd9-ade0-a1077746ed0e.png)
