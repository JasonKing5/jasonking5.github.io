## 简单、灵活、易于扩展
+ 简单，降低学习和使用的门槛
+ 请求方法、URI、状态码、原因短语、头字段等每一个核心组成要素都没有被写死，允许开发者任意定制、扩充或解释
+ 不限制具体的下层协议，不仅可以使用 TCP、UNIX Domain Socket，还可以使用 SSL/TLS，甚至是基于 UDP 的 QUIC，下层可以随意变化，而上层的语义则始终保持稳定

## 应用广泛、环境成熟
+ Web 页面或复杂的 JSON、XML 数据
+ 台式机上的浏览器或手机上的各种 APP
+ 新闻购物等网站、游戏
+ 不限定某种编程语言或者操作系统，跨语言、跨平台

## 无状态
+ 不需要额外的资源来记录状态信息，实现简单，减轻服务器的负担
+ 可以组成集群，让负载均衡把请求转发到任意一台服务器，轻松实现高并发高可用
+ 无法支持需要连续多个步骤的事务操作，开发验证麻烦，增加不必要的数据传输量

## 明文
协议里的报文（header 部分）不使用二进制数据，用简单可阅读的文本形式。

+ 不需要借助任何外部工具，用浏览器、Wireshark 或者 tcpdump 抓包后，可以直接查看或者修改，便于开发调试
+ 所有信息在传输链路的每一个环节上都会暴露，容易被窥视

## 不安全
+ 身份认证：怎么证明你就是你
+ 完整性校验：数据在传输过程中容易被篡改而无法验证真伪

## 性能
在互联网的特点是移动和高并发，不能保证稳定的连接质量

队头阻塞（Head-of-line blocking）：当顺序发送的请求序列中的一个请求因为某种原因被阻塞时，在后面排队的所有请求也一并被阻塞，会导致客户端迟迟收不到数据。

