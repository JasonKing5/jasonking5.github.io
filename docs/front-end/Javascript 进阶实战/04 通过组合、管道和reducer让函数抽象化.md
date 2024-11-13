在函数式编程里，组合（Composition）就是把组件函数组合起来，形成一个新的函数。

```javascript
var isOdd = compose(equalsToOne, remainderOfTwo);
```

## 组合 Compose

### Point-Free

函数式编程中的一种编程风格，Point 指参数，free 指没有，Point-Free 就是没有参数的函数。

```javascript
var isOdd = (x) => equalsToOne(remainderOfTwo(x));
```

### 函数组件

```javascript
var dividedBy = (y) => {
  return function forX(x) {
    return x % y;
  };
};
var equalsTo = (y) => {
  return function forX(x) {
    return x === y;
  };
};

var remainderOfTwo = dividedBy(2);
var equalsToOne = equalsTo(1);

var isOdd = (x) => equalsToOne(remainderOfTwo(x));
```

用到了函数式编程声明式的思想，把过程进行了封装，而且去掉了参数，暴露给使用者的就是功能本身。

### 独立的组合函数

函数是按照传参顺序来排列的。

## 管道 Pipeline

管道是另外一种函数的创建方式，特点是一个函数的输出会作为下一个函数的输入，然后按顺序执行。

### Unix/Linux 中的管道

- 每个程序只专注做好一件事。如果有其它新的任务，应该重新构建，而不是通过添加新功能使旧程序复杂化；
- 让每个程序的输出，可以成为另一个程序的输入。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664284587846-fea65a3b-69c8-447e-9ab5-403bc023857e.png)

```shell
$ ls -1 | grep "js$" | wc -l
```

### JavaScript 中的管道

把参数做倒序处理，生成一个新的函数：

```javascript
function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
}

var pipe = reverseArgs(compose);
```

```javascript
const isOdd = pipe(remainderOfTwo, equalsToOne);

isOdd(1); // 返回 true
isOdd(2); // 返回 false
```

## 转导 Transduction

转导主要用于控制系统（Control System）。例如：声波作为输入，通过麦克风进入到一个功放，然后功放进行能量转换，最后通过喇叭传出声音的这样一个系统，就可以称为转导。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664284978960-02083559-41b6-404d-b797-9ce0c5963b29.png)

reducer：主要解决在使用多个 map、filter、reduce 操作大型数组时，可能会发生的性能问题。通过 reducer 优化一系列 map、filter、reduce 操作，使得输入数组只被处理一次并直接产生输出结果，而不需要创建任何中间数组。

```javascript
var oldArray = [36, 29, 18, 7, 46, 53];
var newArray = oldArray
  .filter(isEven)
  .map(double)
  .filter(passSixty)
  .map(addFive);

console.log(newArray); // 返回：[77,97]
```

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664285316051-d8706db6-17a8-4399-9492-e15f3f8d38b7.png)

double 和 addFive 都具有映射类的功能，可以通过一个类似 mapReducer 的 transducer，把它们转换成 reducer。isEven 和 passSixty 都是筛选类的功能，可以通过一个类似 filterReducer 的 transducer，把它们转换成 reducer。

```javascript
var oldArray = [36, 29, 18, 7, 46, 53];

var newArray = composeReducer(oldArray, [
  filterTR(isEven),
  mapTR(double),
  filterTR(passSixty),
  mapTR(addfive),
]);

console.log(newArray); // 返回：[77,97]
```
