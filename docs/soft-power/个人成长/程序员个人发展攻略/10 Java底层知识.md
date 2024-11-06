## Java 字节码相关
+ [Java Zone: Introduction to Java Bytecode](https://dzone.com/articles/introduction-to-java-bytecode) 讲述 Java 字节码的一些细节
+ [IBM DeveloperWorks: Java bytecode](https://www.ibm.com/developerworks/library/it-haggar_bytecode/index.html) 讲 Java 字节码的文章
+ [Java Bytecode and JVMTI Examples](https://github.com/jon-bell/bytecode-examples) 使用 JVM Tool Interface 操作字节码的比较实用的例子，包括方法调用统计、静态字节码修改、Heap Taggin 和 Heap Walking
+ 操作字节码常用的库
    - [asmtools](https://wiki.openjdk.java.net/display/CodeTools/asmtools) - 用于生产环境的 Java .class 文件开发工具
    - [Byte Buddy](http://bytebuddy.net/) - 代码生成库：运行时创建 Class 文件而不需要编译器帮助
    - [Jitescript ](https://github.com/qmx/jitescript)- 和 BiteScript 类似的字节码生成库

## JVM 相关
+ [The Java Virtual Machine Specification Java SE 8 Edition](https://docs.oracle.com/javase/specs/jvms/se8/jvms8.pdf) 系统了解 JVM 规范
+ [JVM Anatomy Park JVM](https://shipilev.net/jvm-anatomy-park/) 一点一点地把 JVM 中的一些技术解开
+ [JSR 133](https://www.jcp.org/en/jsr/detail?id=133) 学习 Java 底层原理还有 Java 的内存模型
+ [The JSR-133 Cookbook for Compiler Writers](http://gee.cs.oswego.edu/dl/jmm/cookbook.html) 解释了怎样实现 Java 内存模型
+ [Using JDK 9 Memory Order Modes](https://gee.cs.oswego.edu/dl/html/j9mm.html) 讲了怎样通过 VarHandle 来使用 plain、opaque、release/acquire 和 volatile 四种共享内存的访问模式，并剖析了底层的原理
+ [《The Garbage Collection Handbook》](https://book.douban.com/subject/6809987/)学习垃圾回收机制
+ [Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/) Hotspot Java 虚拟机的垃圾回收调优指南
+ [Quick Tips for Fast Code on the JVM](https://gist.github.com/djspiewak/464c11307cabc80171c90397d4ec34ef) 写出更快的 Java 代码的几个小提示



