连接就是两端数据结构状态的协同，两边的状态能够对得上。符合 TCP 协议的规则，就认为连接存在；两面状态对不上，连接断开。

流量控制和拥塞控制是根据收到的对端的网络包，调整两端数据结构的状态。TCP 协议理论上认为调整数据结构的状态，就进行了流量控制和拥塞控制，但在通路上是不是真的做到了不关心。

可靠是两端的数据结构对数据进行处理。不丢失是数据结构逐一确认，顺序到达是数据结构在排序，面向数据流其实是数据结构将零散的包，按照顺序排列成一个流发给应用层。

socket 函数`int socket(int domain, int type, int protocol);`

- domain：IP 层协议。
  - AF_INET 表示 IPv4
  - AF_INET6 表示 IPv6。
- type：socket 类型。
  - SOCK_STREAM ：面向流（TCP）
  - SOCK_DGRAM：面向数据报（UDP）
  - SOCK_RAW： 可以直接操作 IP 层，或者非 TCP 和 UDP 的协议（ICMP）
- protocol ：协议，
  - IPPROTO_TCP
  - IPPTOTO_UDP

## 针对 TCP 编程

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649769010420-36233c35-b952-46b2-8c6c-ac2a699c2312.png)

服务端调用 listen 进入 LISTEN 状态，等待客户端进行连接`int listen(int sockfd, int backlog);`

客户端通过 connect 函数发起连接`int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);`

![三次握手的序列图及对应的状态转换](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649769205824-584cd00c-80bd-4062-9738-44f1e0810420.png)

参数中指明要连接的 IP 地址和端口号，然后发起三次握手。内核给客户端分配一个临时的端口。握手成功后服务端的 accept 返回已连接的 socket。

成功连接建立之后，双方开始通过 read 和 write 函数来读写数据，就像往一个文件流里读写数据一样。

## 针对 UDP 编程

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649769993918-fe9fd1f6-e310-4271-8094-025d5d2ec47b.png)

UDP 连接时既都是客户端，也同时都是服务端。每一个 UDP 的 socket 都需要 bind。每次通信时调用 sendto 和 recvfrom，都要传入 IP 地址和端口。
