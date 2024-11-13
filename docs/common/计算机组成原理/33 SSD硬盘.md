## SSD 的读写原理

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648963522318-cf489796-e93b-4811-ab83-f550d5ab1248.png)

### SLC、MLC、TLC 和 QLC

SLC 颗粒：给电容里面充上电有电压的时候就是 1，给电容放电里面没有电就是 0。全称 Single-Level Cell，即一个存储单元中只有一位数据。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648963649767-b4356005-565e-4711-8a6c-3da356069693.png)

同样的面积，能够存放的元器件有限。存储容量小，价格高。

MLC（Multi-Level Cell）、TLC（Triple-Level Cell）以及 QLC（Quad-Level Cell）：能在一个电容里面存下 2 个、3 个乃至 4 个比特。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648963784631-81927b47-709d-4b87-b3b7-92f258854ef5.png)

4 个比特一共可以从 0000-1111 表示 16 个不同的数。往电容里面充电的时候充上 15 个不同的电压，并且电压计能够区分出这 15 个不同的电压，电容被放空代表的 0，代表从 0000-1111 这样 4 个比特。

充电和读取的时候，对于精度的要求越高，导致充电和读取更慢。

## P/E 擦写问题

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648964063419-a4a8d69b-206f-4bf3-a917-aaa87c263595.png)

### FTL

闪存转换层（Flash-Translation Layer）

### 实际 I/O 设备

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648964284030-34d66254-d7c1-47d9-85ae-a321785b4ef6.png)

SSD 的读取和写入的基本单位，不是一个比特（bit）或者一个字节（byte），而是一个页（Page）。SSD 的擦除单位不能按照比特或者字节或页来擦除，必须按照块来擦除。

## SSD 读写的生命周期

白色：页从来没有写入过数据

绿色：写入的是有效的数据

红色：数据在系统看来已经是删除的

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648965976051-4740c16b-1a6e-402b-bf43-74b0f291c325.png)

![预留空间（Over Provisioning）](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648966082781-7b97a561-823c-4e09-b4fa-c64e94cb414e.png)

## 磨损均衡、TRIM 和写入放大效应

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648969455461-b9c2437d-725d-4ef0-ac9d-e192ccb3ed02.png)

### FTL 和磨损均衡

磨损均衡（Wear-Leveling）：让 SSD 硬盘各个块的擦除次数，均匀分摊到各个块上。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648970073308-d1afa0a5-12ec-48cc-9bcd-907ece5c1286.png)

### TRIM 指令的支持

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648970471194-7dec6f7d-9eb0-4368-9153-8e368fe97406.png)

操作系统对于文件的删除，SSD 硬盘不知道。为了磨损均衡搬运已经删除的数据，产生不必要的数据读写和擦除。

TRIM 命令在文件被删除的时候，让操作系统通知 SSD 硬盘对应的逻辑块已经标记成已删除。

### 写入放大

写入新数据时可能没有足够的空白，需要进行垃圾回收，合并一些块里面的页再擦除掉一些页。在后台定时进行垃圾回收，在硬盘比较空闲的时候，把搬运数据、擦除数据、留出空白的块的工作做完。
