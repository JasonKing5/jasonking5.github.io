## 引用
引用类型：JavaScript 定义 Object 和 Function 就是引用类型。



所有删除值的 delete 就直接返回 true

```bash
delete 0
delete x
```

## 确定删除的内容
```bash
delete obj.x
```

obj.x 既不是引用类型，也不是值类型，而是一个表达式。delete 这个操作的正式语法设计是删除一个表达式的结果。

```bash
delete UnaryExpression
```

## 表达式的结果
JavaScript 中一切表达式运算的终极目的都是为了得到一个值（字符串），然后再用另外一些操作将这个值输出。



表达式的值在 ECMAScript 的规范中称为引用，称为规范类型。

## 规范中的引用
`delete 0`JavaScript 将 0 视为一个表达式，并尝试删除它的求值结果。



这里的 0，其实不是值（Value）类型的数据，而是一个表达式运算的结果（Result）。而在进一步的删除操作之前，JavaScript 需要检测这个 Result 的类型：

+ 如果它是值，则按照传统的 JavaScript 的约定返回 true；
+ 如果它是一个引用，那么对该引用进行分析，以决定如何操作。



ECMAScript 约定：任何表达式计算的结果（Result）要么是一个值，要么是一个引用。对象也是值，即非引用类型，例如：`delete {}`。

## 内部操作
在 JavaScript 的内部，引用可以转换为值，以便参与值运算。表达式的本质是求值运算，引用是不能直接作为最终求值的操作数的，需要 GetValue() 的内部操作，也称作内部抽象操作（internal abstract operations， ECMAScript 描述一个符合规范的引擎在具体实现时应当处理的那些行为）。



`x = x`  =>  `x = GetValue(x)`

GetValue() 从一个引用中取出值，赋值操作的含义是将右边的值赋给左边用于包含该值的引用。



`**delete x **`**归根到底，是在删除一个表达式的、引用类型的结果（Result）**

## 开发运用
`obj.x`也是一个引用，属性存取（"."运算符），返回一个关于 x 的引用，它可以作为下一个操作符（例如函数调用运算 () ）的左手端来使用，即对象方法调用运算 `obj.x()`。

> 对象存取 + 函数调用 = 方法调用
>



`obj.x()` 是 JavaScript 集合了“引用规范类型操作”“函数式”“面向对象”和“动态语言”等多种特性于一体的一个简单语法。

+ delete 0中的这个0是一个表达式求值；
+ delete x中的x是一个引用；
+ delete obj.x中obj.x是一组表达式连续运算的结果（Result/ 引用）；





