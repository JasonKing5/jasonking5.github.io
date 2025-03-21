在执行 JavaScript 代码之前，V8 就已经准备好了代码的运行时环境，这个环境包括了堆空间和栈空间、全局执行上下文、全局作用域、内置的内建函数、宿主环境提供的扩展函数和对象，还有消息循环系统。准备好运行时环境之后，V8 才可以执行 JavaScript 代码，这包括解析源码、生成字节码、解释执行或者编译执行这一系列操作。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676257332049-32a43f95-8a87-464d-813d-610dda06da32.png)

基础的运行时环境：

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676257430479-30b5b240-2ce0-4d87-b3a6-bc4d2030a1d5.png)

## 什么是宿主环境

浏览器为 V8 提供基础的消息循环系统、全局变量、Web API，而 V8 的核心是实现了 ECMAScript 标准，V8 只提供了 ECMAScript 定义的一些对象和一些核心的函数，包括 Object、Function、String。除此之外，V8 还提供了垃圾回收器、协程等基础内容，不过这些功能依然需要宿主环境的配合才能完整执行。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676258807861-1d0d43ed-a4f4-43c8-ae5f-44d46624bbf2.png)

## 构造数据存储空间：堆空间和栈空间

V8 是被宿主启动的，在 Chrome 中打开一个渲染进程，渲染进程便会初始化 V8，同时初始化堆空间和栈空间。

栈空间主要是用来管理 JavaScript 函数调用的，栈是内存中连续的一块空间，同时栈结构是“先进后出”的策略。在函数调用过程中，涉及到上下文相关的内容都会存放在栈上，比如原生类型、引用到的对象的地址、函数的执行状态、this 值等都会存在在栈上。当一个函数执行结束，那么该函数的执行上下文便会被销毁掉。

栈空间的最大的特点是空间连续，所以在栈中每个元素的地址都是固定的，因此栈空间的查找效率非常高，但是通常在内存中，很难分配到一块很大的连续空间，因此 V8 对栈空间的大小做了限制，如果函数调用层过深，那么 V8 就有可能抛出栈溢出的错误。

如果有一些占用内存比较大的数据，或者不需要存储在连续空间中的数据，使用栈空间就显得不是太合适了，所以 V8 又使用了堆空间。

堆空间是一种树形的存储结构，用来存储对象类型的离散的数据，诸如函数、数组，在浏览器中还有 window 对象、document 对象等，这些都是存在堆空间的。

宿主在启动 V8 的过程中，会同时创建堆空间和栈空间，再继续往下执行，产生的新数据都会存放在这两个空间中。

## 全局执行上下文和全局作用域

接下来需要初始化全局执行上下文和全局作用域。当 V8 开始执行一段可执行代码时，会生成一个执行上下文。V8 用执行上下文来维护执行当前代码所需要的变量声明、this 指向等。

执行上下文中主要包含三部分，变量环境、词法环境和 this 关键字。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676259551945-40ad99a8-ca5f-4acb-b64b-bde7d6fd241d.png)

全局执行上下文在 V8 的生存周期内是不会被销毁的，它会一直保存在堆中，当下次在需要使用函数或者全局变量时，就不需要重新创建了。当执行了一段全局代码，如果全局代码中有声明的函数或者定义的变量，函数对象和声明的变量都会被添加到全局执行上下文中。

```javascript
var x = 1;
function show_x() {
  console.log(x);
}

// 会在全局执行上下文中添加变量 x 和函数 show_x
```

全局作用域和全局执行上下文的关系：

```javascript
var x = 5;
{
  let y = 2;
  const z = 3;
}
```

这段代码在执行时，就会有两个对应的作用域，一个是全局作用域，另外一个是括号内部的作用域，但是这些内容都会保存到全局执行上下文中。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676259885288-cbc63599-1706-4245-bfbc-3e99a14295c4.png)

当 V8 调用了一个函数时，就会进入函数的执行上下文，这时候全局执行上下文和当前的函数执行上下文就形成了一个栈结构。

```javascript
var x = 1;
function show_x() {
  console.log(x);
}
function bar() {
  show_x();
}
bar();
```

当执行到 show_x 的时候，其栈状态如下图所示：

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1676259992391-bd37cfbd-b6d8-4d83-b777-6451fd2e5fba.png)

## 构造事件循环系统

V8 需要有一个主线程，用来执行 JavaScript 和执行垃圾回收等工作。V8 是寄生在宿主环境中的，它并没有自己的主线程，而是使用宿主所提供的主线程，V8 所执行的代码都是在宿主的主线程上执行的。

通常的做法是在代码中添加一个循环语句，在循环语句中监听下个事件，比如要执行另外一个语句，那么激活该循环就可以执行了。

```javascript
while(1){
  Task task = GetNewTask()；
  RunTask(task)；
}
```

如果主线程正在执行一个任务，这时候又来了一个新任务，这种情况下就需要引入一个消息队列，让新任务的事件暂存到消息队列中，等当前的任务执行结束之后，再从消息队列中取出正在排队的任务。当执行完一个任务之后，事件循环系统会重复这个过程，继续从消息队列中取出并执行下个任务。

因为所有的任务都是运行在主线程的，在浏览器的页面中，V8 会和页面共用主线程，共用消息队列，所以如果 V8 执行一个函数过久，会影响到浏览器页面的交互性能。
