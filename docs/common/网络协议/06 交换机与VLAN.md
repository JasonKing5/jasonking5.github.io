## 拓扑结构
![](/images/1650078134753-8cb1c626-9d39-4bd3-82ed-21946f493894.png)

## 环路问题
![](/images/1650078267504-bdb099b8-1fc6-449d-8d06-589538b28d36.png)

## STP 协议
数据结构中，有一个方法叫做最小生成树，有环的称为图。将图中的环破了，就生成了树。在计算机网络中，生成树的算法叫作 STP，全称 Spanning Tree Protocol。

![](/images/1650078380636-92372cee-2459-46ce-aef8-c0472d023e11.png)

Root Bridge，根交换机。

Designated Bridges，指定交换机。

Bridge Protocol Data Units （BPDU） ，网桥协议数据单元。

Priority Vector，优先级向量。

## STP 的工作过程
![](/images/1650078592094-d9ee21a5-575d-442e-8aac-fa7d062c3be7.png)

## 广播问题和安全问题
物理隔离：每个部门有单独的交换机，配置单独的子网

虚拟隔离：使用 VLAN，一个交换机上连属于多个局域网的机器

