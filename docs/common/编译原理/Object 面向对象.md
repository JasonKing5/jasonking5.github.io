## 面向对象的语义特征

### 类型

- 基础数据类型
  - 整型
  - 浮点型
  - 字符
- 扩展数据类型
  - 字符串
  - 数组
  - 对象
  - 类

### 作用域

- 类的作用域：整个程序
- 对象成员的作用域：
  - 属性：整个对象的内部
  - 方法：整个对象的内部

### 生存期

- 对象：创建之后，销毁之前
- 成员变量：创建之后，销毁之前（引用了从堆中申请的内存除外）
- 静态成员
  - 作用域：类型的所有对象实例，被所有实例共享
  - 生存期：任何一个对象实例创建之前就存在

## 设计类的语法

```javascript
classDeclaration
    : CLASS IDENTIFIER
      (EXTENDS typeType)?
      (IMPLEMENTS typeList)?
      classBody
    ;

classBody
    : '{' classBodyDeclaration* '}'
    ;

classBodyDeclaration
    : ';'
    | memberDeclaration
    ;

memberDeclaration
    : functionDeclaration
    | fieldDeclaration
    ;

functionDeclaration
    : typeTypeOrVoid IDENTIFIER formalParameters ('[' ']')*
      (THROWS qualifiedNameList)?
      functionBody
    ;
```

```javascript
/*
简单的面向对象特性。
*/
class Mammal{
  //类属性
  string name = "";

  //构造方法
  Mammal(string str){
    name = str;
  }

  //方法
  void speak(){
    println("mammal " + name +" speaking...");
  }
}

Mammal mammal = Mammal("dog");
mammal.speak(); //访问对象方法
println("mammal.name = " + mammal.name); //访问对象的属性

//没有构造方法，创建的时候用缺省构造方法
class Bird{
  int speed = 50;    //在缺省构造方法里初始化

  void fly(){
    println("bird flying...");
  }
}

Bird bird = Bird();              //采用缺省构造方法
println("bird.speed : " + bird.speed + "km/h");
bird.fly();
```

## 对象实例化

1. 通过构造方法来创建对象（检查类型是不是一个类名）
2. 显式定义的构造方法或缺省初始化方法

## 管理对象的数据

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1644241227366-c196552d-55c1-440f-95bc-cf6c76ad7a7d.png)![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1644241266803-c733baa2-a52b-4687-b2a9-0fd62995b28a.png)

## 访问对象的属性和方法

```javascript
expression
    : ...
    | expression bop='.'
      ( IDENTIFIER       //对象属性
      | functionCall     //对象方法
      )
     ...
     ;
```

```javascript
obj1.obj2.field1;
obj1.getObject2().field1;
```

> 对象成员还可以设置可见性，有些成员只有对象内部才能用，有些可以由外部访问：在编译阶段做语义检查的时候，如果私有成员被外部访问，报编译错误
