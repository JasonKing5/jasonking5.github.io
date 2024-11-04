## HTTPS 建立连接
TCP 协议建立连接后，需要再用另外一个握手过程，在 TCP 上建立安全连接，之后才能收发 HTTP 报文。

## TLS 协议的组成
### 记录协议（Record Protocol）
规定了 TLS 收发数据的基本单位：记录（record），所有的其他子协议都需要通过记录协议发出。但多个记录数据可以在一个 TCP 包里一次性发出，不需要像 TCP 那样返回 ACK。

### 警报协议（Alert Protocol）
向对方发出警报信息，类似 HTTP 协议里的状态码。protocol_version ：不支持旧版本，bad_certificate ：证书有问题，收到警报后另一方可以选择继续，也可以立即终止连接。

### 握手协议（Handshake Protocol）
浏览器和服务器会在握手过程中协商 TLS 版本号、随机数、密码套件等信息，然后交换证书和密钥参数，最终双方协商得到会话密钥，用于后续的混合加密系统。

### 变更密码规范协议（Change Cipher Spec Protocol）
是一个通知，告诉对方后续的数据都将使用加密保护。

![](/images/1653734230006-9e3eabea-1a3d-4d8b-b320-979aec07dc45.png)

