[视频](https://meeting.tencent.com/user-center/shared-record-info?id=ba904403-4e15-437c-a3b7-060a7978e735&from=3&is-single=true)

## HTTP/0.9
+ 用来在网络之间传递 HTML 超文本的内容

![](/images/1643436119939-fb2c56c8-cf5b-4742-8d3f-506edc4045f8.png)

+ 请求流程
    1. 基于 TCP 协议，客户端根据 IP 地址，端口和服务器建立连接
    2. 发送 GET 请求行
    3. 服务器收到请求信息后，读取对应的 HTML 文件，将数据以 ASCII 字符流返回客户端
    4. HTML 文档传输完成后断开连接
+ 特点
    1. 只有请求行
    2. 服务器没有返回头
    3. 返回文件以 ASCII 字符流传输

## HTTP/1.0
+ 浏览器展示内容
    1. HTML文件，JavaScript，CSS，图片，音频，视频
    2. 需要支持多种类型文件下载
    3. 文件格式需要支持其他编码

![](/images/1643436382613-371fa169-e80f-492d-a106-05579218e685.png)

+ 请求头
    1. 告诉服务器期待返回的内容
    2. 文件类型
    3. 压缩方式
    4. 文件语言
    5. 文件编码
    6. 用户代理
+ 响应头
    1. 状态码
    2. Cache 机制

```javascript
// request header
accept: text/html
accept-encoding: gzip, deflate, br
accept-Charset: ISO-8859-1,utf-8
accept-language: zh-CN,zh

// response header
content-encoding: br
content-type: text/html; charset=UTF-8
```

## HTTP/1.1
+ 持久连接
    1. 同一个域名，默认允许同时建立 6 个 TCP 持久连接
    2. 存在队头阻塞

![](/images/1643436781265-784c1073-060d-4ba0-a771-54bfd4c4766b.png)![](/images/1643436843876-30f5d1c7-52f7-4324-a3b1-69f734b9758d.png)

+ HTTP 管线化
    1. 整批发送请求
    2. 服务器依然需要根据请求顺序来回复浏览器的请求
+ 支持虚拟主机
    1. Host 字段：一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址，请求头中增加了 Host 字段，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理
+ 对动态生成的内容支持
    1. Chunk transfer 机制
        1. 将数据分割成若干个任意大小的数据块
        2. 每个数据块发送时会附上上个数据块的长度
        3. 最后使用一个零长度的块作为发送数据完成的标志
+ 客户端 Cookie
+ 安全机制

