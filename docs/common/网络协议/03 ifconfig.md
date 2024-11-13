IP 地址是一个网卡在网络世界的通讯地址，相当于现实世界的门牌号码。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649940978134-8dabab9e-39c9-4b6f-993c-e4151d7de736.png)

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649941073869-f7e8f537-df54-4d24-be33-dc6f9bc518d2.png)

```bash
root@test:~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether fa:16:3e:c7:79:75 brd ff:ff:ff:ff:ff:ff
    inet 10.100.122.2/24 brd 10.100.122.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fec7:7975/64 scope link
       valid_lft forever preferred_lft forever
```

## 无类型域间选路（CIDR）

将 32 位的 IP 地址一分为二，前面是网络号，后面是主机号。10.100.122.2/24，这个 IP 地址中有一个斜杠，斜杠后面有个数字 24。这种地址表示形式就是 CIDR。后面 24 的意思是，32 位中前 24 位是网络号，后 8 位是主机号。

广播地址 10.100.122.255：如果发送这个地址，所有 10.100.122 网络里面的机器都可以收到。

子网掩码 255.255.255.0。

将子网掩码和 IP 地址按位计算 AND 得到网络号。

## 公有 IP 地址和私有 IP 地址

公有 IP 地址组织统一分配，私有 IP 地址个人或组织私自分配。（/24 或 /16 的 CIDR）

Wi-Fi 路由器的地址是 192.168.0.1，广播地址是 192.168.0.255，发送广播地址，整个 192.168.0 网络里面的所有机器都能收到。

eth0 网卡是 global，这张网卡是可以对外的，可以接收来自各个地方的包。lo 是 host，这张网卡仅仅可以供本机相互通信。lo 全称是 loopback，又称环回接口，往往会被分配到 127.0.0.1 这个地址。这个地址用于本机通信，经过内核处理后直接返回，不会在任何网络中出现。

## MAC 地址

MAC 地址是一个网卡的物理地址，用十六进制，6 个 byte 表示。MAC 地址像是身份证，是一个唯一的标识。唯一性设计是为了组网的时候，不同的网卡放在一个网络里面的时候，可以不用担心冲突。

MAC 地址的通信范围局限在一个子网里面。

## 网络设备的状态标识

\<BROADCAST,MULTICAST,UP,LOWER_UP\> 叫做 net_device flags，网络设备的状态标识。

UP 表示网卡处于启动的状态；

BROADCAST 表示这个网卡有广播地址，可以发送广播包；

MULTICAST 表示网卡可以发送多播包；

LOWER_UP 表示 L1 是启动的，也即网线插着的。

MTU1500 是指最大传输单元 MTU 为 1500，这是以太网的默认值。

MTU 是二层 MAC 层的概念。MAC 层有 MAC 的头，以太网规定正文部分不允许超过 1500 个字节。正文里面有 IP 的头、TCP 的头、HTTP 的头。如果放不下，就需要分片来传输。

qdisc 全称是 queueing discipline，排队规则。内核如果需要通过某个网络接口发送数据包，需要按照为这个接口配置的 qdisc（排队规则）把数据包加入队列。

最简单的 qdisc 是 pfifo，它不对进入的数据包做任何的处理，数据包采用先入先出的方式通过队列。pfifo_fast 稍微复杂一些，它的队列包括三个波段（band）。在每个波段里面，使用先进先出规则。

三个波段（band）的优先级也不相同。band 0 的优先级最高，band 2 的最低。如果 band 0 里面有数据包，系统就不会处理 band 1 里面的数据包，band 1 和 band 2 之间也是一样。

数据包是按照服务类型（Type of Service，TOS）被分配到三个波段（band）里面的。TOS 是 IP 头里面的一个字段，代表了当前的包是高优先级的，还是低优先级的。
