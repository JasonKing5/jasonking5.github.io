## 什么是 V8

V8 是 JavaScript 虚拟机的一种。将人类能够理解的编程语言 JavaScript，翻译成机器能够理解的机器语言。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1673530591395-779bc736-50e3-46a2-a743-fa13d07bdacb.png)

目前市面上有很多种 JavaScript 引擎，诸如 SpiderMonkey、V8、JavaScriptCore 等。由谷歌开发的开源项目 V8 是当下使用最广泛的 JavaScript 虚拟机。

不了解虚拟机内部是怎样工作的，在项目中遇到的很多问题很可能找不到解决的途径。比如，有时项目的占用内存过高，或者页面响应速度过慢，又或者使用 Node.js 的时候导致任务被阻塞等问题，都与 V8 的基本运行机制有关。如果熟悉 V8 的工作机制，就会有系统性的思路来解决这些问题。

## 如何学习 V8

### 了解 JavaScript 语言的基本特性和设计思想

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1673530796319-171e88e5-113b-44b0-b390-3d375eef72e3.png)

### 学习 V8 执行 JavaScript 代码的完整流程![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1673530919310-eeef53fb-fc73-4c1a-bdcb-7c02fc8ab5d5.png)

### 事件循环系统和垃圾回收机制

V8 的事件循环系统会调度排队任务，保证 JavaScript 代码被 V8 有序地执行。

JavaScript 是一种自动垃圾回收的语言，V8 在执行垃圾回收时会占用主线程的资源，频繁触发垃圾回收会阻塞主线程导致内存问题。
