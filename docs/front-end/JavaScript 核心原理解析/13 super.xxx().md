## super
子级的对象除了要继承父级的“全部的东西”之外，它还要继承“全部的能力”。

ECMAScript 6 约定，如果父类中的名字被覆盖了，那么你可以在子类中用 super 来找到它们。

## super 指向
在 JavaScript 中，super 只能在方法中使用。

1. 在类声明中，如果是类静态声明，也就是使用 static 声明的方法，那么主对象就是这个类，例如 AClass。
2. 就是一般声明，那么该方法的主对象就是该类所使用的原型，也就是 AClass.prototype。
3. 如果是对象声明，那么方法的主对象就是对象本身。

## super.xxx()
super.xxx 存取到的属性在 JavaScript 内核中是一个“引用”。这个引用包括了左侧的对象，并且在它连用“函数调用（）”语法的时候，将这个左侧的对象作为 this 引用传入给后者。

## super.xxx() 中的 this 值
```javascript
obj = {
  foo() {
    super.xxx();
  }
}

// 调用foo方法
obj.foo();
```

thisValue 是在执行引擎发现 super 这个标识符（GetIdentifierReference）的时候，就从当前环境中取出来并绑定给 super 引用的。

1. super 关键字所代表的父类对象，是通过当前方法的[[HomeObject]]的原型链来查找的；
2. this 引用是从当前环境所绑定的 this 中抄写过来，并绑定给 super 的。

## super() 中的父类构造方法
```javascript
class MyClass extends Object {
  constructor() { ... }  // <- [[HomeObject]]指向MyClass.prototype
}
```

super() 的语义是“调用父类构造方法”，也就应当是extends所指定的 Object()。类的原型就是它的父类。

