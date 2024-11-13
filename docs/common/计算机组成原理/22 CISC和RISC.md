## 指令集

复杂指令集（Complex Instruction Set Computing，简称 CISC）

精简指令集（Reduced Instruction Set Computing，简称 RISC）

CPU 指令集的设计考虑硬件限制。为了性能考虑，功能直接通过硬件电路来完成。为了少用内存，指令的长度可变。随着计算机的性能越来越好，存储的空间也越来越大，80% 的时间用 20% 的简单指令。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648296269868-3ece2649-45b3-449c-90ec-e325466296c0.png)

### 指令数量多的缺点

硬件层面：

1. 支持更多的复杂指令，CPU 的电路更复杂
2. 散热和功耗也更大

软件层面：

1. 编译器优化更困难

## 微指令架构

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648296843646-c39894fc-e502-4446-8868-7588107d9a3e.png)

指令译码：把 CISC 的指令译码成 RISC 指令，比原来的指令译码器复杂

L0 Cache：保存着指令译码器把 CISC 的指令翻译成 RISC 的微指令的结果

## ARM

### 优点

1. 功耗低，功耗优先的设计
2. 价格低，是设计 CPU，授权知识产权
