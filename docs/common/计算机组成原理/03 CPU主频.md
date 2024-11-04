## 性能，时间的倒数
### 响应时间（Response time）/执行时间（Execution time）
执行的快

### 吞吐率（Throughput）/带宽（Bandwidth）
单次执行的多



> 性能 = 1/ 响应时间
>

### SPEC（Standard Performance Evaluation Corporation）
提供 CPU 基准测试程序，有编译器、解释器、视频压缩、人工智能国际象棋等等，对于 CPU 的性能给出一个最终评分[2017年跑分结果](https://www.spec.org/cpu2017/results/cpu2017.html)

## CPU 时钟
评估存在问题

### 时间不准
Wall Clock Time：记录程序运行结束的时间减去程序开始运行的时间

计算机可能同时运行着好多个程序，CPU 实际上不停地在各个程序之间进行切换。在这些走掉的时间里面，很可能 CPU 切换去运行别的程序了。有些程序在运行的时候，可能要从网络、硬盘去读取数据，要等网络和硬盘把数据读出来，给到内存和 CPU。想准确统计某个程序运行时间，进而去比较两个程序的实际性能，我们得把这些时间去掉。

![](/images/1645535658311-5ab7043b-d9f0-4e4f-8e1c-97aae7ae644d.png)

![](/images/1645535796088-83747800-6e84-427a-80c8-fd0eabb35e80.png)

### 不一定能直接比较出两个程序的性能差异
+ CPU 满载运行可能降频运行
+ 主板
+ 内存

> 程序的 CPU 执行时间 =CPU 时钟周期数×时钟周期时间
>

每条指令的平均时钟周期数（Cycles Per Instruction，简称 CPI）

> 程序的 CPU 执行时间 = 指令数×CPI×Clock Cycle Time
>

+ 时钟周期时间/计算机主频
+ 每条指令的平均时钟周期数 CPI
+ 指令数

