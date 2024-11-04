## Scope
> variable, function, class
>

+ scope有大小区分，外部变量可以在外部及内部访问，内部变量只能在内部访问
+ 变量的scope从声明以后开始
+ 内部可以声明同名变量，会覆盖外部

```javascript
/**
 * Scope.js
 * 测试JavaScript的作用域
 */
let a = 5;
let b = 6;
console.log("1: ", a, b);

if (a > 0) {
    a = 4;
    let b = 3;
    console.log("2: ", a, b);
} else {
    let b = 4;
    console.log("3: ", a, b);
}

console.log("4: ", a, b);
```

## Extent
> 变量可以访问的时间段，从分配内存给它，到收回它的内存之间的时间
>

### 栈
变量的生存期跟作用域一致，出了作用域，生存期结束，变量所占用的内存也被释放

### 堆
变量的生存期跟语法上的作用域不一致，退出作用域以后仍然会存在

### 实现作用域
![](/images/1642245949676-c44f5a45-b75f-41b0-a9e7-436764f85346.png)

```javascript
BlockScope scope = (BlockScope) cr.node2Scope.get(ctx);  //获得Scope
StackFrame frame = new StackFrame(scope);  //创建一个栈桢
pushStack(frame);    //加入栈中

...

//运行完毕，弹出栈
stack.pop();
```

