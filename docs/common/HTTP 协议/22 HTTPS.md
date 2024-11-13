## HTTP

明文传输过程完全透明，任何人都能够在链路中截获、修改或者伪造请求 / 响应报文，数据不具有可信性。

## 安全

- 机密性（Secrecy/Confidentiality）：指对数据的保密，只能由可信的人访问，对其他人是不可见的
- 完整性（Integrity，也叫一致性）：指数据在传输过程中没有被篡改，不多也不少，完完整整地保持着原状。
- 身份认证（Authentication）：指确认对方的真实身份，保证消息只能发送给可信的人。
- 不可否认（Non-repudiation/Undeniable）也叫不可抵赖：指不能否认已经发生过的行为。

## HTTPS

默认端口号 443，把 HTTP 下层的传输协议由 TCP/IP 换成了 SSL/TLS，由 HTTP over TCP/IP 变成了 HTTP over SSL/TLS ，让 HTTP 运行在了安全的 SSL/TLS 协议上，收发报文不再使用 Socket API，而是调用专门的安全接口。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1653731222806-50126583-8fb4-4b44-aa9f-c3fc75cf3397.png)

## SSL/TLS

SSL 即安全套接层（Secure Sockets Layer），在 OSI 模型中处于第 5 层（会话层），由网景公司于 1994 年发明。互联网工程组 IETF 在 1999 年把它改名为 TLS（传输层安全，Transport Layer Security），正式标准化，TLS1.0 实际上就是 SSLv3.1。

TLS 由记录协议、握手协议、警告协议、变更密码规范协议、扩展协议等几个子协议组成，综合使用了对称加密、非对称加密、身份认证等许多密码学前沿技术。

浏览器和服务器在使用 TLS 建立连接时需要选择一组恰当的加密算法来实现安全通信，这些算法的组合被称为密码套件（cipher suite，也叫加密套件）。

![握手时使用 ECDHE 算法进行密钥交换，用 RSA 签名和身份认证，握手后的通信使用 AES 对称算法，密钥长度 256 位，分组模式是 GCM，摘要算法 SHA384 用于消息认证和产生随机数](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1653731562816-fff121d9-057c-464c-8fad-f3e19615cbd2.png)

TLS 的密码套件命名格式很是“密钥交换算法 + 签名算法 + 对称加密算法 + 摘要算法”。

## OpenSSL

是一个著名的开源密码学程序库和工具包，几乎支持所有公开的加密算法和协议，已经成为了事实上的标准，许多应用软件都会使用它作为底层库来实现 TLS 功能，包括常用的 Web 服务器 Apache、Nginx 等。
