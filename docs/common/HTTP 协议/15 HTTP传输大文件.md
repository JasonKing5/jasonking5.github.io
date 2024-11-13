## 数据压缩

浏览器在发送请求时带着 Accept-Encoding 头字段，里面是浏览器支持的压缩格式列表（gzip、deflate、br 等），服务器可以从中选择一种压缩算法，放进 Content-Encoding 响应头里，再把原数据压缩后发给浏览器。

gzip 等压缩算法通常只对文本文件有较好的压缩率，而图片、音频视频等多媒体数据本身就已经是高度压缩的，再用 gzip 处理也不会变小（甚至还有可能会增大一点）。

## 分块传输

大文件如果整体不能变小，可以把它拆开，分解成多个小块，分批发给浏览器，浏览器收到后再组装复原。

HTTP 协议里用 chunked 分块传输编码的思路，在响应报文里用头字段 Transfer-Encoding: chunked 表示，指报文里的 body 部分是分成了许多的块（chunk）逐个发送。

分块传输也可以用于流式数据，由数据库动态生成的表单页面，body 数据的长度是未知的，无法在头字段 Content-Length 里给出确切的长度，只能用 chunked 方式分块发送。

分块传输的编码规则：

1. 每个分块包含两个部分，长度头和数据块；
2. 长度头是以 CRLF（回车换行，即\r\n）结尾的一行明文，用 16 进制数字表示长度；
3. 数据块紧跟在长度头后，最后也用 CRLF 结尾，但数据不包含 CRLF；
4. 最后用一个长度为 0 的块表示结束，即“0\r\n\r\n”。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651984153830-19f0d3b5-a36b-4fdd-9ec8-12ee0c220e06.png)

## 范围请求

视频跳过片头或快进几分钟，其实是想获取一个大文件其中的片段数据，而分块传输并没有这个能力。

范围请求（range requests）：允许客户端在请求头里使用专用字段来表示只获取文件的一部分。服务器必须在响应头里使用字段 Accept-Ranges: bytes 明确告知客户端支持范围请求。

请求头 Range 是 HTTP 范围请求的专用字段，格式是 bytes=x-y ， x 和 y 是以字节为单位的数据范围。x、y 表示的是偏移量，范围必须从 0 计数，前 10 个字节表示为 0-9，第二个 10 字节表示为 10-19，0-10 实际上是前 11 个字节。

起点 x 和终点 y 可以省略，假设文件是 100 个字节：

- 0- 表示从文档起点到文档终点，相当于 0-99，即整个文件；
- 10- 表示从第 10 个字节开始到文档末尾，相当于 10-99；
- -1 表示文档的最后一个字节，相当于 99-99 ；
- -10 表示从文档末尾倒数 10 个字节，相当于 90-99。

服务器收到 Range 字段后：

1. 检查范围是否合法，假设文件只有 100 个字节，但请求 200-300 ，范围越界，服务器会返回状态码 416，表示范围请求有误。
2. 如果范围正确，服务器根据 Range 头计算偏移量，读取文件的片段，返回状态码 206 Partial Content，和 200 的意思差不多，但表示 body 只是原数据的一部分。
3. 服务器添加一个响应头字段 Content-Range，告诉片段的实际偏移量和资源的总大小，格式是 bytes x-y/length（对于 0-10 的范围请求，值就是 bytes 0-10/100 ）。
4. 发送数据，直接把片段用 TCP 发给客户端。

```javascript
GET /16-2 HTTP/1.1
Host: www.test.com
Range: bytes=0-31

HTTP/1.1 206 Partial Content
Content-Length: 32
Accept-Ranges: bytes
Content-Range: bytes 0-31/96
```

下载工具里的多段下载、断点续传等实现原理：

1. 先发个 HEAD，看服务器是否支持范围请求，同时获取文件的大小；
2. 开 N 个线程，每个线程使用 Range 字段划分出各自负责下载的片段，发请求传输数据；
3. 如果下载意外中断，不必重头再来一遍，只要根据上次的下载记录，用 Range 请求剩下的那一部分就可以了。

## 多段数据

范围请求一次只获取一个片段，还支持在 Range 头里使用多个 x-y，一次性获取多个片段数据。这种情况需要使用一种特殊的 MIME 类型：multipart/byteranges，表示报文的 body 是由多段字节序列组成的，并且还要用一个参数 boundary=xxx 给出段之间的分隔标记。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1652019607071-5c7d4f5e-cf45-4be9-a093-4c6d8c14e867.png)

```javascript
// request
GET /16-2 HTTP/1.1
Host: www.test.com
Range: bytes=0-9, 20-29

// response
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000000001
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000000001
Content-Type: text/plain
Content-Range: bytes 0-9/96

// this is
--00000000001
Content-Type: text/plain
Content-Range: bytes 20-29/96

ext json d
--00000000001--
```
