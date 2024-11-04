## 闭包的形成
普通函数：函数里的本地变量只能在函数内部访问，函数退出之后，作用域就没用了，它对应的栈桢被弹出，作用域中的所有变量所占用的内存也会被收回。



闭包：用外层函数返回一个内层函数之后，这个内层函数能一直访问外层函数中的本地变量（隐藏内部实现细节）。



+ 函数要变成该语言的一等公民：能把函数像普通数值一样赋值给变量，可以作为参数传递给其他函数，可以作为函数的返回值。
+ 要让内层函数一直访问它环境中的变量，不管外层函数是否退出。

## JavaScript的闭包
```javascript
var a = 0;

var fun1 = function(){
    var b = 0;                // 函数内的局部变量

    var inner = function(){   // 内部的一个函数
        a = a+1;
        b = b+1;
        return b;             // 返回内部的成员
    }

    return inner;             // 返回一个函数
}

console.log("outside:  a=%d", a);

var fun2 = fun1();                            // 生成闭包
for (var i = 0; i< 2; i++){
    console.log("fun2: b=%d a=%d",fun2(), a); //通过fun2()来访问b
}

var fun3 = fun1();                            // 生成第二个闭包
for (var i = 0; i< 2; i++){
    console.log("fun3: b=%d a=%d",fun3(), a); // b等于1，重新开始
}

// result
outside:  a=0
fun2: b=1 a=1
fun2: b=2 a=2
fun3: b=1 a=3
fun3: b=2 a=4
```

![](/images/1644404859974-ba680cb3-af65-47d3-95a6-2622ec737edc.png)

+ 作用域不匹配
+ 隐藏函数所使用的数据

## 静态作用域（Static Scope）/ 做词法作用域
### 特征
+ 符号之间的引用关系能够根据程序代码在编译时就确定清楚，在运行时不变
+ 函数在哪声明，就具有它所在位置的作用域。能够访问哪些变量，在任何地方运行时一直能访问

### 实现
语言在编译时就形成一个 Scope 的树，变量的引用也在编译时做消解，之后不再改变



```javascript
var i = 1;
var foo = function(){
  console.log(i); // 访问全局变量
}

foo();        // 访问全局变量

var bar = function(){
  var i = 2; 
  foo();      // 在这里调用foo()，访问的仍然是全局变量
}
```

### 静态作用域视角下的闭包
语言是静态作用域的，它能够访问的变量，需要一直都能访问，因此需要把某些变量的生存期延长

## 动态作用域（Dynamic Scope）
### 特征
变量引用跟变量声明不在编译时绑定。而在运行时，在运行环境中动态地找一个相同名称的变量（bash)

## 函数是一等公民
**函数可以像数值一样使用：给变量赋值、作为参数传递给其他函数，作为函数返回值等等**

```javascript
var newArray = [1, 2, 3].map(
  function(value,index,array){
    return value * 2
  }
)
```

### 实现
支持函数作为基础类型，这样就可以用这种类型声明变量

```javascript
function int myFun(int);  // 声明一个函数型的变量
```

```javascript
functionType
    : FUNCTION typeTypeOrVoid '(' typeList? ')'
    ;

typeList
    : typeType (',' typeType)*
    ;
```

## 实现闭包
**把内部环境中需要的变量，打包交给闭包函数**

1. 执行外部函数，打包环境变量
2. 把内部函数连同打包好的环境变量的值，创建一个 FunctionObject 对象，作为外部函数的返回值，给到调用者
3. 给变量赋值
4. 调用函数，函数执行时，有一个私有的闭包环境（即 FunctionObject 对象）可以访问外部函数的值

### 函数式编程
高阶函数（High-order function）：能够接受其他函数作为自己的参数

