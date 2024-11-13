## 基于 TCP 协议的 Socket 程序函数调用过程

![基于 TCP 协议的 Socket 程序函数调用过程](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650096391820-2377d442-f7cd-4877-9407-520932a202e4.png)

![整体数据结构](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650096436864-8fbf0b58-0412-4e79-8df8-956e4e01dbad.png)

## 基于 UDP 协议的 Socket 程序函数调用过程

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650096477080-bbf876ea-3cff-4cb3-8443-9138f6efcb91.png)

## 服务器多链接

`{本机IP, 本机端口, 对端IP, 对端端口}`

- 多进程方式
- 多线程方式
- IO 多路复用，一个线程维护多个 Socket
- IO 多路复用，主动通知
