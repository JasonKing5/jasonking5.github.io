## 图形渲染流程

电脑里显示的 3D 的画面是通过多边形组合出来的。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648305517846-fb54c9c6-6497-4651-a596-26e68467bad6.png)

### 顶点处理（Vertex Processing）

构成多边形建模的每一个多边形都有多个顶点（Vertex），这些顶点都有一个在三维空间里的坐标。二维屏幕中在确定当前视角时，要把这些顶点在三维空间的位置，转化到屏幕二维空间里。

转化是线性代数的计算，建模越精细，需要转换的顶点数量就越多，计算量就越大。每一个顶点位置的转换，互相之间没有依赖，可以并行独立计算。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648305854001-46b1ca34-b749-4585-82d8-0bf8a123468f.png)

### 图元处理（Primitive Processing）

把顶点处理完成之后的各个顶点连起来，变成多边形。

针对这些多边形进行剔除和裁剪（Cull and Clip），把不在屏幕里面或一部分不在屏幕里面的内容去掉，减少接下来流程的工作量。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648868942714-1bf9f3df-e5b0-42fe-8a71-05ba33dc6180.png)

### 栅格化（Rasterization）

把图元转换成屏幕里面的一个个像素点。

每一个图元都可以并行独立地栅格化。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648869734204-ce55da4c-5a64-4f56-81d4-7c439b70c02d.png)

### 片段处理（Fragment Processing）

计算每一个像素的颜色、透明度等信息，给像素点上色。

每个片段并行、独立进行。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648883490139-d60d4fed-b68f-430f-b62e-29682fbe0702.png)

### 像素操作（Pixel Operations）

把不同的多边形的像素点混合（Blending）到一起。

- 前面的多边形是半透明的，前后的颜色要混合在一起变成一个新的颜色；
- 前面的多边形遮挡住了后面的多边形，只显示前面多边形的颜色。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648883655521-935457fc-7cd8-46f1-8f78-7f146c22031e.png)

## GPU

640 _ 480 _ 60 帧 = 1800 万像素 ~= 5400 万条指令 = 54M 条指令

图形渲染的流程是固定的，直接用硬件来处理这部分过程。这样的硬件比制造有同样计算性能的 CPU 要便宜得多。整个计算流程是完全固定的，不需要流水线停顿、乱序执行等各类导致 CPU 计算变得复杂的问题。也不需要有可编程能力，只需要让硬件按照写好的逻辑进行运算。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648884080591-cd3c42ca-a4aa-41ac-a4ad-1e7e505728c8.png)

## 可编程图形处理器

在整个渲染管线（Graphics Pipeline）的一些特别步骤，能够自己定义处理数据的算法或操作。

![提供了单独的顶点处理和片段处理（像素处理）的着色器](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648884728564-26084ec1-74de-4eda-a97f-754b4d3bf189.png)

### 统一着色器架构（Unified Shader Architecture）

在 GPU 里放多个一样的 Shader 硬件电路，通过统一调度把顶点处理、图元处理、片段处理这些任务，都交给这些 Shader 去处理。

GPGPU：General-Purpose Computing on Graphics Processing Units，通用图形处理器，可以拿来做各种通用计算。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648885128789-e41aea35-996d-4b8e-93e7-5f129c098a39.png)

## 现代 GPU

### 芯片瘦身

GPU 没有很多的分支条件或复杂的依赖关系，可以把 GPU 里这些对应的电路去掉，只留下取指令、指令译码、ALU 以及执行这些计算需要的寄存器和缓存。一般会把这些电路抽象成三个部分：取指令和指令译码、ALU 和执行上下文。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648885356078-24fa4981-3a9d-4f26-9607-04b390acabf3.png)

### 多核并行和 SIMT

![多核并行](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648885452334-932d8cb1-e2ea-4c01-a94c-31f075049d01.png)

执行的指令一样，同一个指令的数据不同。

用 SIMT（Single Instruction，Multiple Threads）技术，可以把多条数据，交给不同的线程处理。

线程里面执行的指令流程一样，但数据不同，可能会走到不同的条件分支。相同的代码和相同的流程，可能执行不同的具体的指令。在取指令和指令译码的阶段，取出的指令可以给到后面多个不同的 ALU 并行进行运算，一个 GPU 的核里，可以放更多的 ALU，同时进行更多的并行运算。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648885891072-1b107a8f-4417-4db1-8282-a343d2f623d0.png)

### 超线程

遇到流水线停顿时，调度一些别的计算任务给当前的 ALU。要针对当前这个任务，提供更多的执行上下文。一个 Core 里面的执行上下文数量需要比 ALU 多。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1648886082051-49c0eaad-e48e-48e0-a312-f4b22ed6cf9a.png)
