## 配置 IP 地址

```bash
$ sudo ifconfig eth1 10.0.0.1/24
$ sudo ifconfig eth1 up
```

```bash
$ sudo ip addr add 10.0.0.1/24 dev eth1
$ sudo ip link set up eth1
```

Linux 默认跨网段的调用不会直接将包发送到网络上，而是将包发送到网关。

## 动态主机配置协议（DHCP）

配置一段共享的 IP 地址,每台新接入的机器都通过 DHCP 协议，来这个共享的 IP 地址里申请，然后自动配置。用完了还回去，其他的机器也能用。

## 解析 DHCP 的工作方式

新机器使用 IP 地址 0.0.0.0 发送一个广播包，目的 IP 地址为 255.255.255.255。广播包封装了 UDP，UDP 封装了 BOOTP。

DHCP Offer 发送 IP 地址 给客户机，DHCP Server 接收到客户机的 DHCP request 之后，会广播返回给客户机一个 DHCP ACK 消息包，表明已经接受客户机的选择，并将这一 IP 地址的合法租用信息和其他的配置信息都放入该广播包发给客户机，并广播给大家。

## IP 地址的收回和续租

客户机会在租期过去 50% 的时候，直接向为其提供 IP 地址的 DHCP Server 发送 DHCP request 消息包。客户机接收到该服务器回应的 DHCP ACK 消息包，会根据包中所提供的新的租期以及其他已经更新的 TCP/IP 参数，更新自己的配置。

## 预启动执行环境（PXE）

在 BIOS 启动之后安装操作系统的过程，叫做预启动执行环境（Pre-boot Execution Environment），简称 PXE。

## 解析 PXE 的工作过程

- 启动 PXE 客户端，DHCP Server 租一个 IP 地址，同时给它 PXE 服务器的地址、启动文件 pxelinux.0。
- PXE 客户端去 PXE 服务器下载文件初始化机器。
- PXE 客户端收到文件后开始执行。
- 启动 Linux 内核。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650029818377-524f73b2-2ad5-407a-9e9d-4675df572d36.png)
