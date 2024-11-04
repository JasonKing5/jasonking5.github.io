## 块
绝大多数 JavaScript 语句都并没有自己的块级作用域。从语言设计的原则上来看，越少作用域的执行环境调度效率也就越高，执行时的性能也就越好。

```javascript
var x = 100, c = 'a';
switch (c) {
  case 'a': 
    console.log(x); // ReferenceError
    break;
  case 'b':
    let x = 200;
    break;
}
```

switch 语句内无法访问到外部变量 x，所有分支都处在同一个块级作用域中，任意分支的声明都会给该作用域添加这个标识符，从而覆盖了全局的变量 x。



if else 语法中的块级作用域是一对大括号表示的块语句自带的，与 if 语句本身无关。

## 循环语句中的块
while 和 do..while 等循环语句没有自己的块级作用域。

for 语句中有块级作用域的：

```javascript
for await (<let/const> x of ...) ...
for (<let/const> x ... in ...) ...
for (<let/const> x ... of ...) ...
```

块级作用域，本质上只包括一组标识符。只有当存在潜在标识符冲突的时候，才有必要新添加一个作用域来管理它们。例如函数，由于函数存在重新进入的问题，所以它必须有一个作用域（闭包）来管理重新进入之前的那些标识符。



for 语句中包含了标识符声明的情况，需要创建块级作用域来管理这些声明出来的标识符。

## 块级作用域
添加一个块级作用域保存循环内部标识符

```javascript
var x = 100;
for (let x = 102; x < 105; x++)
  console.log('value:', x);  // 显示“value: 102~104”
console.log('outer:', x); // 显示“outer: 100”
```

在循环体内是否需要一个新的块级作用域

```javascript
for (let x = 102; x < 105; x++)
  let x = 200; // VM841:2 Uncaught SyntaxError: Lexical declaration cannot appear in a single-statement context


// if语句中的禁例
if (false) let x = 100;

// while语句中的禁例
while (false) let x = 200;

// with语句中的禁例
with (0) let x = 300
```

循环语句（对于支持 let/const 的 for 语句来说）通常情况下只支持一个块级作用域。即无法覆盖 for 语句中的 let/const 声明。



let/const 语句的单次声明的设计，与迭代多次执行的现实逻辑相矛盾。

```javascript
for (let i=0; i<2; i++) 
  console.log(i)

for (let i in [1, 2])
  console.log(i)
```

JavaScript 引擎实现 支持 let/const 的 for 语句时，就这里为循环体增加一个作用域，let i 只执行一次，将 i in x 放在每个迭代中来执行，这样避免了与 let/const 的设计冲突。

## for 循环的代价
在 JavaScript 的具体执行过程中，作用域是被作为环境的上下文来创建的。如果将 for 语句的块级作用域称为 forEnv，并将上述为循环体增加的作用域称为 loopEnv，那么 loopEnv 它的外部环境就指向 forEnv。



在 loopEnv 看来，变量 i 是登记在父级作用域 forEnv 中，并且 loopEnv 只能使用它作为名字 i 的一个引用。在 loopEnv 中访问变量 i，本质上是通过环境链回溯来查找标识符。

```javascript
for (let i in [1, 2])
  setTimeout(()=>console.log(i), 1000);
```

当定时器被触发时，函数会通过它的闭包（这些闭包处于 loopEnv 的子级环境中）来回溯，并试图再次找到那个标识符i。然而当定时器触发时，整个 for 迭代有可能都已经结束了。此时上面的 forEnv 可能已经没有了、被销毁了，即使存在那个 i 的值也已经变成了最后一次迭代的终值。



因此要想使上面的代码符合预期，这个 loopEnv 就必须是随每次迭代变化的。即需要为每次迭代都创建一个新的作用域副本，称为迭代环境（iterationEnv)。因此每次迭代实际上都并不是运行在 loopEnv 中，而是运行在该次迭代自有的 iterationEnv 中。在语法上这里只需要两个块级作用域，而实际运行时却需要为其中的第二个块级作用域创建无数个副本。

