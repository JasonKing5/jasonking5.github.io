## 概览
### 系统底层相关
以 Linux 系统为主，学习 Linux 内核，以及内存、网络、异步 I/O 模型、Lock-free 的无锁编程，以及其它和系统底层相关的知识

### 数据库相关
MySQL 和各种开源 NoSQL 的一些相关知识，主要对这些数据库的内在有一定的了解

### 分布式架构
架构入门、分布式理论中，以及分布式工程设计方面的知识

### 微服务
介绍微服务架构，比较一下微服务和 SOA 的差别，以及一些工程实践和最佳实践

### 容器化和自动化运维
主要学习 Docker 和 Kubernetes 等自动化运维技术

### 机器学习和人工智能
介绍一些基础性的知识，其中包括基本原理、图书、课程、文章和相关的算法

### 前端开发
学习前端开发所需要知道的基础知识，了解浏览器是怎样工作的，以及相关的网络协议和一些性能优化的技巧，还有 JavaScript 框架、函数式编程等学习

### 信息源
各大公司的技术 Blog，以及相关的论文集散地

## Linux 系统相关
+ [Red Hat Enterprise Linux](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9) 文档 老牌 Linux 厂商 Red Hat 出品的面向商业的 Linux 发行版
+ [Linux Insides](https://github.com/0xAX/linux-insides) 讲述 Linux 内核是怎样启动、初始化以及进行管理的
+ [LWN’s kernel page](http://lwn.net/Kernel/Index/) 解释 Linux 内核的一些东西
+ [Learn Linux Kernel from Android Perspective](http://learnlinuxconcepts.blogspot.com/2014/10/this-blog-is-to-help-those-students-and.html) 从 Android 的角度来学习 Linux 内核
+ [Linux Kernel Doc](https://www.kernel.org/doc/) Linux 的内核文档
+ [Kernel Planet](http://planet.kernel.org/) Linux 内核开发者的 Blog
+ [Linux Performance and Tuning Guidelines](https://lenovopress.com/redp4285.pdf) IBM 出的红皮书
+ [TLK: The Linux Kernel](http://tldp.org/LDP/tlk/tlk.html) 了解前人的思路
+ [Linux Performance](https://www.brendangregg.com/linuxperf.html) 提供了和 Linux 系统性能相关的各种工具和文章收集
+ [Optimizing web servers for high throughput and low latency](https://blogs.dropbox.com/tech/2017/09/optimizing-web-servers-for-high-throughput-and-low-latency/) 非常底层的系统调优的文章，可以学到很多底层的性能调优的经验和知识

## 内存相关
+ What every programmer should know about memory
    - [Part 1: Introduction](https://lwn.net/Articles/250967/)
    - [Part 2: CPU caches](https://lwn.net/Articles/252125/)
    - [Part 3 (Virtual memory)](http://lwn.net/Articles/253361/)
    - [Part 4 (NUMA systems)](https://lwn.net/Articles/254445/)
    - [Part 5 (What programmers can do - cache optimization)](http://lwn.net/Articles/255364/)
    - [Part 6 (What programmers can do - multi-threaded optimizations)](https://lwn.net/Articles/256433/)
    - [Part 7 (Memory performance tools)](https://lwn.net/Articles/257209/)
    - [Part 8 (Future technologies)](https://lwn.net/Articles/258154/)
    - [Part 9 (Appendices and bibliography)](https://lwn.net/Articles/258188/)
+ Memory Barriers: a Hardware View for Software Hackers 内存的读写屏障是线程并发访问共享的内存数据时，从程序本身、编译器到 CPU 都必须遵循的一个规范
+ [A Tutorial Introduction to the ARM and POWER Relaxed Memory Models](https://www.cl.cam.ac.uk/~pes20/ppc-supplemental/test7.pdf) 对 ARM 和 POWER 的宽松内存模型的一个教程式的简介
+ [x86-TSO: A Rigorous and Usable Programmer’s Model for x86 Multiprocessors](https://www.cl.cam.ac.uk/~pes20/weakmemory/cacm.pdf) 介绍 x86 的多处理器内存并发访问的一致性模型 TSO
+ [ptmalloc glibc](http://www.malloc.de/en/) 的内存分配管理
+ [tcmalloc](https://github.com/gperftools/gperftools) Google 的内存分配管理模块
+ [jemalloc](http://jemalloc.net/) BSD 提供的内存分配管理
+ 内存分配器的一些比较和工程实践
    - [ptmalloc，tcmalloc 和 jemalloc 内存分配策略研究](https://owent.net/2013/867.html)
    - [内存优化总结：ptmalloc、tcmalloc 和 jemalloc](http://www.cnhalo.net/2016/06/13/memory-optimize/)
    - [Scalable memory allocation using jemalloc](https://www.facebook.com/notes/facebook-engineering/scalable-memory-allocation-using-jemalloc/480222803919)
    - [Decreasing RAM Usage by 40% Using jemalloc with Python & Celery](https://zapier.com/engineering/celery-python-jemalloc/)

## 计算机网络
### 网络学习
+ [《计算机网络（第五版）》](https://book.douban.com/subject/10510747/) 按照网络协议模型自下而上（物理层、数据链路层、介质访问控制层、网络层、传输层和应用层）有系统地介绍了计算机网络的基本原理，并结合 Internet 给出了大量的协议实例
+ [Computer Network Design](http://www.site.uottawa.ca/~shervin/courses/ceg4185/lectures/) 渥汰华大学的课程讲义
+ [Computer Network Tutorials](https://www.geeksforgeeks.org/computer-network-tutorials/) GeeksforGeeks 上面的简单教程

### 网络调优
+ [Linux Advanced Routing & Traffic Control HOWTO](https://lartc.org/) 非常容易上手的关于 iproute2、流量整形和一点 Netfilter 的指南
+ [Red Hat Enterprise Linux Network Performance Tuning Guide](https://access.redhat.com/sites/default/files/attachments/20150325_network_performance_tuning.pdf) 学习网络调优
+ [Awesome Pcap Tools](https://github.com/caesar0301/awesome-pcaptools) 罗列了各种网络工具，用来调试网络相关的程序
+ [Making Linux TCP Fast](https://netdevconf.org/1.2/papers/bbr-netdev-1.2.new.new.pdf)  TCP 调优
+ 网络栈相关的底层文章
    - [Monitoring and Tuning the Linux Networking Stack: Receiving Data](https://blog.packagecloud.io/monitoring-tuning-linux-networking-stack-receiving-data/)
    - [Monitoring and Tuning the Linux Networking Stack: Sending Data](https://blog.packagecloud.io/monitoring-tuning-linux-networking-stack-sending-data/)

### 网络协议
+ 链路层
    - [RFC 826 - An Ethernet Address Resolution Protocol](https://tools.ietf.org/html/rfc826)
    - [RFC 1853 - IP in IP Tunneling](https://tools.ietf.org/html/rfc1853)
    - [RFC 2784 - Generic Routing Encapsulation (GRE)](https://www.rfc-editor.org/rfc/rfc2784)
    - [RFC 2661 - Layer Two Tunneling Protocol “L2TP”](https://www.rfc-editor.org/rfc/rfc2661)
    - [RFC 2637 - Point-to-Point Tunneling Protocol (PPTP)](https://www.rfc-editor.org/rfc/rfc2637)
+ TCP/IP
    - [RFC 793 - Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc793) 最初的 TCP 标准定义，但不包括 TCP 相关细节
    - [RFC 813 - Window and Acknowledgement Strategy in TCP](https://www.rfc-editor.org/rfc/rfc813) TCP 窗口与确认策略，并讨论了在使用该机制时可能遇到的问题及解决方法
    - [RFC 879 - The TCP Maximum Segment Size and Related Topics](https://www.rfc-editor.org/rfc/rfc879) 讨论 MSS 参数对控制 TCP 分组大小的重要性，以及该参数与 IP 分段大小的关系等
    - [RFC 896 - Congestion Control in IP/TCP Internetworks](https://tools.ietf.org/html/rfc896) 讨论拥塞问题和 TCP 如何控制拥塞
    - [RFC 2581 - TCP Congestion Control](https://tools.ietf.org/html/rfc2581) 描述用于拥塞控制的四种机制：慢启动、拥塞防御、快重传和快恢复
    - [RFC 2018 - TCP Selective Acknowledgment Options](https://tools.ietf.org/html/rfc2018) TCP 的选择确认
    - [RFC 2883 - An Extension to the Selective Acknowledgement (SACK) Option for TCP](https://www.rfc-editor.org/rfc/rfc2883) 对于 RFC 2018 的改进
    - [RFC 2988 - Computing TCP’s Retransmission Timer](https://tools.ietf.org/html/rfc2988) 讨论与 TCP 重传计时器设置相关的话题，重传计时器控制报文在重传前应等待多长时间
    - [RFC 6298 - Computing TCP’s Retransmission Timer](https://tools.ietf.org/html/rfc6298) TCP Jacobson/Karels Algorithm 重传算法
+ HTTP
    - [《HTTP 权威指南 》](https://book.douban.com/subject/10746113/) 参考书
    - [RFC 2616](https://tools.ietf.org/html/rfc2616) HTTP 1.1 的原始 RFC
    - [RFC 7230 - Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing](https://tools.ietf.org/html/rfc7230)
    - [RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://tools.ietf.org/html/rfc7231)
    - [RFC 7232 - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests](https://tools.ietf.org/html/rfc7232)
    - [RFC 7233 - Hypertext Transfer Protocol (HTTP/1.1): Range Requests](https://www.rfc-editor.org/rfc/rfc7233)
    - [RFC 7234 - Hypertext Transfer Protocol (HTTP/1.1): Caching](https://tools.ietf.org/html/rfc7234)
    - [RFC 7235 - Hypertext Transfer Protocol (HTTP/1.1): Authentication](https://tools.ietf.org/html/rfc7235)
    - [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2)
    - [Gitbook - HTTP/2 详解](https://legacy.gitbook.com/book/ye11ow/http2-explained/details)
    - [http2 explained](http://daniel.haxx.se/http2/)
    - [HTTP/2 for a Faster Web](https://cascadingmedia.com/insites/2015/03/http-2.html)
    - [Nginx HTTP/2 白皮书](https://www.nginx.com/wp-content/uploads/2015/09/NGINX_HTTP2_White_Paper_v4.pdf)
    - [RFC 7540 - Hypertext Transfer Protocol Version 2 (HTTP/2) ](https://httpwg.org/specs/rfc7540.html) HTTP/2 的协议本身
    - [RFC 7541 - HPACK: Header Compression for HTTP/2](https://httpwg.org/specs/rfc7541.html)  HTTP/2 的压缩算法
    - [Internet Protocol Suite](https://en.wikipedia.org/wiki/Internet_protocol_suite) 了解相关术语和知识

