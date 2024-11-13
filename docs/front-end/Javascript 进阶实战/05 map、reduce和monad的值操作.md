## 数据的核心操作

### map 映射和函子

函子：一个带运算工具的数据类型或数据结构值。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664535588098-70aaae1a-0a92-4d9b-8878-3f52c027652f.png)

```javascript
stringMap(uppercaseLetter, "Hello World!"); // HELLO WORLD!

arrayMap(["1", "2", "3"], unary(parseInt)); // [1,2,3]
```

### filter 过滤和筛选

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664535688068-5c696589-7803-4d4a-8353-c10598488b21.png)

```javascript
[1, 2, 3, 4, 5].filter(isOdd); // [1,3,5]
```

### reduce 和缩减器

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1664535763857-ae33395c-f3c4-480a-8404-5912be8e6605.png)

```javascript
[5, 10, 15].reduce((arr, val) => arr * val, 3); // 2250
```

reduce 能独立实现，也可以用 map 和 filter 的方法实现。因为 reduce 的初始值可以是一个空数组[]，可以把循环的结果当成另一个数组。

**利用副作用来提高性能！**原则上这些变化都是在函数内部，需要注意的副作用一般多来自外部。

## 单子 monad

### array 作为 functor

### chain 作为 bind、flatMap

### monoid

满足类型签名的函数就组成了 monoid。

### applicative
