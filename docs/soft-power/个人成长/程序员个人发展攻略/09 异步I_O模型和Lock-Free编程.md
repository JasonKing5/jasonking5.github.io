## 异步 I/O 模型
《UNIX 网络编程》6.2 I/O Models 中介绍了五种 I/O 模型：

1. 阻塞 I/O
2. 非阻塞 I/O
3. I/O 的多路复用（select 和 poll）
4. 信号驱动的 I/O（SIGIO）
5. 异步 I/O（POSIX 的 aio_functions）



+ [Thousands of Threads and Blocking I/O: The Old Way to Write Java Servers Is New Again (and Way Better)](https://www.slideshare.net/e456/tyma-paulmultithreaded1) 回顾和比较了各种 I/O 模型，和各种细节的方案和说明
+ [Scalable IO in Java](http://gee.cs.oswego.edu/dl/cpjslides/nio.pdf) 了解相关概念
+ 各种异步 I/O 的实现和设计方式：
    - [IBM - Boost application performance using asynchronous I/O](https://developer.ibm.com/technologies/linux/articles/l-async/) 关于 AIO 的文章
    - [Lazy Asynchronous I/O For Event-Driven Servers](https://www.usenix.org/legacy/event/usenix04/tech/general/full_papers/elmeleegy/elmeleegy_html/html.html)
    - [Windows I/O Completion Ports](https://learn.microsoft.com/en-us/windows/win32/fileio/i-o-completion-ports) 异步 I/O 模型的 MSDN 手册，或更易懂的 [Inside I/O Completion Ports](http://sysinternals.d4rk4.ru/Information/IoCompletionPorts.html)。[I/O Processing](https://flylib.com/books/en/4.491.1.85/1/) Windows上的I/O
    - [Libevent 2.0 book](http://www.wangafu.net/~nickm/libevent-book/)
    - [Libuv Design Overview](http://docs.libuv.org/en/v1.x/design.html)

异步 I/O 模型的发展技术： select -> poll -> epoll -> aio -> libevent -> libuv

+ 编程模式——Reactor 模式
    - [Understanding Reactor Pattern: Thread-Based and Event-Driven](https://dzone.com/articles/understanding-reactor-pattern-thread-based-and-eve)
    - [Reactor Pattern](https://www.dre.vanderbilt.edu/~schmidt/PDF/Reactor2-93.pdf)
    - [The reactor pattern and non-blocking IO](https://www.celum.com/en/blog/technology/the-reactor-pattern-and-non-blocking-io)
+ [The Secret To 10 Million Concurrent Connections -The Kernel Is The Problem, Not The Solution](http://highscalability.com/blog/2013/5/13/the-secret-to-10-million-concurrent-connections-the-kernel-i.html) C10M 问题

## Lock-Free 编程相关
+ 关于无锁的数据结构
    - [Dr.Dobb’s: Lock-Free Data Structures](http://www.drdobbs.com/lock-free-data-structures/184401865)
    - [Andrei Alexandrescu: Lock-Free Data Structures](https://erdani.com/publications/cuj-2004-10.pdf)
+ [Is Parallel Programming Hard, And, If So, What Can You Do About It?](https://mirrors.edge.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook.html)
+ 了解并发编程中的一些概念
    - [Non-blocking algorithm](https://en.wikipedia.org/wiki/Non-blocking_algorithm)
    - [Read-copy-update](https://en.wikipedia.org/wiki/Read-copy-update)
    - [Seqlock](https://en.wikipedia.org/wiki/Seqlock)
+ [Implementing Lock-Free Queues](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.53.8674&rep=rep1&type=pdf) 介绍无锁队列的实现
+ [Simple, Fast, and Practical Non-Blocking and Blocking Concurrent Queue Algorithms](http://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf) 给出了一个无阻塞和阻塞的并发队列算法
+ 相关博客推荐
    - [1024cores](http://www.1024cores.net/) 德米特里·伐由科夫（Dmitry Vyukov）的和 lock-free 编程相关的网站
    - [Paul E. McKenney](http://paulmck.livejournal.com/) 保罗（Paul）的个人网站
    - [Concurrency Freaks](http://concurrencyfreaks.blogspot.com/) 关于并发算法和相关模式的网站
    - [Preshing on Programming](https://preshing.com/)  加拿大程序员杰夫·普莱辛（Jeff Preshing）的技术博客，主要关注 C++ 和 Python 两门编程语言
    - [Sutter’s Mill](https://herbsutter.com/)  赫布·萨特（Herb Sutter）杰出的 C++ 专家，博客有关于 C++ 语言标准最新进展的信息，也有他的演讲视频
    - [Mechanical Sympathy](http://mechanical-sympathy.blogspot.com/) 马丁·汤普森（Martin Thompson）探索现代硬件的功能，并提供开发、培训、性能调优和咨询服务，博客主题是 Hardware and software working together in harmony，里面探讨了如何设计和编写软件使得它在硬件上能高性能地运行

## 其它
+ [All about 64-bit programming in one place](https://software.intel.com/en-us/blogs/2011/07/07/all-about-64-bit-programming-in-one-place/) 关于 64 位编程相关的收集页面
+ [What Scalable Programs Need from Transactional Memory](https://dl.acm.org/citation.cfm?id=3037750) 事务性内存（TM）的研究
+ [Improving OpenSSL Performance](https://www.intel.com/content/www/us/en/developer/topic-technology/client/business.html) 教你如何提高 OpenSSL 的执行性能，和一些底层的性能调优知识
+ [How eBay’s Shopping Cart used compression techniques to solve network I/O bottlenecks](https://www.ebayinc.com/stories/blogs/tech/how-ebays-shopping-cart-used-compression-techniques-to-solve-network-io-bottlenecks/) 讲述eBay 如何通过压缩数据来提高整体服务性能
+ [Linkedin: Boosting Site Speed Using Brotli Compression](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression) 讲述什么是 Brotli 以及与其它压缩程序的比较和所带来的性能提升
+ [Performance Testing with SSDs, Part 1](https://mailchimp.com/developer/) 和 [Performance Testing with SSDs Part 2](https://devs.mailchimp.com/blog/performance-testing-with-ssds-pt-2/) 介绍了测试 SSD 硬盘性能以及相关的操作系统调优方法
+ [Secure Programming HOWTO - Creating Secure Software](https://www.dwheeler.com/secure-programs/) 讲了 Linux/Unix 下的一些安全编程方面的知识

## 相关论文
[Hints for Computer System Design](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/acrobat-17.pdf) 计算机设计的忠告，总结了他在做系统设计时的一些想法

[The 5 minute rule for trading memory for disc accesses and the 5 byte rule for trading memory for CPU time](http://www.hpl.hp.com/techreports/tandem/TR-86.1.pdf)  5 分钟法则是用来衡量内存与磁盘的，而 5 字节法则则是在内存和 CPU 之间的权衡

