## 使用 IP 地址访问 Web 服务器

使用浏览器访问 `http://127.0.0.1`，访问本地部署的服务，通过 wireshark 抓包。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651799130129-6c376126-61a5-443a-8d2b-a5151e21c9e0.png)

## 抓包分析

使用三次握手建立与 Web 服务器的连接。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651799141393-e4e58c69-b62b-49f8-b6d5-dbbced7b1883.png)

send a http request

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651799155207-5036f4b3-2eb0-4120-b095-50067200c06f.png)

browser response server

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651799244372-c1b08fa2-ea21-4a66-9bc1-2582e8c1003a.png)

![HTTP请求交互图](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651799328731-71505d7b-a481-4982-ad50-aabc246b1e47.png)

1. 浏览器从地址栏的输入中获得服务器的 IP 地址和端口号；
2. 浏览器用 TCP 的三次握手与服务器建立连接；
3. 浏览器向服务器发送拼好的报文；
4. 服务器收到报文后处理请求，同样拼好报文再发给浏览器；
5. 浏览器解析报文，渲染输出页面。

## 使用域名访问 Web 服务器

域名解析时，浏览器先看自的缓存，如果没有就查看操作系统的缓存，还没有就查看本机域名解析文件 hosts`C:\WINDOWS\system32\drivers\etc\hosts`。

## 真实的网络世界

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651843437436-0081eb07-59f3-4dc9-8ae4-98f7420ae289.png)
