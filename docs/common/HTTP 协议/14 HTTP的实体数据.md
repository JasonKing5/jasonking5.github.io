## 数据类型与编码
MIME type：借用邮件中多用途互联网邮件扩展（Multipurpose Internet Mail Extensions）的一部分，把数据分成八大类，每个大类下再细分出多个子类，形式是 type/subtype 的字符串：

+ text：文本格式的可读数据，text/html：超文本文档，text/plain：纯文本、text/css：样式表等；
+ image：图像文件，image/gif、image/jpeg、image/png 等。
+ audio/video：音频和视频数据，audio/mpeg、video/mp4 等。
+ application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。application/json，application/javascript、application/pdf 等，不知道数据是什么类型，用 application/octet-stream，即不透明的二进制数据。

传输时为了节约带宽，可以压缩数据，Encoding type 表示数据编码格式。

+ gzip：GNU zip 压缩格式，互联网上最流行的压缩格式；
+ deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
+ br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

## 数据类型使用的头字段
协议为此定义了两个 Accept 请求头字段和两个 Content 实体头字段，用于客户端和服务器进行内容协商。

![](/images/1651974612121-cf6e4290-77ad-4461-a960-ac08a2e970fb.png)

Accept 字段标记客户端可理解的 MIME type，可以用 , 做分隔符列出多个类型，让服务器有更多的选择：

```javascript
Accept: text/html,application/xml,image/webp,image/png
```

服务器会在响应报文里用头字段 Content-Type 告诉实体数据的真实类型：

```javascript
Content-Type: text/html
Content-Type: image/png
```

Accept-Encoding 字段是客户端支持的压缩格式，可以用 , 列出多个，服务器可以选择其中一种来压缩数据，实际使用的压缩格式放在响应头字段 Content-Encoding 里：

```javascript
Accept-Encoding: gzip, deflate, br
Content-Encoding: gzip
```

这两个字段可以省略，表示客户端不支持压缩数据或响应数据没有被压缩。

## 语言类型与编码
解决国际化的问题。

语言类型：人类使用的自然语言，例如英语、汉语、日语等，自然语言可能还有下属的地区性方言，在需要明确区分的时候使用 type-subtype 的形式：

+ en：任意的英语
+ en-US：美式英语
+ en-GB：英式英语
+ zh-CN：最常使用的汉语
+ 香港：中国香港



字符集：字符编码方式来处理文字的集合：

+ 英语的 ASCII
+ 汉语的 GBK、BIG5
+ 日语的 Shift_JIS
+ Unicode 和 UTF-8，把世界上所有的语言都容纳在一种编码方案里，遵循 UTF-8 字符编码方式的 Unicode 字符集成为了互联网上的标准字符集

## 语言类型使用的头字段
使用 Accept 请求头字段和 Content 实体头字段，用于客户端和服务器就语言与编码进行内容协商。

Accept-Language 字段标记客户端可理解的自然语言，用 , 做分隔符列出多个类型：

```javascript
Accept-Language: zh-CN, zh, en
```

服务器在响应报文里用头字段 Content-Language 告诉客户端实体数据使用的实际语言类型：

```javascript
Content-Language: zh-CN
```

字符集使用 Accept-Charset 字段标记，响应头里对应的是 Content-Type 字段，用 charset=xxx 来表示：

```javascript
Accept-Charset: gbk, utf-8
Content-Type: text/html; charset=utf-8
```

![](/images/1651976815272-56de39ab-1329-4ef6-b620-552144e03f46.png)

使用的语言可以由字符集推断出来，请求头里一般只会有 Accept-Language 字段，响应头里只会有 Content-Type 字段。

## 内容协商的质量值
协议里用 Accept、Accept-Encoding、Accept-Language 等请求头字段进行内容协商时，可以用一种特殊的 q（quality factor）参数表示权重来设定优先级。



权重范围是 0.01~1，默认 1，0 表示拒绝。在数据类型或语言代码后面加一个 ; ，然后是 q=value ：

```javascript
Accept: text/html,application/xml;q=0.9,*/*;q=0.8
```

HTML 文件权重是 1，XML 文件权重是 0.9，任意数据类型权重是 0.8。服务器收到请求头后，会计算权重，再根据自己的实际情况优先输出 HTML 或者 XML。

## 内容协商的结果
Web 服务器在内容协商时使用的算法都不一样。服务器会在响应头里多加一个 Vary 字段，记录服务器在内容协商时参考的请求头字段：

```javascript
Vary: Accept-Encoding,User-Agent,Accept
```

这个 Vary 字段表示服务器依据了 Accept-Encoding、User-Agent 和 Accept 这三个头字段，然后决定了发回的响应报文。Accept 等请求头变化时，Vary会一起变化。即同一个 URI 可能会有多个不同的版本，主要用在传输链路中间的代理服务器实现缓存服务。

