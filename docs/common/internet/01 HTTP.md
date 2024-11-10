## What is HTTP

HTTP is a protocol for communicating between a web browser and a web server.

- based on TCP/IP
- uses port 80(HTTP) or 443(HTTPS)

## HTTP/0.9

[HTTP/0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html)

- only GET method
- no headers
- resopnse had to be HTML

```json title="request"
GET /index.html
```

```json title="response"
(response body)
(connection closed)
```

## HTTP/1.0

- multi response formats (images, video files, plain text...)
- more methods (POST, HEAD)
- add request/response headers
- add status codes
- character set support
- authorization
- caching
- content encoding

```json title="request"
GET / HTTP/1.0
Host: cs.fyi
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
Accept: */*
```

```json title="response"
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

(response body)
(connection closed)
```

## Three-way handshake

- SYN - client sends SYN
- SYN/ACK - server sends SYN/ACK
- ACK - client sends ACK

![three-way handshake](/images/image.png)

:::tip
Connection: keep-alive

keep the connection open for multiple requests
:::

## HTTP/1.1

- add PUT, PATCH, OPTIONS, DELETE
- hostname identification
- persistent connections
- pipelining (Content-Length / chunked encoding)
- chunked transfer
- digest and proxy authentication
- caching
- byte ranges
- character sets
- language negotiation
- client cookies
- enhanced compression support
- new status codes

[HTTP/1.1 vs HTTP/1.0](https://www.ra.ethz.ch/cdstore/www8/data/2136/pdf/pd1.pdf)

[HTTP/1.1 RFC](https://datatracker.ietf.org/doc/html/rfc2616)

### enhancements

- use of spritesheets
- encoded images in CSS
- single humungous CSS/Javascript files
- domain sharding

## SPDY

decrease latency to improve web performance

- multiplexing
- compression
- prioritization
- security

## HTTP/2

- binary protocol
- multiplexing
- header compression
- server push
- request prioritization
- security
