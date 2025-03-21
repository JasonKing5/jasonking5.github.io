## ICMP 协议的格式

ICMP 全称 Internet Control Message Protocol，就是互联网控制报文协议。

ICMP 报文是封装在 IP 包里面的。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650079285663-7db789e3-76e9-453c-82f1-871a32d2258b.png)

## 查询报文类型

查询报文类型 ping，是一种主动请求，并且获得主动应答的 ICMP 协议。

## 差错报文类型

终点不可达为 3，源抑制为 4，超时为 11，重定向为 5。

## ping：查询报文类型的使用

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650080399093-9842e0b2-a3bb-456c-9f85-eb32743d590c.png)

## Traceroute：差错报文类型的使用

- 设置特殊的 TTL，来追踪去往目的地时沿途经过的路由器。
- 设置不分片，从而确定路径的 MTU。
